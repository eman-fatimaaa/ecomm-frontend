<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const title = ref('')
const description = ref('')
const price = ref('')
const image = ref('')
const category = ref('')
const isLoading = ref(false)
const router = useRouter()

async function handleCreate() {
  const token = localStorage.getItem('authToken')
  if (!token) {
    alert('You must be logged in')
    router.push('/')
    return
  }

  isLoading.value = true
  
  try {
    const res = await fetch('https://ecommerce-rest-api-miv1.onrender.com/api/products/createProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        name: title.value, 
        description: description.value, 
        price: parseFloat(price.value),
        imageUrl: image.value,
        category: category.value
      })
    })

    if (res.ok) {
      alert('Product created successfully!')
      router.push('/home')
    } else {
      const error = await res.json()
      throw new Error(error.message || 'Failed to create product')
    }
  } catch (error) {
    alert(error.message)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="create-product-page">
    <div class="form-container">
      <h1 class="page-title">Create New Product</h1>
      
      <form @submit.prevent="handleCreate" class="product-form">
        <div class="form-group">
          <label for="title">Product Title</label>
          <input
            id="title"
            v-model="title"
            type="text"
            placeholder="Enter product title"
            required
            class="form-input"
          >
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="description"
            placeholder="Enter detailed description"
            required
            class="form-input"
            rows="4"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="price">Price ($)</label>
            <input
              id="price"
              v-model="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              required
              class="form-input"
            >
          </div>

          <div class="form-group">
            <label for="category">Category</label>
            <select
              id="category"
              v-model="category"
              class="form-input"
            >
              <option value="" disabled selected>Select category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home & Garden</option>
              <option value="books">Books</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="image">Image Url</label>
          <input
            id="image"
            v-model="image"
            required
            type="url"
            placeholder="206"
            class="form-input"
          >
        </div>

        <button type="submit" class="submit-button" :disabled="isLoading">
          <span v-if="!isLoading">Create Product</span>
          <span v-else class="loading-spinner"></span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.create-product-page {
  display: flex;
  justify-content: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: #f8fafc;
}

.form-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 2.5rem;
  width: 100%;
  max-width: 800px;
}

.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 2rem;
  text-align: center;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #334155;
  font-size: 0.95rem;
}

.form-input {
  padding: 0.8rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  background-color: #f8fafc;
}

.form-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

textarea.form-input {
  resize: vertical;
  min-height: 100px;
}

select.form-input {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;
}

.input-hint {
  color: #64748b;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.submit-button {
  background-color: #6366f1;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
}

.submit-button:hover:not(:disabled) {
  background-color: #4f46e5;
}

.submit-button:disabled {
  background-color: #c7d2fe;
  cursor: not-allowed;
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .form-container {
    padding: 1.5rem;
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
}
</style>