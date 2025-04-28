<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="product-card">
    <div class="product-image-container">
      <img 
        :src="product.image || 'https://via.placeholder.com/300x200?text=No+Image'" 
        :alt="product.title"
        class="product-image"
      >
      <div v-if="product.discount" class="discount-badge">
        -{{ product.discount }}%
      </div>
    </div>
    
    <div class="product-details">
      <div class="product-header">
        <h3 class="product-title">{{ product.title }}</h3>
        <p class="product-category" v-if="product.category">{{ product.category }}</p>
      </div>
      
      <p class="product-description">{{ product.description }}</p>
      
      <div class="product-footer">
        <div class="price-container">
          <span class="current-price">${{ product.price.toFixed(2) }}</span>
          <span v-if="product.originalPrice" class="original-price">
            ${{ product.originalPrice.toFixed(2) }}
          </span>
        </div>
        
        <div class="rating-container" v-if="product.rating">
          <span class="stars">★★★★★</span>
          <span class="rating-value">{{ product.rating.toFixed(1) }}</span>
        </div>
      </div>
      
      <button class="add-to-cart-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        Add to Cart
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}

.product-image-container {
  position: relative;
  padding-top: 70%; /* 4:3 aspect ratio */
  overflow: hidden;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ef4444;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
}

.product-details {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-header {
  margin-bottom: 0.75rem;
}

.product-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-category {
  color: #6b7280;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.product-description {
  color: #4b5563;
  font-size: 0.875rem;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.price-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.current-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
}

.original-price {
  font-size: 0.875rem;
  color: #9ca3af;
  text-decoration: line-through;
}

.rating-container {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.stars {
  color: #fbbf24;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
}

.rating-value {
  font-size: 0.75rem;
  color: #6b7280;
}

.add-to-cart-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-to-cart-button:hover {
  background-color: #4338ca;
}

.add-to-cart-button svg {
  width: 16px;
  height: 16px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .product-title {
    font-size: 1rem;
  }
  
  .current-price {
    font-size: 1.1rem;
  }
  
  .add-to-cart-button {
    padding: 0.6rem;
    font-size: 0.875rem;
  }
}
</style>