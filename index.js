const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:5500', 'https://myapp.co'];
const options = {
  origin:(origin,callback)=>{
    if(whiteList.includes(origin)){
      callback(null,true);
    }else
      {callback(new Error('no permitido'));
    }
  }
}
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hola mi primer server');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/nueva-ruta', (req, res) => {
  res.send('soy una ruta');
});


app.listen(port, () => {
  console.log('Mi port '+port);
});
