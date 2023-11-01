# Puntos importantes


### Error "Mostrar archivo recibido en tabla"

- El error ocurría porque estabas tratando de acceder al contenido del archivo directamente como .text(), pero los objetos File no tienen ese método.

- En su lugar, es necesario usar un FileReader. Esto se debe a limitaciones de seguridad del navegador - no se puede acceder al contenido de un archivo subido directamente, primero hay que pasarlo a través de FileReader.

- FileReader expone el método .readAsText() al cual le pasas el archivo. Esto desencadena la lectura del contenido del archivo.

- Pero esa lectura ocurre de manera asíncrona. Por eso es necesario escuchar el evento onload  del FileReader. Ahí es donde se obtiene el contenido con reader.result.

- Una vez con el contenido como texto, recién se lo puede pasar a PapaParse para analizar el CSV.


### Enviar archivo a server desde react fetch


### Alternativa a Alert : react-modal

- Para mostrar la pregunta y opciones de forma emergente, similar a un alert, podemos utilizar un modal en React.

