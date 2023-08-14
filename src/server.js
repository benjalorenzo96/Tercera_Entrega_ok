const express = require('express');
const app = express();
const PORT = 8080;
const ProductManager = require('./ProductManager');

const productManager = new ProductManager('Productos.json');

app.get('/products', async (req, res) => {
  const limit = req.query.limit;

  try {
    const products = await productManager.getProducts();

    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);

  try {
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto por ID' });
  }
});

app.get('/saludo', (req, res) => {
  res.send('¡Hola a todos, pero ahora desde Express!');
});

app.get('/bienvenida', (req, res) => {
  const htmlResponse = '<p style="color: blue;">¡Bienvenido a mi sitio!</p>';
  res.send(htmlResponse);
});

app.get('/usuario', (req, res) => {
  const usuario = {
    nombre: 'Juan',
    apellido: 'Pérez',
    edad: 30,
    correo: 'juan@example.com'
  };
  res.json(usuario);
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
