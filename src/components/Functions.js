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

const castFile = async (file)=>{    
    //var response;
    //Este proceso que sigue es necesario ya que no recibe el archivo con un formato adecuado para su lectura
    const reader = new FileReader();

    const text = await new Promise((resolve) => {
      reader.onload = () => {
        resolve(reader.result);  
      }
      reader.readAsText(file); 
    });

    const result = await Papa.parse(text, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true, 
      complete: (results) => {
        console.log(results)
        return results
      }
    });
  
    return result;   

}//Pendiente no se realiza la desustruturacion bien en el frontentd



const addNewPredicts = async (predicts)=>{

  try{
    //Validar que el archivo existe
    if (!predicts) {
      console.log("No existe valor en predicciones")
    }

    console.log("Predicciones a enviar : ", predicts)

    const request = await fetch("http://127.0.0.1:5000/update", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(predicts)

    });

    const response = await request.json()
    // [object Promise]", indicates that you are trying to log a Promise 
    // object to the console instead of the resolved value of the Promise. This is because 
    // Promises are asynchronous and return immediately, before the data is actually  available. 

    console.log("Estatus : " + response.messagge)
    // The error message you are seeing, "[object object]", suggests that you are 
    // trying to log an object to the console without specifying which property or value you want to log.              


  } catch (error) {
    console.error("Validate Error : " + error)
  }
}


const getFile = async ()=>{

  const response = await fetch("http://127.0.0.1:5000/uploads/formatted.csv");
  const reader = response.body.getReader();
  const result = await reader.read();
  const decoder = new TextDecoder('utf-8');
  const csv = decoder.decode(result.value);
  const parsed = Papa.parse(csv, { header: true });
  return parsed

}

export const funciones = {
    getData: getData,
    uploadFile: uploadFile,
    castFile:castFile,
    addNewPredicts: addNewPredicts,    
    getFile:getFile,    
  }


