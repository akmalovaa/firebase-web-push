# Firebase web push

Минимальный React TypeScript фронт c настройками для получения пуш уведомлений

Основные полезные ссылки:

- Admin Console firebase https://console.firebase.google.com
- Docs Cloud Messaging client https://firebase.google.com/docs/cloud-messaging/js/client
- 

## Создание проекта

- Зайти в Firebase Console
- Создать проект 
- Создать в настройках проекта Web Push certificates 



## Настройка firebase

Для Firebase Web SDK доступно два типа библиотек:


### Modular 
Новая платформа API, разработанная для упрощения работы

Отравки из документации:


Преимущества и ограничения модульного SDK
Полностью модульный SDK обладает следующими преимуществами по сравнению с предыдущими версиями:

- Модульный SDK позволяет значительно уменьшить размер приложения. В нем используется современный формат модуля JavaScript, позволяющий использовать методы "встраивания в дерево", при которых вы импортируете только те артефакты, которые нужны вашему приложению. В зависимости от вашего приложения использование модульного SDK может привести к сокращению объема данных на 80% по сравнению с аналогичным приложением, созданным с использованием namespaced API.
- Модульный SDK продолжит получать преимущества от постоянной разработки функций, в то время как namespace API - нет.
- Много интересных ошибок и проблем, непонятная документация (это от себя)

### Namespaced (compat)

Полностью совместим с более ранними версиями SDK

Легко подключать импортом скриптов:
```
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
```

Проще использовать **Namespaced**

Firebase для регистрации воркера по умолчанию ищет файл с именем `firebase-messaging-sw.js`

https://firebase.google.com/docs/cloud-messaging/js/receive


### onBackgroundMessage

Обработчик для фоновых сообщений расположен в `firebase-messaging-sw.js`

### onMessage

Обработчик для активного окна, обычно в таком случаи нет смысла отправлять пуш, просто логирование для теста

```ts
onMessage(messaging, (payload) => {
      console.log(payload);
    });
```

### Генерация клиентского токена

Функция в файле `firebase.ts`

Для получения нужен `vapidKey`, в настройках проекта - Cloud Messaging

**Web Push certificates (Key)** - это он



## Для настройки с нуля

```shell
npm create vite@latest web-app --template react-ts
```

```shell
cd web-app
npm install firebase
npm run dev
```

Основные настройки:
- `firebase.ts`
- `firebase-messaging-sw.js`

Добавлена кнопка для получения токена + обработчик активного окна:
- `App.tsx`