import axios from "axios";

const instances = axios.create({
  baseURL: "http://localhost:3001/",
  //baseURL:"https://blog-server-3gtx.onrender.com/",
});

export default instances;
