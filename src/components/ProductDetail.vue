<script setup>
import { ref, computed, watch } from 'vue'
import { useCart } from '@/composables/useCart.js'
import ReviewForm from '@/components/ReviewForm.vue'
import ReviewList from '@/components/ReviewList.vue'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  product: { type: Object, default: null }
})

const emit = defineEmits(['close'])
const { addToCart } = useCart()

const traducirCategoria = (cat) => {
  const traducciones = {
    "men's clothing": "Ropa Hombre",
    "women's clothing": "Ropa Mujer",
    "jewelery": "Joyería",
    "electronics": "Electrónica"
  }
  return traducciones[cat] || cat
}

const colorVariants = {
  "men's clothing":   [{ color: 'Negro', hex: '#1a1a1a' }, { color: 'Azul', hex: '#2c3e7a' }, { color: 'Gris', hex: '#666' }],
  "women's clothing": [{ color: 'Rosa', hex: '#e8a0b0' }, { color: 'Blanco', hex: '#f0f0f0' }, { color: 'Negro', hex: '#1a1a1a' }],
  "jewelery":         [{ color: 'Plata', hex: '#C0C0C0' }, { color: 'Oro', hex: '#e8c547' }, { color: 'Oro Rosa', hex: '#b76e79' }],
  "electronics":      [{ color: 'Negro', hex: '#1a1a1a' }, { color: 'Blanco', hex: '#f0f0f0' }, { color: 'Gris', hex: '#888' }],
}


const stockPorVariante = [15, 3, 0]

const stockSimulado = computed(() => {
  if (!props.product) return 0
  
  return props.product.id % 2 === 0
    ? stockPorVariante[selectedVariant.value]
    : [0, 8, 2][selectedVariant.value]
})

const inStock = computed(() => stockSimulado.value > 0)

const selectedVariant = ref(0)

const todasLasReseñas = ref({})

const reviews = computed(() => {
  if (!props.product) return []
  return todasLasReseñas.value[props.product.id] || []
})

watch(() => props.product, () => {
  selectedVariant.value = 0
})

const variants = computed(() => {
  if (!props.product) return []
  return colorVariants[props.product.category] || [{ color: 'Estándar', hex: '#666' }]
})

const addReview = (review) => {
  const id = props.product.id
  if (!todasLasReseñas.value[id]) {
    todasLasReseñas.value[id] = []
  }
  todasLasReseñas.value[id].push(review)
}

const handleAddToCart = () => {
  if (!inStock.value) return
  addToCart({
    ...props.product,
    id: `${props.product.id}-${variants.value[selectedVariant.value].color}`,
    variantColor: variants.value[selectedVariant.value].color
  })
}
</script>

<template>
  <div v-if="isOpen && product" class="overlay" @click.self="emit('close')">
    <div class="detail-panel">

      <button class="close-btn" @click="emit('close')">✕</button>

      <div class="product-image">
        <img :src="product.image" :alt="product.title" />
      </div>

      <div class="product-info">

        <div class="product-header">
       
          <span class="category-tag">{{ traducirCategoria(product.category) }}</span>
          <div class="rating">
            ★ {{ product.rating.rate }}
            <span class="rating-count">({{ product.rating.count }} reseñas)</span>
          </div>
        </div>

        <h2 class="product-title">{{ product.title }}</h2>
        <p class="product-description">{{ product.description }}</p>

        <p class="product-price">€{{ product.price.toFixed(2) }}</p>

        <p class="stock-status" :class="inStock ? 'in-stock' : 'out-of-stock'">
          {{ inStock ? `✓ En stock (${stockSimulado} disponibles)` : '✗ Sin stock' }}
        </p>

        <div class="variants">
          <p class="variants-label">Color:</p>
          <div class="variant-options">
            <button
              v-for="(variant, index) in variants"
              :key="variant.color"
              class="variant-btn"
              :class="{ selected: selectedVariant === index }"
              :title="variant.color"
              :style="{ backgroundColor: variant.hex }"
              @click="selectedVariant = index"
            ></button>
          </div>
          <span class="selected-color">{{ variants[selectedVariant]?.color }}</span>
        </div>

        <button
          class="add-to-cart-btn"
          :class="{ disabled: !inStock }"
          :disabled="!inStock"
          @click="handleAddToCart"
        >
          {{ inStock ? '+ Agregar al carrito' : 'Sin stock' }}
        </button>

      </div>

      <div class="reviews-section">
        <ReviewList v-if="reviews.length > 0" :reviews="reviews" />
        <ReviewForm @review-submitted="addReview" />
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

.detail-panel {
  width: 500px;
  height: 100vh;
  background: #1a1a1a;
  border-left: 1px solid #2a2a2a;
  overflow-y: auto;
  padding: 2rem;
  animation: slideIn 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
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

.product-image {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
}

.product-image img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-tag {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #db0453;
  font-weight: 600;
}

.rating {
  color: #e8c547;
  font-size: 0.9rem;
}

.rating-count {
  color: #666;
  font-size: 0.8rem;
}

.product-title {
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.4;
}

.product-description {
  color: #aaa;
  font-size: 0.9rem;
  line-height: 1.6;
}

.product-price {
  font-size: 2rem;
  font-weight: 800;
  color: white;
}

.stock-status {
  font-size: 0.9rem;
  font-weight: 600;
}

.in-stock { color: #2ecc71; }
.out-of-stock { color: #e74c3c; }

.variants {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.variants-label {
  font-size: 0.9rem;
  color: #aaa;
}

.variant-options {
  display: flex;
  gap: 0.5rem;
}

.variant-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.variant-btn.selected {
  border-color: white;
  transform: scale(1.2);
}

.selected-color {
  font-size: 0.85rem;
  color: #ccc;
}

.add-to-cart-btn {
  background: #db0453;
  color: #fff;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
  width: 100%;
}

.add-to-cart-btn:hover:not(.disabled) { opacity: 0.85; }

.add-to-cart-btn.disabled {
  background: #333;
  color: #666;
  cursor: not-allowed;
}

.reviews-section {
  border-top: 1px solid #2a2a2a;
  padding-top: 1.5rem;
}
</style>