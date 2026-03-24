<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductCard from '@/components/ProductCard.vue'

const emit = defineEmits(['open-product'])

const products = ref([])
const selectedCategory = ref('all')
const loading = ref(true)
const error = ref(null)

const traducirCategoria = (cat) => {
  const traducciones = {
    "men's clothing": "Ropa Hombre",
    "women's clothing": "Ropa Mujer",
    "jewelery": "Joyería",
    "electronics": "Electrónica"
  }
  return traducciones[cat] || cat
}

const categories = computed(() => {
  const cats = products.value.map(p => p.category)
  return ['all', ...new Set(cats)]
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') return products.value
  return products.value.filter(p => p.category === selectedCategory.value)
})

const cargarProductos = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()
    products.value = data
  } catch (err) {
    error.value = 'No se pudieron cargar los productos. Intentá de nuevo.'
  } finally {
    loading.value = false
  }
}

onMounted(cargarProductos)
</script>

<template>
  <div class="product-list">
    <div class="list-header">
      <h1 class="store-title">Nuestros <span>Productos</span></h1>
      <div class="filters">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-btn"
          :class="{ active: selectedCategory === cat }"
          @click="selectedCategory = cat"
        >
          {{ cat === 'all' ? 'Todos' : traducirCategoria(cat) }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="status-msg">
      <div class="spinner"></div>
      <p>Cargando productos...</p>
    </div>

    <div v-else-if="error" class="status-msg error">
      <p>{{ error }}</p>
      <button @click="cargarProductos">Reintentar</button>
    </div>

    <div v-else class="grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @open-product="emit('open-product', $event)"
      />
    </div>
  </div>
</template>


<style scoped>
.product-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.list-header {
  margin-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.store-title {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -1px;
}

.store-title span {
  color: #db0453;
}

.filters {
  display: flex;
  gap: 0.7rem;
  flex-wrap: wrap; 
}

.filter-btn {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  color: #aaa;
  padding: 0.5rem 1.2rem;
  border-radius: 20px; 
  cursor: pointer;
  font-size: 0.8rem;
  text-transform: capitalize;
  transition: all 0.2s;
}

.filter-btn:hover {
  border-color: #790c53;
  color: #f0f0f0;
}

.filter-btn.active {
  background: #94027e;
  border-color: #f12771;
  color: white;
  font-weight: 700;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

.status-msg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  gap: 1rem;
  color: #666;
}

.status-msg.error {
  color: #c0392b;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #2a2a2a;
  border-top-color: #db0453;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>


