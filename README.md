## Introduction
Linguo helps connect users to find language partners near their area.
* Live Site: https://linguoisdead.herokuapp.com/
* Facebook Page: https://www.facebook.com/linguoisalive

## Local Installation
Login to your Github account and fork this repo. Then in your terminal:
```
git clone SSH_KEY
```

After cloning the repo, run the following commands:
```
createdb LOCAL_DATABASE_NAME
npm install
knex migrate: latest
touch .env
```

Linguo uses Google for user authentication. Create an [app](https://console.developers.google.com/) with Google to get an api and secret key. In your .env file, include the following credentials:
```
SECRET=LOCAL_COOKIE_SECRET
GOOGLE_API_KEY=GOOGLE_CLIENT_ID
GOOGLE_SECRET_KEY=GOOGLE_CILENT_SECRET
HOSTNAME=http://localhost:3000
```

## Developers
* [Andrew Furth](https://github.com/afurth89)
* [Thomas O'Brien](https://github.com/thomasobrien99)
* [Kenneth Korcal](https://github.com/kakorcal)