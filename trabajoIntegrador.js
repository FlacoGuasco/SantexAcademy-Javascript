/*
En el archivo tarea2.js podemos encontrar un código de un supermercado que vende productos.
El código contiene 
    - una clase Producto que representa un producto que vende el super
    - una clase Carrito que representa el carrito de compras de un cliente
    - una clase ProductoEnCarrito que representa un producto que se agrego al carrito
    - una función findProductBySku que simula una base de datos y busca un producto por su sku
El código tiene errores y varias cosas para mejorar / agregar
​
Ejercicios
1) Arreglar errores existentes en el código
    A) Al ejecutar agregarProducto 2 veces con los mismos valores debería agregar 1 solo producto con la suma de las cantidades.    
    B) Al ejecutar agregarProducto debería actualizar la lista de categorías solamente si la categoría no estaba en la lista.
    C) Si intento agregar un producto que no existe debería mostrar un mensaje de error.
​
2) Agregar la función eliminarProducto a la clase Carrito
    a) La función eliminarProducto recibe un sku y una cantidad (debe devolver una promesa)
    B) Si la cantidad es menor a la cantidad de ese producto en el carrito, se debe restar esa cantidad al producto
    C) Si la cantidad es mayor o igual a la cantidad de ese producto en el carrito, se debe eliminar el producto del carrito
    D) Si el producto no existe en el carrito, se debe mostrar un mensaje de error
    E) La función debe retornar una promesa
​
3) Utilizar la función eliminarProducto utilizando .then() y .catch()
*/


// Cada producto que vende el super es creado con esta clase
class Producto {
    sku;            // Identificador único del producto
    nombre;         // Su nombre
    categoria;      // Categoría a la que pertenece este producto
    precio;         // Su precio
    stock;          // Cantidad disponible en stock

    constructor(sku, nombre, precio, categoria, stock) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;

        // Si no me definen stock, pongo 10 por default
        if (stock) {
            this.stock = stock;
        } else {
            this.stock = 10;
        }
    }
}

// Creo todos los productos que vende mi super
const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
const jabon = new Producto('WE328NJ', 'Jabon', 4, 'higiene', 3);

// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];


// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra

    // Al crear un carrito, empieza vació
    constructor() {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias = [];
    }

    // Función que agrega @{cantidad} de productos con @{sku} al carrito
    async agregarProducto(sku, cantidad) {
        
        // Busco el producto en la "base de datos"
        try {
            console.log(`Buscando código del producto: ${sku}.`);

            const producto = await findProductBySku(sku);
            
            // Creo un producto nuevo
            const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad, producto.precio);
            
            // Se agrega un producto nuevo o se modifican las cantidades según corresponda
            if(this.productos.find(prod => prod.sku === sku)) {
                let index = this.productos.findIndex(prod => prod.sku === sku);
                
                this.productos[index].cantidad += cantidad; 
                this.precioTotal += (producto.precio * cantidad);
                
                if(cantidad <= 1){
                    console.log(`\nSe suma ${cantidad} unidad de "${producto.nombre}".`);
                } else {
                    console.log(`\nSe suman ${cantidad} unidades de "${producto.nombre}".`);
                }
                
            } else {
                this.productos.push(nuevoProducto);
                this.precioTotal += (producto.precio * cantidad);

                if(!(this.categorias.includes(producto.categoria))){
                    this.categorias.push(producto.categoria)
                }
                
                if(cantidad <= 1){
                    console.log(`\nAgregando ${cantidad} unidad de "${producto.nombre}" al carrito.`);
                } else {
                    console.log(`\nAgregando ${cantidad} unidades de "${producto.nombre}" al carrito.`);
                }
            }

        } catch (error) {
            console.log(`\nEl producto "${sku}" no es comercializado en la tienda, elija otro por favor. \n`);
        }
    }
    
    // Función que elimina @{cantidad} de productos con @{sku} del carrito
    async eliminarProducto(sku, cantidad) {
        console.log(`Se va a eliminar: ${sku}.`);

        // Se elimina el producto o se modifican las cantidades según corresponda
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let index = this.productos.findIndex(prod => prod.sku === sku);

                if(index === -1){
                    reject(`\nNo se encuentra "${sku}" en el carrito, verifique por favor. \n`);

                } else if(this.productos[index].cantidad > cantidad){
                    this.productos[index].cantidad -= cantidad; 
                    this.precioTotal -= (this.productos[index].precioUnitario * cantidad);

                        if(cantidad <= 1){
                            resolve(`\nSe resta ${cantidad} unidad de "${this.productos[index].nombre}".`);
                        } else {
                            resolve(`\nSe restan ${cantidad} unidades de "${this.productos[index].nombre}".`);
                        }

                } else {
                    this.precioTotal -= (this.productos[index].precioUnitario * this.productos[index].cantidad);
                    this.categorias.splice(index, 1);
                    resolve(`\nSe ha eliminado el producto "${this.productos[index].nombre}" del carrito. \n`);
                    this.productos.splice(index, 1);  
                }
            }, 4000);
        })
    }
}
    
// Cada producto que se agrega al carrito es creado con esta clase
class ProductoEnCarrito {
    sku;       // Identificador único del producto
    nombre;    // Su nombre
    cantidad;  // Cantidad de este producto en el carrito
    precioUnitario; // Precio unitario al momento de compra
        
     constructor(sku, nombre, cantidad, precioUnitario) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    } 
}


// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.sku === sku);
            if (foundProduct) {
                resolve(foundProduct);
            } else {
                reject(`Product ${sku} not found`);
            }
        }, 1500);
    });
}

// Probando agregar productos
const carrito = new Carrito();
carrito.agregarProducto('WE328NJ', 2);
carrito.agregarProducto('XX92LKI', 5);
carrito.agregarProducto('KS944RUR', 10);
carrito.agregarProducto('XX92LKI', 1);
carrito.agregarProducto('WE328NJ', 3);
carrito.agregarProducto('erer', 1);

// Probando eliminar productos
carrito.eliminarProducto('WE328NJ', 1)
.then((resultado) => console.log(resultado))
.catch((error) => console.log(error));

carrito.eliminarProducto('XX92LKI', 6)
.then((resultado) => console.log(resultado))
.catch((error) => console.log(error));


// Se demora la ejecución para la impresión actualizada del carrito 
setTimeout(() => {
    console.log(carrito);
}, 6000);