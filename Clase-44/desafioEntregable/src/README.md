Consignas:
En base al último proyecto entregable de servidor API RESTful, reformar la capa de routeo y el controlador para que los requests puedan ser realizados a través del lenguaje de query GraphQL.
Si tuviésemos un frontend, reformarlo para soportar GraphQL y poder dialogar apropiadamente con el backend y así realizar las distintas operaciones de pedir, guardar, actualizar y borrar recursos.
Utilizar GraphiQL para realizar la prueba funcional de los querys y las mutaciones.

//NO hacer front. Solo persistencia en memoria.

//Pegar las querys aqui abajo adaptadas a Productos

solucion:
1- npm install --force

2 - correr el servidor con npm run dev

3 - golpear http://localhost:8080/productos

4- probar querys:
mutation crearProducto {
createProducto(datos: {
nombre: "Resident evil 4 remake",
precio: 8000,
categoria: "ps5",
thumbnail: "wwww.google.com",
stock: 10,
codigo: 756
descripcion: "juegos ps5"}){
id
nombre
precio
categoria
thumbnail
stock
codigo
descripcion
}

}

query getAll {
getProductos {
id
nombre
precio
categoria
thumbnail
stock
codigo
descripcion

}
}

mutation updateProducto {
updateProducto(id:"2833a71e8a537ab0f2a7", datos: {
nombre: "Elder Rings",
precio: 7400,
categoria: "ps4",
thumbnail: "wwww.google.com",
stock: 15,
codigo: 488,
descripcion: "juego de ps4"
}) {
id
nombre
precio
categoria
thumbnail
stock
codigo
descripcion

}
}

mutation deleteById {
deleteProducto(id: "e6a909472cdb28ec495b") {
id
nombre
precio
categoria
thumbnail
stock
codigo
descripcion
}
}
