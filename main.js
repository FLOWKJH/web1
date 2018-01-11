var express = require('express');
var handlebars = require('express-handlebars').create({
                 defaultLayout:'main',
                 helpers:{
                            section: function(name, options){
                                if(!this._sections) this._sections = {};
                                this._sections[name] = options.fn(this);
                                return null;
                            }
                        }           
});
                    
var app = express();



app.set("port", process.env.PORT || 3000);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('view cache', false);  // 개발 : flase, 운영 : ture

app.use(express.static(__dirname + '/public'));

require('./routes.js')(app);

app.use(function(req,res, next){
   res.status(404);
   res.send('404 not found');
});

app.use(function(err, req, res, next){
   console.error(err.stack);
   res.status(500);
   res.send('505');
});

app.listen(app.get("port"), function(){
    console.log(   (new Date()) + " Express started in mode on http://localhost:"+ app.get("port") + 
                    " ; press Ctrl-C terminate.");
});

