const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => (obj[key] = value));
    const response = await fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    try {
        if (response.ok) {
            const result = await response.json();
            if (result.status === 1) {
                window.location.replace('/products');
            } else {
                alert(result.msg);
            }
        } else {
            // Manejar respuestas no exitosas aquí
            if (response.status === 401) {
                alert('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
            } else if (response.status === 500) {
                alert('Ocurrió un error en el servidor. Por favor, inténtelo más tarde.');
            } else {
                alert('Error en la solicitud de inicio de sesión.');
            }
        }
    } catch (error) {
        console.error('Error inesperado:', error);
    }
});
