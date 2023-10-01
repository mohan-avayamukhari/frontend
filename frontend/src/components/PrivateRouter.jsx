import { useState } from "react"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({children}) => {
  const [jwt, setJwt] = useState(true)
  return jwt? children : <Navigate to="/login"/>
}

export default PrivateRoute