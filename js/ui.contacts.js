(function (global) {
  'use strict';

  var COPY = {
    ru: {
      title: 'Бесплатная консультация инженера-акустика',
      lead: 'Оставьте имя и телефон — специалист свяжется с вами и уточнит задачу.',
      policy: 'Я даю согласие на обработку своих персональных данных и принимаю политику конфиденциальности.',
      ads: 'Я согласен получать информационные и рекламные сообщения.',
      send: 'Отправить'
    },
    kz: {
      title: 'Инженер-акустиктің тегін кеңесі',
      lead: 'Атыңыз бен телефон нөміріңізді қалдырыңыз — маман хабарласып, міндетіңізді нақтылайды.',
      policy: 'Жеке деректерімді өңдеуге келісім беремін және құпиялылық саясатымен келісемін.',
      ads: 'Ақпараттық және жарнамалық хабарламаларды алуға келісемін.',
      send: 'Жіберу'
    },
    en: {
      title: 'Free consultation with an acoustic engineer',
      lead: 'Leave your name and phone number — a specialist will contact you and clarify the task.',
      policy: 'I consent to the processing of my personal data and accept the privacy policy.',
      ads: 'I agree to receive informational and promotional messages.',
      send: 'Send'
    }
  };

  function render(node) {
    var C = global.SILENCE_CORE;
    var SITE = global.SITE;
    var lang = C.getLang();
    var x = COPY[lang] || COPY.ru;
    var t = function (k) { return C.t(k, lang); };
    var q = new URLSearchParams(global.location.search);

    node.innerHTML = '';
    var wrap = C.el('div', { class: 'container contacts-page' });
    var shell = C.el('div', { class: 'contacts-page__shell' });

    shell.appendChild(C.el('div', { class: 'contacts-page__intro' }, [
      C.el('img', { class: 'contacts-page__icon', src: 'assets/ico-engineer.svg', alt: '', loading: 'eager' }),
      C.el('h1', {}, [x.title]),
      C.el('p', { class: 'lead' }, [x.lead])
    ]));

    var form = C.el('form', { class: 'lead-form contacts-page__form', 'data-lead-form': '', novalidate: '' }, [
      C.el('div', { class: 'field' }, [
        C.el('label', { for: 'f-name' }, [t('fName')]),
        C.el('input', { id: 'f-name', name: 'name', type: 'text', autocomplete: 'name', placeholder: t('fNamePh') })
      ]),
      C.el('div', { class: 'field' }, [
        C.el('label', { for: 'f-phone' }, [t('fPhone')]),
        C.el('input', { id: 'f-phone', name: 'phone', type: 'tel', inputmode: 'numeric', autocomplete: 'tel', placeholder: t('fPhonePh') }),
        C.el('p', { class: 'caption field__error', 'data-phone-error': '', hidden: '' }, [t('fPhoneErr')])
      ]),

      /* Funnel context remains hidden and is sent to the manager, but the visitor sees only name + phone. */
      C.el('input', { id: 'f-problem', name: 'problem', type: 'hidden', value: q.get('problem') || '' }),
      C.el('input', { id: 'f-surface', name: 'surface', type: 'hidden', value: q.get('surface') || '' }),
      C.el('input', { id: 'f-system', name: 'system', type: 'hidden', value: q.get('system') || '' }),
      C.el('input', { id: 'f-room', name: 'room', type: 'hidden', value: q.get('room') || '' }),
      C.el('input', { id: 'f-area', name: 'area', type: 'hidden', value: q.get('area') || '' }),

      C.el('div', { class: 'hp', 'aria-hidden': 'true' }, [
        C.el('label', { for: 'f-company' }, ['Company']),
        C.el('input', { id: 'f-company', name: 'company', type: 'text', tabindex: '-1', autocomplete: 'off' })
      ]),
      C.el('div', { class: 'contacts-page__checks' }, [
        C.el('label', { class: 'contacts-page__check', for: 'f-policy' }, [
          C.el('input', { id: 'f-policy', name: 'policy', type: 'checkbox', required: 'required' }),
          C.el('span', {}, [x.policy])
        ]),
        C.el('label', { class: 'contacts-page__check', for: 'f-ads' }, [
          C.el('input', { id: 'f-ads', name: 'ads', type: 'checkbox' }),
          C.el('span', {}, [x.ads])
        ])
      ]),
      C.el('button', { type: 'submit', class: 'btn contacts-page__submit', 'data-analytics': 'form_submit_click' }, [x.send]),
      C.el('p', { class: 'caption lead-form__status contacts-page__status', 'data-form-status': '', role: 'status' })
    ]);

    shell.appendChild(form);
    wrap.appendChild(shell);
    node.appendChild(wrap);
  }

  global.SILENCE_PAGES = global.SILENCE_PAGES || {};
  global.SILENCE_PAGES.contacts = render;
}(window));
