baseURL: 'http://localhost:3022/api/',

1) run ``npm install``
2) Start react app
``npm start`` or ``npm run build`` for production

3) Go to ***api*** folder

``cd api``

4) Copy ***[dist.config.js](api%2Fdist.config.js)*** and set your config DB
5) Copy ***[dist.firebase.config.js](api%2Fdist.firebase.config.js)*** and set your config firebase (for store image)
6) in [src/http.ts](src%2Fhttp.ts) you can set up api endpoint

7) Start express (execute [app.js](api%2Fapp.js))

``node app.js``


--------

For example you can use the next Users:
1) Admin user 

login: admin

password: admin

2) some user

login: test

password: test
