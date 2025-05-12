//Importa a biblioteca axios, que é usada para fazer requisições HTTP. 
import axios from "axios"; 

//Criando uma instância do axios, chamada "api"
const api = axios.create({
    baseURL: "http://localhost:3000",  //Define a URL base para todas as requisições feitas com essa instância
})

export default api;