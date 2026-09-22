/* SILENCE v41 — user-provided room recordings. No requests or AudioContext until a click.
 * Plain script (no dependencies). One source at a time; cached decoded buffers; saved offsets.
 */
(function (global) {
  'use strict';
  var AC = global.AudioContext || global.webkitAudioContext;
  var script = document.currentScript;
  var siteRoot = new URL('../', script && script.src ? script.src : document.baseURI);
  var TRACKS = {
    top: 'assets/audio/room-top-drill.v41.mp3',
    left: 'assets/audio/room-left-vacuum-dog.v41.mp3',
    right: 'assets/audio/room-right-music.v41.mp3',
    bottom: 'assets/audio/room-bottom-concert.v41.mp3'
  };
  function clamp(value, min, max) { return Math.max(min, Math.min(max, Number(value) || 0)); }
  function RoomAudio(options) {
    options = options || {};
    this.volume = clamp(options.volume === undefined ? 0.35 : options.volume, 0, 1);
    this.attenuation = 1;
    this.onState = typeof options.onState === 'function' ? options.onState : function () {};
    this.context = null;
    this.master = null;
    this.wallGain = null;
    this.buffers = Object.create(null);
    this.offsets = Object.create(null);
    this.active = null;
    this.wanted = false;
    this.phase = 'idle';
    this.sourceId = null;
    this.generation = 0;
    this.suspendTimer = 0;
    this.disposed = false;
  }
  RoomAudio.prototype._notify = function (phase, code) {
    this.phase = phase;
    this.onState({ phase: phase, source: this.sourceId, code: code || '', wanted: this.wanted });
  };
  RoomAudio.prototype._ensureContext = function () {
    if (!AC) throw new Error('unsupported');
    if (this.disposed) throw new Error('disposed');
    if (this.context && this.context.state !== 'closed') return this.context;
    this.context = new AC();
    this.master = this.context.createGain();
    this.wallGain = this.context.createGain();
    this.master.gain.value = this.volume;
    this.wallGain.gain.value = this.attenuation;
    this.wallGain.connect(this.master);
    this.master.connect(this.context.destination);
    var self = this;
    this.context.addEventListener('statechange', function () {
      // iOS interruptions (calls, screen lock) must not resume sound by themselves.
      if (self.context.state === 'interrupted' && self.wanted) self.pause('interrupted');
    });
    return this.context;
  };
  RoomAudio.prototype._ramp = function (param, value, seconds) {
    var now = this.context.currentTime;
    if (typeof param.cancelAndHoldAtTime === 'function') param.cancelAndHoldAtTime(now);
    else { var held = param.value; param.cancelScheduledValues(now); param.setValueAtTime(held, now); }
    param.linearRampToValueAtTime(value, now + (seconds || 0.18));
  };
  RoomAudio.prototype._load = function (id) {
    var self = this;
    if (self.buffers[id]) return self.buffers[id];
    var controller = typeof AbortController === 'function' ? new AbortController() : null;
    var timeout = controller ? setTimeout(function () { controller.abort(); }, 20000) : 0;
    var request = fetch(new URL(TRACKS[id], siteRoot).href, {
      credentials: 'same-origin', signal: controller ? controller.signal : undefined
    }).then(function (response) {
      if (!response.ok) throw new Error('http-' + response.status);
      return response.arrayBuffer();
    }).then(function (data) {
      // Callbacks also work with older Safari implementations of decodeAudioData.
      return new Promise(function (resolve, reject) {
        self.context.decodeAudioData(data, resolve, reject);
      });
    }).then(function (buffer) {
      clearTimeout(timeout);
      if (!buffer || buffer.duration < 0.1) throw new Error('empty-audio');
      return buffer;
    }).catch(function (error) {
      clearTimeout(timeout);
      if (self.buffers[id] === request) delete self.buffers[id];
      throw error;
    });
    self.buffers[id] = request;
    return request;
  };
  RoomAudio.prototype._position = function (active) {
    if (!active) return 0;
    return (active.offset + Math.max(0, this.context.currentTime - active.started)) % active.duration;
  };
  RoomAudio.prototype._release = function (fade) {
    if (!this.active) return;
    var previous = this.active;
    this.offsets[previous.id] = this._position(previous);
    this.active = null;
    var seconds = fade === undefined ? 0.08 : fade;
    this._ramp(previous.envelope.gain, 0, Math.max(0.005, seconds));
    try { previous.node.stop(this.context.currentTime + seconds + 0.015); } catch (_) {}
    previous.node.onended = function () {
      try { previous.node.disconnect(); previous.envelope.disconnect(); } catch (_) {}
    };
  };
  RoomAudio.prototype.play = function (id) {
    var self = this;
    if (!TRACKS[id] || self.disposed) return Promise.resolve(false);
    if (self.wanted && self.sourceId === id && (self.phase === 'playing' || self.phase === 'loading')) {
      return Promise.resolve(true);
    }
    self.sourceId = id;
    self.wanted = true;
    var token = ++self.generation;
    clearTimeout(self.suspendTimer);
    var context, resume;
    try {
      // resume is invoked synchronously inside the user's click/touch handler.
      context = self._ensureContext();
      resume = context.resume();
      self._release();
    } catch (error) {
      self.wanted = false;
      self._notify('error', error.message);
      return Promise.resolve(false);
    }
    self._notify('loading');
    return Promise.all([resume, self._load(id)]).then(function (results) {
      if (token !== self.generation || !self.wanted || self.disposed || document.hidden) return false;
      if (context.state !== 'running') throw new Error('audio-blocked');
      var buffer = results[1], node = context.createBufferSource(), envelope = context.createGain();
      var offset = (self.offsets[id] || 0) % buffer.duration;
      node.buffer = buffer;
      node.loop = true;
      node.loopStart = 0;
      node.loopEnd = buffer.duration;
      envelope.gain.value = 0;
      node.connect(envelope);
      envelope.connect(self.wallGain);
      node.start(context.currentTime, offset);
      self.active = { id: id, node: node, envelope: envelope, offset: offset,
        started: context.currentTime, duration: buffer.duration };
      self._ramp(envelope.gain, 1, 0.14);
      self._notify('playing');
      return true;
    }).catch(function (error) {
      if (token !== self.generation || self.disposed) return false;
      self.wanted = false;
      self._release();
      self._notify('error', location.protocol === 'file:' ? 'local-file' : (error.name || 'audio-load'));
      self._suspendLater();
      return false;
    });
  };
  RoomAudio.prototype._suspendLater = function () {
    var self = this;
    clearTimeout(self.suspendTimer);
    self.suspendTimer = setTimeout(function () {
      if (!self.wanted && self.context && self.context.state === 'running') {
        self.context.suspend().catch(function () {});
      }
    }, 130);
  };
  RoomAudio.prototype.pause = function (reason) {
    this.wanted = false;
    ++this.generation; // Ignore any late network/decode result.
    this._release();
    this._notify('paused', reason || 'user');
    this._suspendLater();
  };
  RoomAudio.prototype.setVolume = function (value) {
    this.volume = clamp(value, 0, 1);
    if (this.master) this._ramp(this.master.gain, this.volume, 0.12);
  };
  RoomAudio.prototype.setAttenuation = function (value) {
    this.attenuation = clamp(value, 0, 1);
    if (this.wallGain) this._ramp(this.wallGain.gain, this.attenuation, 0.22);
  };
  // Read-only status for diagnostics. Does not create or start audio.
  RoomAudio.prototype.inspect = function () {
    return { wanted: this.wanted, phase: this.phase, selected: this.sourceId,
      active: this.active ? this.active.id : null,
      position: this._position(this.active), duration: this.active ? this.active.duration : 0,
      volume: this.volume, attenuation: this.attenuation,
      contextState: this.context ? this.context.state : 'not-created',
      cached: Object.keys(this.buffers) };
  };
  RoomAudio.prototype.destroy = function () {
    this.pause('disposed');
    this.disposed = true;
    clearTimeout(this.suspendTimer);
    if (this.context) this.context.close().catch(function () {});
    this.buffers = Object.create(null);
  };
  global.SilenceRoomAudio = RoomAudio;
})(window);
