<template>
    <div class="checkout">
      <h2>Shopping Cart</h2>
      <ul>
        <li v-for="lesson in cart" :key="lesson.id">
          {{ lesson.name }} - ${{ lesson.price }}
          <button @click="removeFromCart(lesson)">Remove</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CheckoutItem',
    props: {
      cart: {
        type: Array,
        required: true
      }
    },
    methods: {
      removeFromCart(lesson) {
        this.$emit('removeLesson', lesson);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
  </style>
  