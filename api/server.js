var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//app.use(express.static(__dirname + "/dist/"));
//app.get(/.*/, function(req, res) {
//    res.sendfile(__dirname + "/dist/index.html");
//});


require('./routes/student.routes.js')(app);

app.listen(port, () => {
    console.log("Woop Woop! Server started successfully!")
});