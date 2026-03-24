<script setup>
defineProps({
  reviews: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="review-list">
    <h3>Reseñas ({{ reviews.length }})</h3>
    <ul>
      <li v-for="(review, index) in reviews" :key="index" class="review-item">
        <div class="review-header">
          <span class="review-name">{{ review.name }}</span>
          <span class="review-stars">
            <span v-for="n in 5" :key="n" :class="n <= review.rating ? 'star filled' : 'star'">★</span>
          </span>
        </div>
        <p class="review-content">"{{ review.content }}"</p>
        <span class="review-recommend">
          {{ review.recommend === 'Sí' ? '👍 Lo recomienda' : '👎 No lo recomienda' }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.review-list {
  margin-bottom: 1.5rem;
}

.review-list h3 {
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #f0f0f0;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.review-item {
  background: #222;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-name {
  font-weight: 700;
  font-size: 0.9rem;
}

.star { color: #444; }
.star.filled { color: #e8c547; }

.review-content {
  color: #bbb;
  font-size: 0.85rem;
  line-height: 1.5;
}

.review-recommend {
  font-size: 0.8rem;
  color: #888;
}
</style>