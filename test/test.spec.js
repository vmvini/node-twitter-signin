const key = 'TWITTER_CONSUMER_KEY';
const secret = 'TWITTER_CONSUMER_SECRET';
const request = require('supertest');
const express = require('express');
const app = express();
const TwitterApi = require('./../index.js');

let callbackUrlCalled = false;
let request_token = null;

app.use('/', TwitterApi(key, secret, 'http://localhost:3000/twitter/callback', 
    function(user, token){
        console.log("user", user);
        console.log("token", token);
        callbackUrlCalled = true;
    }
));

var http = require('http');
var server = http.createServer(app);
server.listen(3000);


require('chromedriver');
const webdriver = require('selenium-webdriver');
const driver = new webdriver.Builder()
                .forBrowser('chrome')
                .build();

describe('GET request token', function() {

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    if(key === "TWITTER_CONSUMER_KEY"){
        throw "you need to set your consumer key in the global var 'key'";
    }
    if(secret === "TWITTER_CONSUMER_SECRET"){
        throw "you need to set your consumer secret in the global var 'secret'";
    }
    
    
    it('respond with the request token', function(done) {
        request(app)
        .get('/twitter/signin')
        .expect(200)
        .end(function(err, res) {
            if (err) throw err;
            else{
                request_token = res.body.request_token;
            }
            done();
        });
    });

    it('open twitter login form', function(done){
        driver.get('https://api.twitter.com/oauth/authenticate?oauth_token='+request_token);
        
        setInterval(function(){
            driver
            .getCurrentUrl()
            .then(url=>{
                if( url.indexOf('localhost') != -1 ){
                    done();
                }
            });
        }, 1000);

    });

    it("test callback url", function(done){
        expect(callbackUrlCalled).toBeTruthy();
        driver.quit();
        done();
        
    });
});