import axios from "axios";

export const loginService = async (email, password) => {
  console.log("Entered LoginService"); // Checking if we entered the service (5)
  return await axios.post("/api/auth/login", { email, password }); // Going to the end point "/api/auth/login" to debug the error (6)
};
