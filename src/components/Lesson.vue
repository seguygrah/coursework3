<template>
  <div>
    <div
      v-for="(lessons, index) in sortedLessons"
      :key="`lesson--${index}`"
      class="lessons__item col-md-3 py-2"
    >
      <img
        class="card-img-top"
        :src="lessons.img"
        width="200"
        height="250"
      />
      <div class="card-body">
        <h2 class="card-title">
          <p>Subject: {{ lessons.subject }}</p>
        </h2>
        <p class="card-text">Location: {{ lessons.location }}</p>
        <p class="card-text">Price: {{ lessons.price }}</p>
        <div>
          <p class="card-text">Spaces: {{ lessons.availablespace }}</p>
          <button
            class="btn btn-dark"
            @click="canAddToCart(lessons)"
            :disabled="!lessons.availablespace"
          >
            Add to cart
          </button>
          <span v-if="lessons.availablespace">{{ 'Left ' + lessons.availablespace }}</span>
          <span v-else>No lessons left</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LessonItem',
  props: ['sortedLessons'],
  methods: {
    canAddToCart(lessons) {
      this.$emit('canAddToCart', lessons);
    },
  },
};
</script>
