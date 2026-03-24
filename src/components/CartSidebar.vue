<script setup>
import { useCart } from '@/composables/useCart.js'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})


const emit = defineEmits(['close', 'checkout'])

const { cart, addToCart, removeOneFromCart, removeFromCart, clearCart, totalItems, totalPrice } = useCart()
</script>

<template>
 
  <div v-if="isOpen" class="overlay" @click.self="emit('close')">

    <div class="sidebar">

      <div class="sidebar-header">
        <h2>Tu carrito <span class="item-count">({{ totalItems }})</span></h2>
        <button class="close-btn" @click="emit('close')">✕</button>
      </div>

      <div v-if="cart.length === 0" class="empty-cart">
        <span class="empty-icon">🛒</span>
        <p>Tu carrito está vacío</p>
      </div>

      <div v-else class="cart-content">

        <ul class="cart-items">
          <li 
            v-for="item in cart" 
            :key="item.id" 
            class="cart-item"
          >
            <img :src="item.image" :alt="item.title" class="item-image" />

            <div class="item-info">
              <p class="item-title">{{ item.title.slice(0, 40) }}...</p>
              <p class="item-price">€{{ item.price }}</p>

              <div class="item-controls">
                <button @click="removeOneFromCart(item.id)">−</button>
                <span>{{ item.quantity }}</span>
                <button @click="addToCart(item)">+</button>
              
                <button class="delete-btn" @click="removeFromCart(item.id)">🗑</button>
              </div>
            </div>
          </li>
        </ul>

        <div class="cart-footer">
          <div class="total">
            <span>Total</span>
            <span class="total-price">€{{ totalPrice }}</span>
          </div>

          <button class="checkout-btn" @click="emit('checkout')">Finalizar compra</button>
          
          <button class="clear-btn" @click="clearCart">
            Vaciar carrito
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0; 
  background: rgba(0, 0, 0, 0.7);
  z-index: 200;
  display: flex;
  justify-content: flex-end; 
}

.sidebar {
  width: 420px;
  height: 100vh;
  background: #1a1a1a;
  border-left: 1px solid #2a2a2a;
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease; 
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #2a2a2a;
}

.sidebar-header h2 {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.item-count {
  color: #db0453;
}

.close-btn {
  background: none;
  border: none;
  color: #f0f0f0;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.close-btn:hover {
  background: #2a2a2a;
}

.empty-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #666;
}

.empty-icon {
  font-size: 3rem;
}

.cart-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.cart-items {
  flex: 1;
  overflow-y: auto; 
  padding: 1rem;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #222;
  border-radius: 10px;
  border: 1px solid #2a2a2a;
}

.item-image {
  width: 70px;
  height: 70px;
  object-fit: contain;
  background: white;
  border-radius: 6px;
  padding: 4px;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.item-title {
  font-size: 0.85rem;
  color: #ccc;
}

.item-price {
  color: white;
  font-weight: 700;
}

.item-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.3rem;
}

.item-controls button {
  background: #2a2a2a;
  border: 1px solid #3a3a3a;
  color: #f0f0f0;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.item-controls button:hover {
  background: #3a3a3a;
}

.delete-btn {
  margin-left: auto;
  border-color: white !important;
  color: white !important;
}

.cart-footer {
  padding: 1.5rem;
  border-top: 1px solid #2a2a2a;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.total {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
}

.total-price {
  color: white;
  font-weight: 700;
  font-size: 1.3rem;
}

.checkout-btn {
  background: #db0453;
  color: white;
  border: none;
  padding: 0.9rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.checkout-btn:hover {
  opacity: 0.85;
}

.clear-btn {
  background: none;
  border: 1px solid #c0392b;
  color: white;
  padding: 0.7rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-btn:hover {
  background: #c0392b;
  color: white;
}
</style>