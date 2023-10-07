import axios from "axios";

const baseURL = 'http://localhost:5001/auth'

const login = async (name, psw) => {
  try {
    const response = await axios.post(`${baseURL}/login`,{name: name, psw: psw});
    return response.status;
  } catch (error) {
    console.log();
    throw error;
  }
}


const verifyLoginState = async() => {
  try{
    const response = await axios.get(`${baseURL}/check-auth-status`, { withCredentials: true })
    return response.status;
  }catch (error){
    console.log(error);
    throw error;
  }
}
export {login, verifyLoginState}
