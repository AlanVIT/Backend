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
            return undefined
        }
        const data = JSON.stringify( await response.json())
        return data.cartId;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const addToCart = async () => {
    try {
        const cartId = await createCart();
            const productId = document.getElementById('productId').value;
            console.log(productId);
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
    } catch (error) {
        console.error(error);
    }
}

addListeners();
