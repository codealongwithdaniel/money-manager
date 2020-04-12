const app = require('express')();
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const cors = require('cors')

const port = 8000;

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use('/api/v1', routes);

app.listen(port, function(){
    console.log('Server started');
})