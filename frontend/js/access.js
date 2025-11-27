async function acessar(endpoint) {
    const token = localStorage.getItem("token");

    // Impede acesso se não tiver token
    if (!token) {
        alert('Você precisa estar logado.');
        window.location.href("./login.html");
    }

    const resp = await fetch(`http://localhost:3000${endpoint}`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const data = await resp.json();
    document.getElementById("resp").innerHTML =
        `<pre class="alert alert-info">${JSON.stringify(data, null, 2)}</pre>`;
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "./login.html";
}