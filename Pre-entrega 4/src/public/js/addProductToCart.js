const addListeners = () => {
    const addToCartButtons = document.querySelectorAll('.addToCart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

const createCart = async () => {
    try {
        const response = await fetch('/api/carts', {
            method: 'GET',
        });

        if (!response.ok) {
            return undefined;
        }

        const responseData = await response.json();
        if (Array.isArray(responseData.cart) && responseData.cart.length > 0) {
            const cartId = responseData.cart[0]._id;
            return cartId;
        } else {
            console.error("No se encontró ningún elemento con la propiedad '_id' en la respuesta.");
            return null;
        }

    } catch (error) {
        console.error(error);
        return null;
    }
}

const addToCart = async (event) => {
    const button = event.target;
    const productId = button.getAttribute('data-id');

    try {
        const cartId = await createCart();
        if (cartId !== null) {
            const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await response.json();
            if (result.status === 1) {
                alert(`Producto agregado al carrito ${cartId} exitosamente!`);
            } else {
                alert('Error al agregar el producto al carrito');
            }
        }
    } catch (error) {
        console.error(error);
    }
}

addListeners();
