import api from "./api";

export function isAuthenticated() {
  const token = getToken();
  return token !== null && token !== undefined ? true : false;
}

export function getToken() {
  return localStorage.getItem("TOKEN");
}

export async function login(email, password) {
  try {
    const res = await api.post("/login", {
      email,
      password,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {}
export default { isAuthenticated, getToken, login, logout };
