<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['review-submitted'])

const review = reactive({
  name: '',
  content: '',
  rating: null,
  recommend: null
})

const onSubmit = () => {
  if (review.name === '' || review.content === '' || review.rating === null) {
    alert('Reseña incompleta. Por favor completá todos los campos.')
    return
  }
  emit('review-submitted', {
    name: review.name,
    content: review.content,
    rating: review.rating,
    recommend: review.recommend
  })
  review.name = ''
  review.content = ''
  review.rating = null
  review.recommend = null
}
</script>

<template>
  <form class="review-form" @submit.prevent="onSubmit">
    <h3>Dejar una reseña</h3>

    <label for="name">Nombre:</label>
    <input id="name" v-model="review.name" placeholder="Tu nombre" />

    <label for="review">Reseña:</label>
    <textarea id="review" v-model="review.content" placeholder="Contanos tu experiencia..."></textarea>

    <label for="rating">Puntuación:</label>
    <select id="rating" v-model.number="review.rating">
      <option disabled value="null">Elegí una puntuación</option>
      <option>5</option>
      <option>4</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
    </select>

    <label for="recommend">¿Lo recomendarías?</label>
    <select id="recommend" v-model="review.recommend">
      <option disabled value="null">Elegí una opción</option>
      <option>Sí</option>
      <option>No</option>
    </select>

    <button type="submit">Enviar reseña</button>
  </form>
</template>

<style scoped>
.review-form {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 1rem;
}

.review-form h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #f0f0f0;
}

label {
  font-size: 0.8rem;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 1px;
}

input, textarea, select {
  background: #222;
  border: 1px solid #3a3a3a;
  color: #f0f0f0;
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  width: 100%;
  transition: border-color 0.2s;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: #e8c547;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

button[type="submit"] {
  background: #e8c547;
  color: #0f0f0f;
  border: none;
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: opacity 0.2s;
}

button[type="submit"]:hover {
  opacity: 0.85;
}
</style>