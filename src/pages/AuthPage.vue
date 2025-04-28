<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const isLoginMode = ref(true)
const router = useRouter()

// Form fields as an array of objects
const formFields = ref([
  { id: 'email', label: 'Email', type: 'email', value: '', required: true, visible: true },
  { id: 'password', label: 'Password', type: 'password', value: '', required: true, visible: true },
  { id: 'firstName', label: 'First Name', type: 'text', value: '', required: true, visible: false },
  { id: 'lastName', label: 'Last Name', type: 'text', value: '', required: true, visible: false },
  { id: 'role', label: 'Role', type: 'select', value: 'user', options: ['user', 'admin'], required: true, visible: false }
])

// Computed property to get visible fields
const visibleFields = computed(() => {
  return formFields.value.map(field => ({
    ...field,
    // Only show required asterisk when field is visible and required
    required: field.visible && field.required
  }))
})

// Function to update field value
const updateFieldValue = (id, value) => {
  const fieldIndex = formFields.value.findIndex(f => f.id === id)
  if (fieldIndex !== -1) {
    formFields.value[fieldIndex].value = value
  }
}

// Toggle between login/signup
const toggleAuthMode = () => {
  isLoginMode.value = !isLoginMode.value
  // Update field visibility without changing values
  formFields.value.forEach(field => {
    field.visible = isLoginMode.value 
      ? field.id === 'email' || field.id === 'password'
      : true
  })
}

async function handleSubmit() {
  // Manual validation
  const errors = []
  
  visibleFields.value.forEach(field => {
    if (field.required && !field.value.trim()) {
      errors.push(`${field.label} is required`)
    }
  })

  if (errors.length) {
    alert(errors.join('\n'))
    return
  }

  // Prepare the API endpoint and payload
  const endpoint = isLoginMode.value 
    ? 'https://ecommerce-rest-api-miv1.onrender.com/login'  // Login endpoint
    : 'https://ecommerce-rest-api-miv1.onrender.com/signup' // Signup endpoint

  const payload = {
    email: formFields.value.find(f => f.id === 'email').value,
    password: formFields.value.find(f => f.id === 'password').value
  }

  if (!isLoginMode.value) {
    payload.firstName = formFields.value.find(f => f.id === 'firstName').value
    payload.lastName = formFields.value.find(f => f.id === 'lastName').value
    payload.role = formFields.value.find(f => f.id === 'role').value
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Authentication failed')
    }

    // Handle successful authentication
    if (isLoginMode.value) {
      // Save token and redirect for login
      localStorage.setItem('authToken', data.token)
      router.push('/dashboard') // Redirect to dashboard or home
    } else {
      // Handle successful registration
      alert('Registration successful! Please login.')
      isLoginMode.value = true // Switch to login form
      // Clear form fields if needed
    }
  } catch (error) {
    alert(error.message)
    console.error('Authentication error:', error)
  }
}
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2 class="auth-title">{{ isLoginMode ? 'Login' : 'Create Account' }}</h2>
      
      <form @submit.prevent="handleSubmit" class="auth-form" novalidate>
        <div 
          v-for="field in formFields" 
          :key="field.id"
          v-show="field.visible"
          class="form-group"
        >
          <label :for="field.id">
            {{ field.label }}
            <span v-if="field.required && field.visible" class="required-asterisk">*</span>
          </label>
          
          <input
            v-if="field.type !== 'select'"
            :id="field.id"
            :type="field.type"
            :placeholder="`Enter your ${field.label.toLowerCase()}`"
            v-model="field.value"
            class="form-input"
          />
          
          <select
            v-else
            :id="field.id"
            v-model="field.value"
            class="form-input"
          >
            <option 
              v-for="option in field.options" 
              :key="option" 
              :value="option"
              :disabled="option === ''"
            >
              {{ option || 'Select an option' }}
            </option>
          </select>
        </div>

        <button type="submit" class="submit-btn">
          {{ isLoginMode ? 'Login' : 'Sign Up' }}
        </button>
      </form>

      <p class="toggle-mode">
        {{ isLoginMode ? 'New here?' : 'Already have an account?' }}
        <a @click="toggleAuthMode" class="toggle-link">
          {{ isLoginMode ? 'Create an account' : 'Login' }}
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
  padding: 20px;
}

.auth-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 450px;
}

.auth-title {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #555;
}

.required-asterisk {
  color: #ef4444;
  margin-left: 2px;
}

.form-input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #4f46e5;
}

.submit-btn {
  background-color: #4f46e5;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: #4338ca;
}

.toggle-mode {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.toggle-link {
  color: #4f46e5;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
}

.toggle-link:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 1.5rem;
  }
}
</style>