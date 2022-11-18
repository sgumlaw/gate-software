const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const enforce = require('express-sslify');

const app = express();

//this will enforce your users to use the secure version of your website 
app.use(enforce.HTTPS( { trustProtoHeader: true }));
//this next command serves up the build files. If we look in package.json there is a build command. It
//runs the build command before the serve command 
//compiles our build files into a dist file
//we have to use __dirname because we don't know where our files will be on the Heroku server  
app.use(serveStatic(__dirname + '/dist'));
//this is middleware to prevent router history issues 
app.use(history());


app.listen(process.env.PORT || 5000)