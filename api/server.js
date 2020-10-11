var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;
var cors = require('cors');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

require('./routes/user.routes.js')(app);
require('./routes/lesson.routes.js')(app);
require('./routes/lessonException.routes.js')(app);
require('./routes/booking.routes.js')(app);
require('./routes/search.routes.js')(app);

app.listen(port, () => {
    console.log("Woop Woop! Server started successfully!")
});