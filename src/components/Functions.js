import Papa from "papaparse"


//Funcion para obtener las preddiciones
const getData = async () =>{
    try {
        const response = await fetch('http://127.0.0.1:5000/train');
        const data = await response.json();
        //Al setear el estado, accede directamente a la propiedad predictions en lugar de todo el objeto data:
        // ;; Recomendacion
        //setPredicts(data.predicciones)//      
        return data.predicciones
      } catch (error) {
        console.error("Frontend dice  : " + error);
      } finally {
        console.log('Proceso terminado');
      }    
}

//Funcion para subir archivo
const uploadFile = async (file)=>{   
    
    try {

        //Validar que el archivo existe
        if (!file) {
          console.log("No se encontro ningun archivo")
        }
  
        //Upload file to endpoint POST Method   
  
        //   //Object necessery to load file
        const formData = new FormData();
        formData.append("file", file);
  
  
        const response = fetch('http://127.0.0.1:5000/upload', {
          method: "POST",
          body: formData
        });  
  
        //return console.log("Respuesta : " + response.json())
        return response.json()
        //   //Al setear el estado, accede directamente a la propiedad predictions en lugar de todo el objeto data:
        //   // ;; Recomendacion
        //setPredicts(data.predicciones)
      } catch (error) {
        console.log("Error al procesar request : " + error);
      } finally {
        console.log('Proceso terminado');
      }


}

const castFile = (file)=>{
    

    //var response;
    //Este proceso que sigue es necesario ya que no recibe el archivo con un formato adecuado para su lectura
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result;

      Papa.parse(text, {

        header: true,
        // Esta opción permite que 'papaparse' intente automáticamente convertir los valores 
        // analizados a los tipos de datos apropiados (números, fechas, booleanos, etc.). Esto puede ser especialmente útil si tienes campos numéricos en tu archivo CSV.
        dynamicTyping: true,
        // Esta opción le indica a 'papaparse' que ignore las líneas vacías en el archivo CSV durante 
        //el proceso de análisis. Esto puede ser útil para evitar errores o problemas al analizar filas vacías.
        skipEmptyLines: true,
        complete: (result) => {
          const { data, meta, errors } = result;
          if (errors.length === 0) {
            // setCSVData(data);
            // setCSVHeader(meta.fields);
            console.log(result)
            return result
          } else {
            return errors
          }
        },
      });
    }   

    return reader.readAsText(file);    

    

}//Pendiente no se realiza la desustruturacion bien en el frontentd



//Funcion para obtener datable/DataSource
const getDataSource = async ()=>{
}




export const funciones = {
    getData: getData,
    uploadFile: uploadFile,
    castFile:castFile,
    funcion2: () => {console.log("hola Mundo")},    
  }


