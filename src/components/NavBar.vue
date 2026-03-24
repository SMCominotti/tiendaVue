<script setup>
import { useCart } from '@/composables/useCart.js'

const emit = defineEmits(['open-cart'])

// Importamos solo lo que necesita la navbar: saber cuántos items hay
const { totalItems } = useCart()
</script>

<template>
  <nav class="navbar">

    <div class="navbar-brand">
      <span class="brand-icon">◈</span>
      <span class="brand-name">VueStore</span>
    </div>

    <button class="cart-btn" @click="emit('open-cart')">
      <span class="cart-icon">🛒</span>
      <span class="cart-label">Carrito</span>

      <span v-if="totalItems > 0" class="cart-badge">
        {{ totalItems }}
      </span>
    </button>

  </nav>
</template>

<style scoped>
/* scoped significa que estos estilos SOLO afectan a este componente */

.navbar {
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #1a1a1a;
  border-bottom: 1px solid #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 100; 
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-icon {
  color: #db0453;
  font-size: 1.5rem;
}

.brand-name {
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #f0f0f0;
  text-transform: uppercase;
}

.cart-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #2a2a2a;
  border: 1px solid #780372;
  color: #f0f0f0;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: all 0.2s; 
}

.cart-btn:hover {
  background: #3a3a3a;
  border-color: #db0453;
}

.cart-badge {
  background: #db0453;
  color: white;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
}
</style>

