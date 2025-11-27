document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const resp = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email.value,
            senha: senha.value
        })
    });

    const data = await resp.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "./dashboard.html";
    }

    document.getElementById("msg").innerHTML = `<div class="alert alert-info">${data.msg}</div>`;
});