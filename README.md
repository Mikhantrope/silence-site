# SILENCE v15 — запуск и настройка

## Локальный запуск

**Windows:** `start.bat`  
**macOS/Linux:** `./start.sh`

Сайт запускается через `server.py`; форма `POST /api/lead` работает локально.
По умолчанию заявки пишутся **за пределами публичной папки сайта** в
`../silence-data/leads.jsonl`.

## Заявки в Telegram

На сервере задайте переменные окружения:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

Токен не хранится во frontend-коде.

## Аналитика

Откройте `js/config.js` и заполните нужные идентификаторы:

```js
analytics: {
  gtmId: '',              // GTM-XXXXXXX
  ga4Id: '',              // G-XXXXXXXXXX; используется только если GTM пуст
  yandexMetrikaId: '',    // числовой ID счётчика
  yandexWebvisor: false,
  respectDoNotTrack: true,
  debug: false
}
```

Если указан GTM, прямая загрузка GA4 отключается, чтобы не создавать дубли.
Яндекс Метрика может работать параллельно. При пустых ID внешние скрипты не
загружаются, но события продолжают попадать в `window.dataLayer`.

Основные события: `page_view`, `lead_submit_success`, `lead_submit_error`,
`phone_click_*`, `whatsapp_click_*`, `system_quote_click`,
`problem_picker_quote`, `price_quote_click`, `pro_audience_select`,
`pro_norm_open`.

Атрибуция сохраняет first-touch и last-touch значения `utm_*`, `gclid`,
`yclid`, `fbclid`, landing page и referrer. Они добавляются в заявку.

## SEO и публичный домен

В исходниках используется безопасный токен `__SITE_URL__`, потому что домен
в архиве не указан. Есть два корректных способа развернуть сайт.

### Вариант A — запуск через `server.py`

Сервер сам подставляет абсолютный origin в canonical, Open Graph,
`sitemap.xml` и `robots.txt`. За reverse proxy лучше явно задать:

```bash
SITE_BASE_URL=https://example.kz python server.py --bind 0.0.0.0 --port 8080
```

### Вариант B — статический хостинг

Перед загрузкой выполните:

```bash
python tools/build_seo.py https://example.kz
```

Готовая статическая версия появится в `dist/`. Загружать на хостинг нужно
содержимое `dist/`, а не исходную папку.

## Что изменено в v15

- пункт меню «Нормативы» заменён на корректный «Профессионалам»;
- `pro.html` теперь имеет ясный H1, вводный текст и отдельные подразделы:
  аудитории, нормативы, технические материалы;
- подключаемые адаптеры GTM/GA4 и Яндекс Метрики;
- first-touch / last-touch UTM-атрибуция;
- SEO-база: `lang`, robots meta, canonical, Open Graph/Twitter, sitemap,
  robots.txt и статический SEO build;
- canonical главной ведёт на `/`, а не дублирующий `/index.html`;
- заявки больше не хранятся внутри web-root.

## Цены

Реальных тарифов в исходном архиве нет, поэтому они не выдуманы. Заполните
`js/data.pricing.js` (`perSqm.wall`, `ceiling`, `floor`, `partition`) и
поставьте `ready: true`.
