import axios from "axios";

const baseURL = 'http://localhost:5001/auth'

const login = async (values) => {
  try {
    const response = await axios.post(`${baseURL}/login`,{name: values.name, psw: values.psw}, {withCredentials:true});
    return response.status;
  } catch (error) {
    console.log();
    throw error;
  }
}

const removeToken = async () => {
  try {
    const response = await axios.post(`${baseURL}/logout`, {}, {withCredentials:true});
    return response.status;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};


const changePsw = async(values) =>{
  try {
    const response = await axios.patch(`${baseURL}/changePsw`,{currentPsw: values.currentPsw, newPsw:values.newPsw, confirmPsw:values.confirmPsw}, {withCredentials:true});
    return response.status;
  } catch (error) {
    console.log();
    throw error;
  }
}


const verifyLoginState = async() => {
    const response = await axios.post(`${baseURL}/check-auth-status`,{}, { withCredentials: true })
    return response.status;
}


const refreshToken = async() => {
  try{
    const response = await axios.post(`${baseURL}/token`,{}, { withCredentials: true })
    return response.status;
  }catch (error){
    console.log(error);
    throw error;
  }
}
export {login, removeToken, verifyLoginState, refreshToken, changePsw}
