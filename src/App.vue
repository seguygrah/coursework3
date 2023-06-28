<template>
  <div id="app">
    <header>
      <h1>Lesson Store</h1>
      <button class="cart-btn" @click="toggleView">
        Cart ({{ cart.length }})
      </button>
    </header>

    <main>
      <Lesson v-if="view === 'lesson'" :lessons="lessons" @addLesson="addToCart" />
      <Checkout v-else :cart="cart" @removeLesson="removeFromCart" />
    </main>
  </div>
</template>

<script>
import Lesson from './components/Lesson.vue';
import Checkout from './components/Checkout.vue';

export default {
  name: 'App',
  components: {
    Lesson,
    Checkout
  },
  data() {
    return {
      view: 'lesson',
      lessons: [],
      cart: []
    };
  },
  mounted() {
    this.fetchLessons();
  },
  methods: {
    toggleView() {
      this.view = this.view === 'lesson' ? 'checkout' : 'lesson';
    },
    fetchLessons() {
      // Make a GET request to your REST API endpoint to retrieve lessons data
      // and assign it to the 'lessons' data property
      // Example:
      // axios.get('/api/lessons')
      //   .then(response => {
      //     this.lessons = response.data;
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });

      // For simplicity, let's assume the lessons data is already available
      // and assign a sample array of lessons:
      this.lessons = [
        { id: 1, name: 'Lesson 1', price: 10 },
        { id: 2, name: 'Lesson 2', price: 20 },
        { id: 3, name: 'Lesson 3', price: 15 },
        // ... more lessons
      ];
    },
    addToCart(lesson) {
      this.cart.push(lesson);
    },
    removeFromCart(lesson) {
      const index = this.cart.findIndex(item => item.id === lesson.id);
      if (index !== -1) {
        this.cart.splice(index, 1);
      }
    }
  }
};
</script>

<style>
/* Add your CSS styles here */
</style>
