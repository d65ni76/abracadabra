const express = require('express');
const app = express();

const usuarios = [
  'juan',
  'jocelyn',
  'astrid',
  'maria',
  'ignacia',
  'javier',
  'brian'
]
app.use(express.static('./public/assets/css', { root: process.cwd() }));
app.use(express.static('./public/assets/img', { root: process.cwd() }));

// 4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el
// usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado
// en el servidor.
app.use('/abracadabra/juego/:usuario', (req, res, next) => {
  usuarios.find(usuario => usuario === req.params.usuario)
    ? next()
    : res.status(404).send('<img src="/who.jpeg" alt="NO autorizado"/>')
});

// 5. Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el
// número generado de forma aleatoria.
// En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la
// imagen de Voldemort.

app.get('/abracadabra/conejo/:n', (req, res) => {
  if (Math.floor(Math.random() * (4 - 1) + 1) === parseInt(req.params.n)) {
    res.status(200).send('<img src="/conejito.jpg" alt="conejo"/>')
  } else {
    res.status(200).send('<img src="/voldemort.jpg" alt="El que no debe ser nombrado"/>')
  };
});
// 2. Definir la carpeta “assets” como carpeta pública del servidor.
// app.use(express.static(path.join(__dirname + "/assets")));

app.get('/abracadabra/juego/:usuario', (req, res) =>
  res.sendFile('./public/index.html', { root: process.cwd() })
);

// 3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de
// la ruta /abracadabra/usuarios.
app.get("/abracadabra/usuarios", (req, res) => {
  // res.sendFile(path.join(__dirname + "/usuarios.json"))
  res.status(200).json({ usuarios })
})


app.all('*', (req, res) => res.status(404).json({ code: 404, message: 'Page not Found !!!' }));
// 1. Crear un servidor con Express en el puerto 3000.
app.listen(process.env.PORT || 3_000);