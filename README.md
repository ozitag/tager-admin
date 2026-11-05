# frontend-new

Boilerplate админки TAGER. Сборка — vite, UI собирается из пакетов `@tager/admin-*`.

## Установка

```
yarn install
```

Переменные окружения берутся из `.env*` в корне проекта. Шаблоны лежат в `env/`:
скопируйте нужный в корень, например `cp env/.env.local .env.local`.

В бандл попадают только переменные с префиксом `VUE_APP_` — vite подставляет их
через `define`, как раньше делал `webpack.DefinePlugin`. Префикс сохранён,
потому что те же переменные читает код пакетов `@tager/*`.

`NODE_ENV` задавать не нужно: vite выводит его из режима сборки.

## Разработка

```
yarn start
```

`.env.local` подхватывается автоматически, отдельный `--mode` для этого не
нужен (и имя режима `local` vite не принимает — оно конфликтует с суффиксом
`.env.local`).

## Сборка

```
yarn build            # production
yarn build --mode development
yarn preview          # посмотреть собранное локально
```

## Проверки

```
yarn type-check       # vue-tsc
yarn lint             # eslint
yarn format           # prettier
```

## Обновление пакетов TAGER

```
yarn tager:update
```

### Про `resolutions` в package.json

Две записи — обход чужих проблем, а не наш выбор:

- `@tager/admin-ui/@tager/admin-services` — пакет `@tager/admin-ui` опубликован
  с `"@tager/admin-services": "workspace:*"` в метаданных реестра (в самом
  тарболле версия корректная). Без пина установка с нуля падает на резолве.
- `vue3-json-viewer` — `@tager/admin-ui` импортирует `vue3-json-viewer/dist/index.css`,
  а начиная с 2.4.x этот файл переименован.

Обе записи можно снять, когда `@tager/admin-ui` переиздадут.
