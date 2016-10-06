const port = 3000;
var mainJson = require('./main.json');
var itemJson = require('./item.json');
var elementJson = require('./element.json');
var personalinfoSsn = require('./personalinfo-ssn.json');
var personalinfoPhone = require('./personalinfo-phone.json');
var fs = require('file-system');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mySession = session({
  secret: 'N0deJS1sAw3some',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
});


var app = express();
app.use(mySession);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


//Serving public folder as static
app.use(express.static('public'));

app.get('/mainJson', function (req, res) {
    res.json(mainJson);
});


app.get('/itemJson', function (req, res) {
    res.json(itemJson);
});

app.get('/updateJson', function (req, res) {
  search(mainJson);
  function search (searchObj){
      for(var key in searchObj ){
        var rVal = searchObj[key];
        if(typeof rVal === 'object') {
          if(searchObj[key].serverInsert =='personalinfo-ssn')
            searchObj[key] = personalinfoSsn;
          else if(searchObj[key].serverInsert =='personalinfo-phone')
            searchObj[key] = personalinfoPhone;
          search(rVal);
        }
      }
      return searchObj;
    }
  mainJson = search(mainJson);
  fs.writeFileSync("main.json", JSON.stringify(mainJson,null,4));
  res.json(mainJson);
});


app.get('/elementJson', function (req, res) {
    res.json(elementJson);
});


app.listen(port, function () {
  console.log('app listening on port 3000!');
});
