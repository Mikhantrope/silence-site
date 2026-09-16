/* SILENCE — config.js
   Единственная точка настройки отправки заявок. Токена Telegram-бота
   здесь нет и не будет: отправка идёт на серверный приёмник, который сам
   обращается к Telegram (или куда угодно) со своим секретом на бэкенде.
   См. п.6.1 ТЗ: поля tg остаются пустыми, в репозитории токенов нет. */
window.SILENCE_CONFIG = {
  endpoint: '/api/lead',
  leadMode: 'whatsapp', // v27 form intentionally opens a prepared message; user sends it.
  tg: {
    token: '',
    chatId: ''
  },
  analytics: {
    /* Fill only the services you actually use. GTM takes precedence over
       direct GA4 to prevent duplicate Google events. */
    gtmId: '',              // e.g. GTM-XXXXXXX
    ga4Id: '',              // e.g. G-XXXXXXXXXX (used only if gtmId is empty)
    yandexMetrikaId: '',    // numeric counter id
    yandexWebvisor: false,
    respectDoNotTrack: true,
    debug: false
  }
};

/* Отправка заявки. fields — массив пар [подпись, значение]. Возвращает Promise.
   Если endpoint не задан (пусто) и токен тоже пуст — промис отклоняется:
   форма покажет сообщение об ошибке, а не сделает вид, что заявка ушла. */
window.SILENCE_SEND = function (title, fields) {
  var cfg = window.SILENCE_CONFIG || {};
  var esc = function (v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  if (cfg.endpoint) {
    return fetch(cfg.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title, fields: fields })
    }).then(function (r) { if (!r.ok) throw new Error('endpoint'); });
  }

  if (!cfg.tg || !cfg.tg.token || !cfg.tg.chatId) {
    return Promise.reject(new Error('\u041f\u0440\u0438\u0451\u043c\u043d\u0438\u043a \u0437\u0430\u044f\u0432\u043e\u043a \u043d\u0435 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d: \u0441\u043c. js/config.js'));
  }

  var lines = fields.map(function (f) { return esc(f[0]) + ': ' + esc(f[1] || '\u2014'); });
  var text = '<b>' + esc(title) + '</b>\n' + lines.join('\n');

  return fetch('https://api.telegram.org/bot' + cfg.tg.token + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: cfg.tg.chatId, text: text, parse_mode: 'HTML' })
  }).then(function (r) { if (!r.ok) throw new Error('telegram'); });
};
