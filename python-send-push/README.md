# Python send push to web

Пример запроса:

```json
https://fcm.googleapis.com//v1/projects/<YOUR-PROJECT-ID>/messages:send
Content-Type: application/json
Authorization: bearer <YOUR-ACCESS-TOKEN>

{
  "message": {
    "token": "eEz-Q2sG8nQ:APA91bHJQRT0JJ...",
    "notification": {
      "title": "Background Message Title",
      "body": "Background message body"
    },
    "webpush": {
      "fcm_options": {
        "link": "https://dummypage.com"
      }
    }
  }
}
```

В приложении получает токен авторизации, затем выполняет POST запрос

Для получения `bearer <YOUR-ACCESS-TOKEN>` нужно скачать JSON файл с firebase.console


```
Project settings -> Service accounts -> Manage service account permissions -> Create service account -> JSON
```

Положить в текущую директорию с названием `service-account.json`