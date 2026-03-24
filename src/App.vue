<script setup>
import { ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import CartSidebar from '@/components/CartSidebar.vue'
import ProductList from '@/components/ProductList.vue'
import ProductDetail from '@/components/ProductDetail.vue'
import CheckoutModal from '@/components/CheckoutModal.vue'

const cartOpen = ref(false)
const selectedProduct = ref(null) 

const openCart = () => { cartOpen.value = true }
const closeCart = () => { cartOpen.value = false }

const openProduct = (product) => { selectedProduct.value = product }
const closeProduct = () => { selectedProduct.value = null }

const checkoutOpen = ref(false)
const openCheckout = () => { checkoutOpen.value = true }
const closeCheckout = () => { checkoutOpen.value = false }
</script>

<template>
  <div class="app">
    <NavBar @open-cart="openCart" />

    <CartSidebar :isOpen="cartOpen" @close="closeCart" @checkout="openCheckout" />

    <ProductDetail
      :isOpen="!!selectedProduct"
      :product="selectedProduct"
      @close="closeProduct"
    />

    <main class="main-content">
     
      <ProductList @open-product="openProduct" />
    </main>
    <CheckoutModal :isOpen="checkoutOpen" @close="closeCheckout" />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #0f0f0f;
  color: #f0f0f0;
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
}

.app {
  min-height: 100vh;
}

.main-content {
  padding-top: 80px;
}
</style>