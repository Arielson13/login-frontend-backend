document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const resp = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: nome.value,
            email: email.value,
            senha: senha.value,
            role: role.value
        })
    });

    const data = await resp.json();
    document.getElementById("msg").innerHTML = `<div class="alert alert-info">${data.msg}</div>`;
});