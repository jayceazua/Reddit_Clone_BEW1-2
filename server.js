const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Template Engine setup
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CRUD Resource >> Posts

app.get('/', (req, res) => {
  res.send('Hello, World!');
});



app.listen(port, () => {
  console.log(`Reddit Clone is listening on port: ${port}`);
});
