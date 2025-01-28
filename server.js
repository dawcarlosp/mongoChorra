
const express = require("express");
const app = express();
//El contenido estatico tiene prioridad
app.use(express.static('public'));
const port = 3001;
const moduloOrdenador = require('./models/ordenador');

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());


// Datos de ejemplo (simulando una base de datos)
let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
];


// Obtener todos los ítems
app.get("/items", (req, res) => {
  moduloOrdenador.buscaTodos()
    .then(ordenadores => res.json(ordenadores))
    .catch(err => res.status(500).json({ "error": err }))
});
// Mostrar Index
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Obtener un ítem por ID
app.get("/items/:id", (req, res) => {
  const itemId = req.params.id;
  moduloOrdenador.buscaPorId(itemId)
    .then(ordenador => res.json(ordenador))
    .catch(err => res.status(500).json({ "error": err }))
});


// Crear un nuevo ítem
app.post("/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});


// Actualizar un ítem existente
app.put("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === itemId);
  if (itemIndex !== -1) {
    items[itemIndex].name = req.body.name;
    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ message: "Ítem no encontrado" });
  }
});


// Eliminar un ítem
app.delete("/items/:id", (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === itemId);
  if (itemIndex !== -1) {
    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
  } else {
    res.status(404).json({ message: "Ítem no encontrado" });
  }
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
