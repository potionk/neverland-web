var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var cors = require('cors');

app.set('port', process.env.PORT || 3001);

const accountRouter = require('./routes/account');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/account', accountRouter);

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
