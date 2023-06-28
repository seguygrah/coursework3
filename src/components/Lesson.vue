<template>
    <div class="lesson-list">
      <h2>Available Lessons</h2>
      <ul>
        <li v-for="lesson in lessons" :key="lesson.id">
          {{ lesson.name }} - ${{ lesson.price }}
          <button @click="addToCart(lesson)">Add to Cart</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LessonItem',
    props: {
      lessons: {
        type: Array,
        required: true
      }
    },
    methods: {
      addToCart(lesson) {
        this.$emit('addLesson', lesson);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your CSS styles here */
  </style>
  