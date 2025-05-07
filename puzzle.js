// Snippets de código para poder componer el programa

//Usado?: yes
  const middlewares = require('./middlewares');
//--- Explicación: Importa funciones auxiliares como middlewares personalizados.

// -------------------------------------------------------------------------------------

//Usado?: yes
const bodyParser = require('body-parser');
//--- Explicación: Importa el middleware para analizar cuerpos de formularios.

// -------------------------------------------------------------------------------------

//Usado?: yes
const session = require('express-session');
//--- Explicación: Importa el middleware de sesiones.

// -------------------------------------------------------------------------------------

//Usado?: yes
const express = require('express');
//--- Explicación: Importa el framework Express, base de nuestra app.

// -------------------------------------------------------------------------------------

//Usado?: yes
const bodyParser = require('body-parser');
//--- Explicación: Permite parsear los datos de formularios en `req.body`.

// -------------------------------------------------------------------------------------

//Usado?: yes
const session = require('express-session');
//--- Explicación: Maneja las sesiones del navegador del usuario.

// -------------------------------------------------------------------------------------

//Usado?: yes
const dotenv = require('dotenv');
//--- Explicación: Permite cargar variables de entorno desde el archivo .env.

// -------------------------------------------------------------------------------------

//Usado?: yes
const middlewares = require('./middlewares');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: yes
const routes = require('./routes');
//--- Explicación: Contiene las rutas de la app.

// -------------------------------------------------------------------------------------

//Usado?: yes
dotenv.config();
//--- Explicación: Ejecuta la configuración del entorno con dotenv.

// -------------------------------------------------------------------------------------

//Usado?: yes
const app = express();
//--- Explicación: Inicializa la aplicación de Express.

// -------------------------------------------------------------------------------------

//Usado?: yes
const PORT = 4000;
//--- Explicación: Define el puerto donde se ejecutará la app.

// -------------------------------------------------------------------------------------

//Usado?: 
const dotenv = require('dotenv');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?:
dotenv.config();
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: yes
middlewares.setupApp(app);
//--- Explicación: Ejecuta la configuración de middlewares generales.

// -------------------------------------------------------------------------------------

//Usado?: yes
routes.setup(app);
//--- Explicación: Carga las rutas en la aplicación.

// -------------------------------------------------------------------------------------

//Usado?: yes
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: Middleware que valida si la palabra ingresada es la correcta.


// -------------------------------------------------------------------------------------


//Usado?: yes
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: 


// -------------------------------------------------------------------------------------


//Usado?: yes
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: 


// -------------------------------------------------------------------------------------

//Usado?: yes
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//--- Explicación: Middleware general para configurar parser y sesiones.

// -------------------------------------------------------------------------------------

//Usado?: yes
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?:
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?:
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: yes
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: Arranca el servidor y lo pone a escuchar en el puerto 4000.

// -------------------------------------------------------------------------------------

//Usado?: yes
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: Middleware que comprueba si el usuario está logueado.

// -------------------------------------------------------------------------------------


//Usado?: yes
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 

// -------------------------------------------------------------------------------------


//Usado?:
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: yes
module.exports = {
  setup,
};
//--- Explicación:  Define y exporta todas las rutas que usa la aplicación.

// -------------------------------------------------------------------------------------

//Usado?: yes
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación: Exporta los middlewares para usarlos en otros archivos.

// -------------------------------------------------------------------------------------

