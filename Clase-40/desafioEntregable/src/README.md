Consignas:
Modificar la capa de persistencia incorporando los conceptos de Abstract Factory y DAO.
Los DAOs deben presentar exactamente la misma interfaz hacia la lógica de negocio.
El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente o puede ser script de npm) será devuelto por una Factory para que la capa de negocio opere con el.
Cada uno de estos casos de persistencia (*elegir al menos dos para hacer la prueba, por ejemplo archivo/mongo o memoria/mongo o mongo/firebase *idealmente 3 DAOs) deberán ser implementados usando el patrón singleton que impida crear nuevas instancias de estos mecanismos de acceso a los datos.
Comprobar que si llamo a la factory dos veces, con una misma opción elegida, devuelva la misma instancia (\*patrón singleton).

solucion:
1.El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente o puede ser script de npm) será devuelto por una Factory para que la capa de negocio opere con el:

1. pasar por consola la base de datos : npm run dev firebase // por defecto comienza en mongo.

2.crear un usuario nuevo dependiendo la base de datos a usar para que se cree el carrito al crear el usuario.
