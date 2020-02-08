var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3001);

const accountRouter = require('./routes/account');

app.use('/account', accountRouter);

app.get('/', function(req, res){
  res.send('Root');
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
