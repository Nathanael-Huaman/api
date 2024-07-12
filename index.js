const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// Leer el archivo products.json
const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf-8'));

// Middleware para manejar CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Endpoint para obtener todos los productos
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Endpoint para obtener productos por categoría
app.get('/api/products/category/:category', (req, res) => {
    const category = req.params.category;
    const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());
    res.json(filteredProducts);
});

// Endpoint para obtener un producto por ID
app.get('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const product = products.find(product => product.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send({ message: "Product not found" });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

