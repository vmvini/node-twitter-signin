# node-twitter-signin
sets twitter oauth authentication on your node js express server specifically to handle the usage by a spa app

### Install 
```sh
  npm install --save node-twitter-signin
```

### Usage 
```javascript
  const TwitterApi = require('node-twitter-signin');
  
  //really simple, right?
  app.use('/', TwitterApi(key, secret, callbackUrl, callback, callback_render ));
  
  /**
    key:  twitter app's consumer key
    secret: twitter app's consumer secret 
    callbackUrl: callback url. 
       In this case, using TwitterApi in the route '/', the url is 'http://localhost:3000/twitter/callback'
    
    callback: function that will be called giving you the authenticated user and its token.
      for example:
        function callback(user, token){
          //do whatever you want with the user and its token
          //like, save on the database, send a message through socketio to the client app, etc...
          console.log("user", user);
          console.log("token", token);

          //token has the properties below:
          //  -token (is the access_token)
          //  -secret (is the token secret)
          //  -request_token (is the related request_token )
        }

    callback_render: will be called giving the express 'res' object to allow you decide 
      what to send to the client when your callbackUrl is called.
      for example:
        function callback_render(res){
          res.json({
            'msg':'success'
          });
        }
  */

```

### How it works 

This module adds two routes into your express server.

* GET /twitter/signin

  Your client side app should call this.
  
  This will return a http response with a json containing the property request_token.
  
  Do wathever you want with the request_token
  
  For instance, open a new window with 'https://api.twitter.com/oauth/authenticate?oauth_token='+request_token 
  to allow the user do login on twitter.

* GET /twitter/callback 
  
  Twitter will call this route after the user types his credentials

### Testing

The test command will open your chrome browser with twitter login page. (so you must have chrome installed)

Type your credentials.

If all tests pass, you should view the user and its token printed out on the console.

### How to test

Open the file ./test/test.spec.js
on the top of the file, insert your consumer key and consumer secret.

```javascript
const key = 'TWITTER_CONSUMER_KEY'; //replace by yours
const secret = 'TWITTER_CONSUMER_SECRET'; //replace by yours
```

run the command
```sh
  npm run test
```
