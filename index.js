const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi primer server');
});

routerApi(app);

app.get('/nueva-ruta', (req, res) => {
  res.send('soy una ruta');
});


app.listen(port, () => {
  console.log('Mi port '+port);
});
