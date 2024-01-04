import axios from "axios";

const baseURL = 'http://localhost:5001/cluster'

const getAllClusters = async () => {
  try {
    const response = await axios.get(`${baseURL}/get-all`, {withCredentials: true});
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const addCluster = async(values) => {
  try{
    const response = await axios.post(`${baseURL}/add-cluster`,
    {
      clusterName: values.clusterName,
      fqdnIp: values.fqdnIp,
      port: values.port,
      serviceToken: values.serviceToken
    },
    {withCredentials: true}
    );
    return response.status;
  }catch(error){
    console.error(error);
    throw error
  }
}

const updateSeverity = async (id, severity) => {
  try{
    const response = await axios.patch(`${baseURL}/severity/${id}`, {severity:severity}, {withCredentials:true})
    return response
  }catch(error){
    console.error(error)
  }
}

const updateToken = async (id, token) => {
  try{
    const response = await axios.patch(`${baseURL}/token/${id}`, {serviceToken:token}, {withCredentials:true})
    return response
  }catch(error){
    console.error(error)
  }
}

const updateCluster = async (id, values) => {
  try{
    const response = await axios.put(`${baseURL}/${id}`, 
    {
      clusterName: values.clusterName,
      fqdnIp: values.fqdnIp,
      port: values.port,
    },
    {withCredentials:true}
    );
    return response.status;
  }catch(error){
    console.error(error)
  }
}

const deleteCluster = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}/${id}`, {withCredentials: true});
    return response.status;
  } catch (error) {
    console.error(error);
    return error.response ? error.response.status : -1;
  }
};


export {getAllClusters,updateCluster, updateToken, updateSeverity, addCluster, deleteCluster}
