/* 1) Realizar una funcion que reciba un numero y escriba una piramide desde 1 hasta ese numero de la siguiente forma:
para valor 6
1
12
123
1234
12356

para valor 3
1
12
123 */

/* function imprimePiramideNumero(numero) {
    for(let i = 1; i <= numero; i++){
        var seImprime = "";
        for(let j = 1; j <= i; j++){
            let string = j.toString();
            seImprime = seImprime + string;
        }
        console.log(seImprime);
    };
};

imprimePiramideNumero(6); */



/* 2) Escribir una funcion que reciba 2 array y devuelva un array con todos los elementos que coinciden entre ellos

Ejemplo:
Array1: ['rojo', 'azul', 'amarillo']
Array2: ['blanco', 'negro', 'rojo']
Resultado: ['rojo']

Ejemplo 2:
Array1: [4, 3, true, 'manzana']
Array2: ['pera', 3, f alse, true, 3, true]
Resultado: [3, true] */

/* function elementosIguales(arr1, arr2) {
    const newArr = [];

    for(let i = 0; i <= arr2.length; i++){
        if(arr1.includes(arr2[i])) {
            newArr.push(arr2[i]);
        };
    };

    console.log(newArr);
}

const array1 = ['rojo', 'azul', 'amarillo'];
const array2 = ['blanco', 'negro', 'rojo', 'azul'];

elementosIguales(array1, array2); */



/* 3)
3.1) Dado el siguiente objeto
let carrito = {
    montoTotal: 10,
    productos: ["Leche"]
}
Crear las clases necesarias para generar carritos respetando la estructura del objeto dado. */
   /*  agregar(producto) {
        if (!this.existe(producto.id)) {
            this.productos.push(producto);
            this.guardar();
        }
    } */

/* 3.2) Agregar un metodo a la clase que agregue un producto al carrito y actualice el montoTotal
agregarProducto(nombre, precio, unidades) {
    // Completar aca...
}
Ej:
agregarProducto("Azucar", 5, 2);

//Resultado esperado
carrito = {
    montoTotal: 20,
    productos: ["Leche", "Azucar"]
} */

/* 3.3)Agregar al ejercicio anterior una validación para no permitir duplicados e imprimir un mensaje si el item ya existe “ya existe xxx con yyy unidades” */

class Carrito {
        constructor(montoTotal, productos) {
        this.montoTotal = montoTotal;
        this.productos = productos;
    };

    agregarProducto(nombre, precio, unidades) {
        
        for(let i = 0; i < this.productos.length; i++){
            if(this.productos[i].nombre === nombre){
                for(let j = 0; j < this.productos.length; j++){
                    if(this.productos[j].nombre === nombre){
                        console.log(`ya existe ${this.productos[j].nombre} con ${this.productos[j].unidades} unidades`);
                        return;
                    }
                }
            }
        }
        this.productos.push({nombre, precio, unidades});
        this.montoTotal = this.montoTotal + (precio * unidades);


    };
}
const carro1 = new Carrito(0, []);
carro1.agregarProducto('Pollo', 20, 6);
carro1.agregarProducto('Pescado', 10, 5);
carro1.agregarProducto('Pollo', 14, 2);
carro1.agregarProducto('Peras', 25, 8);
console.log(carro1);






/* const productos = [
    { nombre: 'Pollo', precio: 20, unidades: 6 },
    { nombre: 'Pescado', precio: 10, unidades: 5 },
    { nombre: 'Peras', precio: 14, unidades: 2 },
    { nombre: 'Pollo', precio: 25, unidades: 8 }
]

console.log(productos[0].nombre); */