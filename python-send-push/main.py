import argparse
import json

import google.auth.transport.requests
import requests
from google.oauth2 import service_account

# Change your Project ID
PROJECT_ID = 'web-push-324b8'

# Default vars
BASE_URL = 'https://fcm.googleapis.com'
FCM_ENDPOINT = 'v1/projects/' + PROJECT_ID + '/messages:send'
FCM_URL = BASE_URL + '/' + FCM_ENDPOINT
SCOPES = ['https://www.googleapis.com/auth/firebase.messaging']

WEB_CLIENT_TOKEN: str = (
    "eFYEhj3R4YXjapgEbpAIYh:APA91bFSWiZnyjyQrG4JT9PO1CpgC-6iRDnJM5oAC0rOm7-YQqtBG2fnRfW5CW..."
)


def _get_access_token():
  credentials = service_account.Credentials.from_service_account_file(
    'service-account.json', scopes=SCOPES)
  request = google.auth.transport.requests.Request()
  credentials.refresh(request)
  print(f"Token: {credentials.token}")
  return credentials.token


def _send_fcm_message(fcm_message):
  headers = {
    'Authorization': 'Bearer ' + _get_access_token(),
    'Content-Type': 'application/json; UTF-8',
  }
  resp = requests.post(FCM_URL, data=json.dumps(fcm_message), headers=headers)

  if resp.status_code == 200:
    print('Message sent to Firebase for delivery, response:')
    print(resp.text)
  else:
    print('Unable to send message to Firebase')
    print(resp.text)


def _message_body():
    print("prepare message")
    return {
        "message": {
            "token": WEB_CLIENT_TOKEN,
            "notification": {
                "title": "Привет",
                "body": "Тут длинный питон текст отправленный скриптом",
                "image": "https://lastfm.freetls.fastly.net/i/u/300x300/f939d9be5da0095a78bfb5cf45aecf39.jpg",
            },
            "data": {"url": "https://akmalov.com"},
        }
    }


if __name__ == '__main__':
    print('FCM script start')
    _send_fcm_message(_message_body())
