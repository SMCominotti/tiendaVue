<script setup>
import { useCart } from '@/composables/useCart.js'

const props = defineProps({
  isOpen: { type: Boolean, required: true }
})

const emit = defineEmits(['close'])
const { cart, totalItems, totalPrice, clearCart } = useCart()

const confirmarCompra = () => {
  clearCart()
  emit('close')
  alert('¡Gracias por tu compra! Tu pedido está en camino. 🎉')
}
</script>

<template>
  <div v-if="isOpen" class="overlay" @click.self="emit('close')">
    <div class="modal">

      <button class="close-btn" @click="emit('close')">✕</button>

      <div class="modal-header">
        <h2>Resumen de tu pedido</h2>
        <p class="subtitle">Revisá tu compra antes de confirmar</p>
      </div>

      <ul class="order-items">
        <li v-for="item in cart" :key="item.id" class="order-item">
          <img :src="item.image" :alt="item.title" class="item-img" />
          <div class="item-info">
            <p class="item-title">{{ item.title.slice(0, 45) }}...</p>
            <p class="item-variant" v-if="item.variantColor">Color: {{ item.variantColor }}</p>
            <p class="item-qty">Cantidad: {{ item.quantity }}</p>
          </div>
          <p class="item-subtotal">€{{ (item.price * item.quantity).toFixed(2) }}</p>
        </li>
      </ul>

     
      <div class="order-summary">
        <div class="summary-row">
          <span>Productos ({{ totalItems }})</span>
          <span>€{{ totalPrice }}</span>
        </div>
        <div class="summary-row">
          <span>Envío</span>
          <span class="free">Gratis</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>€{{ totalPrice }}</span>
        </div>
      </div>

      
      <div class="modal-actions">
        <button class="confirm-btn" @click="confirmarCompra">
          ✓ Confirmar compra
        </button>
        <button class="cancel-btn" @click="emit('close')">
          Seguir comprando
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: popIn 0.3s ease;
}

@keyframes popIn {
  from { transform: scale(0.95); opacity: 0; }
  to   { transform: scale(1); opacity: 1; }
}

.close-btn {
  align-self: flex-end;
  background: none;
  border: none;
  color: #f0f0f0;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  transition: background 0.2s;
}

.close-btn:hover { background: #2a2a2a; }

.modal-header h2 {
  font-size: 1.4rem;
  font-weight: 800;
}

.subtitle {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.3rem;
}

.order-items {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-height: 300px;
  overflow-y: auto;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  background: #222;
  border-radius: 8px;
  border: 1px solid #2a2a2a;
}

.item-img {
  width: 55px;
  height: 55px;
  object-fit: contain;
  background: white;
  border-radius: 6px;
  padding: 4px;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.item-title {
  font-size: 0.85rem;
  color: #ddd;
}

.item-variant, .item-qty {
  font-size: 0.75rem;
  color: #666;
}

.item-subtotal {
  font-weight: 700;
  color: #f0f0f0;
  white-space: nowrap;
}

.order-summary {
  border-top: 1px solid #2a2a2a;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #aaa;
}

.summary-row.total {
  font-size: 1.2rem;
  font-weight: 800;
  color: #f0f0f0;
  border-top: 1px solid #2a2a2a;
  padding-top: 0.6rem;
  margin-top: 0.3rem;
}

.free { color: #2ecc71; }

.modal-actions {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.confirm-btn {
  background: #db0453;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.confirm-btn:hover { opacity: 0.85; }

.cancel-btn {
  background: none;
  border: 1px solid #3a3a3a;
  color: #aaa;
  padding: 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  border-color: #f0f0f0;
  color: #f0f0f0;
}
</style>