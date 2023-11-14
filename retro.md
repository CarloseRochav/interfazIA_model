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

### Errores en versiones

- Al pedir recomendaciones sobre algunos procesos que queria incorporar en mi proyecto. Claude2 me recomendo usar useHistory modulo de
react-router-dom, pero el compilador marcaba error y decia que useHistory no era reconocido, la ia me sugerior varias soluciones
pero ninguna lo soluciono. 
- Al preguntar a otra IA me recomendo revisar la documentacion oficial (la vieja confiable). Y al investigar un poco mas 
me di cuenta que useHistory, en efecto, fue reemplazado por useNavigate en la version mas reciente de react-router-dom.
- Importancia de revisar la documentacion oficial* y darse cuenta que las ia no estan 100& actualizadas en informacion**