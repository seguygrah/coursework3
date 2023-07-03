<template>
  <div>
    <h1>Lesson Page</h1>
    <section style="display: flex; flex-direction: row; width: 100%;">
      <!-- Filter & Order section -->
      <section style="width: 30%;">
        <h3>Filter & Order</h3>
        
        <!-- Div element to encapsulate sorting and ordering -->
        <div id="filters" style="display:flex; flex-direction: column; align-self: flex-start; width: 100%;">
          <h3 style="margin: 0.5rem 0;">Filter</h3>
          
          <!-- Div element for sorting options -->
          <div id="sort">
            <div v-for="(value, key) in sort_dict" :key="value.id">
              <input type="radio" name="sort" value="key" v-if="value.checked" checked v-on:click="sort(key)">
              <input type="radio" name="sort" value="key" v-else v-on:click="sort(key)">
              <label for="sort">{{key}}</label>
            </div>
          </div>
          <h3 style="margin: 0.5rem 0;">Order</h3>
          
          <!-- Div element for ordering options -->
          <div id="order">
            <div v-for="(value, key) in order_dict" :key="value.id">
              <input type="radio" name="order" value="key" v-if="value.checked" checked v-on:click="order(key)">
              <input type="radio" name="order" value="key" v-else v-on:click="order(key)">
              <label for="order">{{key}}</label>
            </div>
          </div>
        </div>
      </section>

      <!-- Lesson list section -->
      <section style="width: 100%;">
        <div style="width: 100%; display: inline-flex; align-items: center; justify-content: flex-start;">
          <div id="search">
            <input type="text" v-bind:placeholder="searchTerm" v-if="search" v-model="searchInput">
            <button v-on:click="search"><i class='bx bx-search'></i></button>
          </div>
        </div>

        <div id="classlists">
          <!-- Iterate over classlist items -->
          <div class="classlist" v-for="item in classlist_copy" :key="item.id">
            <img class="image" :src="item.image" alt="" width="100%">
            <div class="info_container">
              <p>title: {{item.title}}</p>
              <p>Location: {{item.location}}</p>
              <p>Price: ${{item.price}}</p>
              <p>Spaces: {{item.availablespace}}</p>
              <button v-if="item.availablespace > 0" @click="add_to_cart(item)">Add To Cart</button>
              <button v-else disabled>Add To Cart</button>
            </div>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LessonComponent',
  props: {
    classlistItems: {
      type: Array,
    },
  },
  emits: ['add-cart'],
  created() {
    this.loadClasslists();
  },
  methods: {
    // Toggle display of classlists section
    showCheckout() {
      this.showClasslists = this.showClasslists ? false : true;
    },
    // Add an item to the cart
    add_to_cart(item) {
      const id = `${item.title[0]}` + item.id + `${item.location[0]}` + Math.ceil(Math.random() * 1000000);
      let data = {
        "id": id,
        "item": item,
      };
      this.$emit('add-cart', JSON.stringify(data));
    },
    // Perform search functionality
    search_func(query) {
      let val = this.sort_value.toLowerCase();

      if (val != 'all' & query.trim() != '') {
        if (val != 'price') {
          this.classlist_copy = this.classlistItems.filter((x) => x[val].toLowerCase().includes(query.toLowerCase()));
        } else {
          if (query.match(/^[0-9]+$/) != null) {
            this.classlist_copy = this.classlistItems.filter((x) => ('' + x[val]).includes(query));
          }
        }
        this.order_sort(this.sort_value);
      }

      if (query.trim() == '') {
        this.loadClasslists();
        this.order_sort(this.sort_value);
      }
    },
    // Handle ordering selection
    order(value) {
      this.order_value = value;
      this.order_sort(this.sort_value);
    },
    // Handle sorting selection
    sort(value) {
      this.sort_value = value;
      this.order_sort(value);
    },
    // Order and sort the classlist items
    order_sort(criteria) {
      criteria = criteria.toLowerCase();
      if (criteria != 'all') {
        this.searchTerm = criteria;
        const isAscending = this.order_value == 'Ascending';
        this.classlist_copy.sort((a, b) => {
          if (a[criteria] > b[criteria]) return isAscending ? 1 : -1;
          if (b[criteria] > a[criteria]) return isAscending ? -1 : 1;
          return 0;
        });
      } else {
        this.searchTerm = 'Please choose criteria eg. title, location, price.';
        this.loadClasslists();
      }
    },
    // Load the classlist items
    loadClasslists() {
      this.classlist_copy = [];

      this.classlistItems.forEach((x) => {
        this.classlist_copy.push(x);
      });
    },
  },
  data() {
    return {
      sitename: 'After School Activities Store',
      cart: [],
      order_value: 'Ascending',
      order_dict: {
        Ascending: { id: 1, checked: true },
        Descending: { id: 2, checked: false },
      },
      sort_value: 'All',
      sort_dict: {
        All: { id: 1, checked: true },
        title: { id: 2, checked: false },
        Location: { id: 3, checked: false },
        Price: { id: 4, checked: false },
      },
      searchInput: '',
      searchTerm: 'Please choose criteria eg. title, location, price.',
      classlist_copy: [],
      user_D: {
        name: '',
        phone: '',
      },
    };
  },
  computed: {
    // Calculate the count of items in the cart
    cartItemCount() {
      return this.cart.length || 'Empty';
    },
    // Check if there are items in the cart to enable removal
    uremovefromcart() {
      return this.cart.length > 0;
    },
    // Perform search when the search input changes
    search() {
      this.search_func(this.searchInput);
      return true;
    },
  },
};
</script>

<style scoped>
/* ... Rest of the style ... */
</style>
