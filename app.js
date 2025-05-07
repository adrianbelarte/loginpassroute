const express = require('express');
const dotenv = require('dotenv');
const middlewares = require('./middlewares');
const routes = require('./routes');
const app = express();
const PORT = 4000;

dotenv.config();
middlewares.setupAPP(app);
routes.setup(app);

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
  });