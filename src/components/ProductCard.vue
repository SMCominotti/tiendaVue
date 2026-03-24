<script setup>
import { useCart } from '@/composables/useCart.js'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['open-product'])

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
</script>

<template>

  <div class="card" @click="emit('open-product', product)">

    <div class="card-image">
      <img :src="product.image" :alt="product.title" />
    </div>

    <div class="card-body">
      <span class="category">{{ traducirCategoria(product.category) }}</span>
      <h3 class="title">{{ product.title.slice(0, 50) }}...</h3>

      <div class="rating">
        <span class="stars">★ {{ product.rating.rate }}</span>
        <span class="reviews">({{ product.rating.count }})</span>
      </div>

      <div class="card-footer">
        <span class="price">€{{ product.price.toFixed(2) }}</span>
        
        <button class="add-btn" @click.stop="addToCart(product)">
          + Agregar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #1a1a1a;
  border: 1px solid #95069c;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, border-color 0.2s;
}

.card:hover {
  transform: translateY(-4px); 
  border-color: #db0453;
}

.card-image {
  background: white;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

.card-image img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.card-body {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1; 
}

.category {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #db0453;
  font-weight: 600;
}

.title {
  font-size: 0.9rem;
  color: #ddd;
  font-weight: 400;
  line-height: 1.4;
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.stars {
  color: #e8c547;
  font-size: 0.85rem;
}

.reviews {
  color: #666;
  font-size: 0.8rem;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto; 
}

.price {
  font-size: 1.3rem;
  font-weight: 700;
  color: #f0f0f0;
}

.add-btn {
  background: #db0453;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.85rem;
  transition: opacity 0.2s;
}

.add-btn:hover {
  opacity: 0.85;
}
</style>