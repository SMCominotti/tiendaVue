import { ref, computed, watch } from 'vue'

// Si estuviera adentro de la función, cada componente tendría su propio carrito separado.
const cart = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

export function useCart() {
  watch(cart, (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart))
  }, { deep: true })

  const addToCart = (product) => {
    const existing = cart.value.find(item => item.id === product.id)
    
    if (existing) {
                    existing.quantity++
    } else {
            cart.value.push({ ...product, quantity: 1 })
    }
  }

  const removeOneFromCart = (productId) => {
    const index = cart.value.findIndex(item => item.id === productId)
    if (index !== -1) {
      if (cart.value[index].quantity > 1) {
        // Si hay más de 1, resta uno
        cart.value[index].quantity--
      } else {
        // Si hay exactamente 1, elimina el producto del carrito
        cart.value.splice(index, 1)
      }
    }
  }

  const removeFromCart = (productId) => {
    // Elimina el producto completamente sin importar la cantidad
    cart.value = cart.value.filter(item => item.id !== productId)
  }

  const clearCart = () => {
      cart.value = []
  }

  const totalItems = computed(() =>
     cart.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  )

  return { cart, addToCart, removeOneFromCart, removeFromCart, clearCart, totalItems, totalPrice }
}