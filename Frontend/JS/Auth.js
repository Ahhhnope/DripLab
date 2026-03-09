export async function checkLogin() {

  const res = await fetch("http://localhost:8080/api/auth/me", {
    credentials: "include"
  });

  if (!res.ok) {
    window.location.href = "/Frontend/HTML-INTERFACE/Login.HTML";
  }

  return res.json();
}