import axios from "axios";

const baseURL = 'http://localhost:5001/k8s'

const Version = async (id, signal) => {
  const response = await axios.get(`${baseURL}/version/${id}`, {signal:signal, withCredentials: true});
  return response;
}

const Namespaces = async (id) => {
  const response = await axios.get(`${baseURL}/getNamespaces/${id}`, { withCredentials: true });
  return response;
}


export {Version, Namespaces}