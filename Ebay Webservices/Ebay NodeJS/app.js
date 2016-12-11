
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , login = require('./routes/login')
  , register = require('./routes/register')
  ,session = require('client-sessions')
  ,aboutM = require('./routes/about')
  ,adM = require('./routes/adM')
  ,checkout = require('./routes/checkout')
  ,processCard = require('./routes/processCard')
  ,pool = require('./routes/sql_pool');
  var logger=require('./log.js'); 
  
var app = express();

// all environments
app.use(session({   
	  
	cookieName:'session',    
	secret: 'mystring',    
	duration: 30 * 60 * 1000,    //setting the time for active session
	activeDuration: 5 * 60 * 1000,  }));
app.set('port', process.env.PORT || 3050);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.disable('etag');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index); //done
app.get('/signIn', login.signIn);// done
app.get('/Register', login.signIn); //done
app.get('/ads',adM.ad);//done
app.get('/about',aboutM.about);//done
app.get('/logout',register.logout);//done
app.get('/aboutProfile',aboutM.getProfile); //done
app.get('/getAds',adM.getAds);//done
app.get('/checkout',checkout.home);//done
app.get('/getCart',checkout.getCart);//done
app.get('/sell',adM.sellHome);//done
app.get('/getAuctions',adM.getAuctions);
app.get('/getBoughtItems',aboutM.getBoughtItems);//done
app.get('/getSoldItems',aboutM.getSoldItems);//done
app.get('/MyBidResults',aboutM.getBidResults);//done

app.post('/Register',register.signup);//done
app.post('/checklogin',register.authenticate);//done
app.post('/updateAbout',aboutM.updateProfile); //done
app.post('/postAd',adM.postAd);//done
app.post('/addItem',adM.addtoCart);//done
app.post('/processCard',processCard.validate);//done
app.post('/removeItem',adM.removeFromCart);//done
app.post('/postAuction',adM.postAuction);//done
app.post('/registerBid',adM.registerBid);


pool.createNewPool(25);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/*const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = new (winston.Logger)({
  transports: [
   
    new (winston.transports.File)({
      filename: `${logDir}/results.log`,
      timestamp: tsFormat,
      level: env === 'development' ? 'debug' : 'info'
    })
  ]
});*/
logger.info('Hello world');