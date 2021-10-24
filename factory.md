# Patron de diseño FACTORY

El patrón **Factory** sugiere que, en lugar de llamar al operador **new** para construir objetos 
directamente, se invoque a un método **fábrica** especial. No te preocupes: los objetos se siguen creando a través del 
operador new, pero se **invocan** desde el método fábrica. Los objetos devueltos por el método fábrica a menudo se 
denominan **productos**.

## 💡 Aplicabilidad
⚡ El patrón Factory separa el código de construcción de producto del código que hace uso del producto. 
Por ello, es más fácil extender el código de construcción de producto de forma independiente al resto del código.

Por ejemplo, para añadir un nuevo tipo de producto a la aplicación, sólo tendrás que crear una nueva subclase 
creadora y sobrescribir el Factory que contiene.

⚡ Utiliza el Factory cuando quieras ahorrar recursos del sistema mediante la reutilización de objetos 
existentes en lugar de reconstruirlos cada vez.


🐞 Hay una pequeña **limitación**: las subclases sólo pueden devolver productos de distintos tipos si dichos productos
tienen una **clase base o interfaz común**. Además, el método fábrica en la clase base debe tener su **tipo de retorno**
declarado como dicha interfaz.

## 📓 Cómo implementarlo

1. Haz que todos los productos sigan la misma interfaz. Esta interfaz deberá declarar métodos que tengan sentido en 
todos los productos.


2. Añade un patrón Factory vacío dentro de la clase creadora. El tipo de retorno del método deberá coincidir 
con la interfaz común de los productos.


3. Encuentra todas las referencias a constructores de producto en el código de la clase creadora. Una a una, 
sustitúyelas por invocaciones al Factory, mientras extraes el código de creación de productos para colocarlo 
dentro del Factory.

    Puede ser que tengas que añadir un parámetro temporal al Factory para controlar el tipo de producto devuelto.

    A estas alturas, es posible que el aspecto del código del Factory luzca bastante desagradable. Pero, no te preocupes, lo arreglaremos enseguida.


4. Ahora, crea un grupo de subclases creadoras para cada tipo de producto enumerado en el Factory. Sobrescribe el Factory en las subclases y extrae las partes adecuadas de código constructor del método base.


5. Si hay demasiados tipos de producto y no tiene sentido crear subclases para todos ellos, puedes reutilizar el parámetro de control de la clase base en las subclases.

    Por ejemplo, imagina que tienes la siguiente jerarquía de clases: la clase base Correo con las subclases CorreoAéreo y CorreoTerrestre y la clase Transporte con Avión, Camión y Tren. La clase CorreoAéreo sólo utiliza objetos Avión, pero CorreoTerrestre puede funcionar tanto con objetos Camión, como con objetos Tren. Puedes crear una nueva subclase (digamos, CorreoFerroviario) que gestione ambos casos, pero hay otra opción. El código cliente puede pasar un argumento al Factory de la clase CorreoTerrestre para controlar el producto que quiere recibir.


6. Si, tras todas las extracciones, el Factory base queda vacío, puedes hacerlo abstracto. Si queda algo dentro, puedes convertirlo en un comportamiento por defecto del método.

## ⚖️Pros y Contras
✔️ Evitas un acoplamiento fuerte entre el creador y los productos concretos.

✔️Principio de responsabilidad única. Puedes mover el código de creación de producto a un lugar del programa, haciendo que el código sea más fácil de mantener.

✔️Principio de abierto/cerrado. Puedes incorporar nuevos tipos de productos en el programa sin descomponer el código cliente existente.

❌ Puede ser que el código se complique, ya que debes incorporar una multitud de nuevas subclases para implementar el patrón. La situación ideal sería introducir el patrón en una jerarquía existente de clases creadoras.

## 💠 Como se usó en el Proyecto
![Factory Method](https://github.com/murtagh95/crud_typeorm_sqlite/blob/main/public/img/FactoryController.png)

Se decidió utilizar este patron de diseño para lograr una abstracción a la hora de usar los controladores y a su vez tener
el código que se repite en un solo lugar. Logrando no tener código repetido, fácil mantenimiento y facilitando la creación
e implementación de nuevos controladores.

Con la declaración del type_controller se define que tipo de controlador se debe generar y con él se definen el correcto
enrutamiento de las diferentes vistas. Y con la declaración de data_update y data_create definimos que datos saran los 
utilizados desde la request.body y enviados al servicio para realizar su respectiva creación/actualización

Si necesitamos crear una nueva entidad podemos heredar de GenericController y cambiar solo los métodos que se necesiten o
directamente usar dicha clase que provee de métodos básicos para realizar el CRUD de una entidad. 

También se utilizó la inyección de dependencias para lograr tener desacoplado el uso del servicio/base de datos. Siempre
y cuando el servicio implemente los métodos como se declaró en la Interfaz se podrá cambiar entre diferentes servicios sin
afectar el funcionamiento general del controlador o del router.
