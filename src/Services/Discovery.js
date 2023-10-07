import axios from "axios";

const baseURL = 'http://localhost:5001/cluster'

const getAllClusters = async () => {
  try {
    const response = await axios.get(`${baseURL}/get-all`);
    return response.data;
  } catch (error) {
    console.log();
    throw error;
  }
}

export {getAllClusters}
