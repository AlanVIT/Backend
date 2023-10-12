const addListeners = () => {
    const addToCartButtons = document.querySelectorAll('.addToCart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}


const addToCart = async (event) => {
    try {
        const cartId = []
        if (cartId) {
            const productId = event.target.dataset.id;
            const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const result = await response.json();
                if (result.status === 1) {
                    alert(`Producto agregado al carrito ${cartId} exitosamente!`);
                } else {
                    alert('Error al agregar el producto al carrito');
                }
            } else {
                throw new Error('Error en la solicitud para agregar el producto al carrito');
            }
        } else {
            alert('No se pudo crear un carrito nuevo');
        }
    } catch (error) {
        console.error(error);
    }
}

addListeners();
