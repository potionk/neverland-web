var express = require('express');
var app = express();
var bodyParser = require('body-parser')
app.set('port', process.env.PORT || 3001);

const accountRouter = require('./routes/account');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/account', accountRouter);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
