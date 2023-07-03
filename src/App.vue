<template>
  <div>
    <!-- External CSS stylesheet -->
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <header>
      <h1>{{ sitename }}</h1>
      <div v-if="showClasslists">
        <button v-if="uremoveFromCart" @click="cycle">
          {{ cartItemCount }}
          <i class="bx bx-cart"></i>
          Checkout
        </button>
        <button v-else disabled="disabled">
          {{ cartItemCount }}
          <i class="bx bx-cart"></i>
        </button>
      </div>
      <div v-else>
        <button @click="cycle">
          <i class="bx bx-left-arrow-alt"></i>
          Go back
        </button>
      </div>
    </header>
    <main>
      <!-- Dynamic component based on currentView -->
      <component :is="currentView" :cart-items="cart" :classlist-items="classlists" @add-cart="handleAddToCart" @remove-cart="handleRemoveFromCart" @order-submitted="handleOrderSubmitted" />
    </main>
  </div>
</template>

<script>
import CartComponent from './components/Checkout.vue'
import LessonComponent from './components/Lesson.vue'

export default {
  name: 'App',
  created() {
    // Load classlists when the component is created
    this.loadClasslists()
  },
  computed: {
    // Calculate the number of items in the cart
    cartItemCount() {
      return this.cart.length || 'Empty'
    },
    // Check if there are items to remove from the cart
    uremoveFromCart() {
      return this.cart.length > 0
    },
  },
  data() {
    return {
      sitename: 'After School Activities Store',
      currentView: LessonComponent,
      showClasslists: true,
      cart: [],
      classlists: [],
    }
  },
  methods: {
    // Load classlists from the server
    loadClasslists() {
      const port = 3000
      fetch(`http://localhost:${port}/collection/courses`).then((res) => {
        res.json().then((json) => {
          // Update classlists with the fetched data
          this.classlists = json.map((x) => {
            x["image"] = `${x["image"]}`
            return x
          })
        })
      })
    },
    // Handle adding an item to the cart
    handleAddToCart(data) {
      data = JSON.parse(data)
      const item = data.item
      for (let i = 0; i < this.classlists.length; i++) {
        const classlist = this.classlists[i]
        if (data["item"]._id === classlist._id) {
          // Decrease available space for the classlist item
          item.availablespace--
          break
        }
      }
      // Add the item to the cart
      this.cart.push(data)
    },
    // Handle removing an item from the cart
    handleRemoveFromCart(data) {
      data = JSON.parse(data)
      const itemId = data.id
      const filteredCart = this.cart.filter((item) => item.id !== itemId)
      this.cart = filteredCart
      const item = data.item
      for (let i = 0; i < this.classlists.length; i++) {
        const classlist = this.classlists[i]
        if (data["item"]._id === classlist._id) {
          // Increase available space for the classlist item
          item.availablespace++
          break
        }
      }
    },
    // Handle order submission
    handleOrderSubmitted() {
      // Clear the cart and go back to the previous view
      this.cart = []
      this.cycle()
    },
    // Cycle between LessonComponent and CartComponent
    cycle() {
      if (this.currentView.name === LessonComponent.name) {
        this.currentView = CartComponent
        this.showClasslists = false
      } else {
        this.currentView = LessonComponent
        this.showClasslists = true
      }
    },
  },
}
</script>

<style>
/* ... Rest of the styles ... */
</style>
