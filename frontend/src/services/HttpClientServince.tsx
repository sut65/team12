import { SigninInterface } from "../interfaces/ISignin";
const apiUrl = "http://localhost:8080";

async function Login(data: SigninInterface) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  
    let res = await fetch(`${apiUrl}/login`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log(res.data)
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("role", res.data.role);
          return res.data;
        } else {
          return false;
        }
      });
  
    return res;
  }
  
  export {
    Login
  };