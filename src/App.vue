<template>
  <main>
    <header>
      <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <h1 style="color: black;" class="navbar-brand" v-text="sitename"></h1>
        <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <button class="btn btn-dark" v-if="cart.length > 0" v-on:click='showCheckout'>
          {{cart.length}} <span class="fas fa-cart-plus"></span>Cart
        </button> <br>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <button class="btn btn-primary" v-on:click="type = 'title'">Subject</button>
            </li>
            <br>
            <li class="nav-item">
              <button class="btn btn-primary" v-on:click="type = 'price'">Price</button>
            </li>
            <br>
            <li class="nav-item">
              <button class="btn btn-primary" v-on:click="type = 'location'">Location</button>
            </li>
            <br>
            <li class="nav-item dropdown">
              <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" v-model="sort" id="sortby">
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <div class="search-wrapper">
              <input v-on:input="filteredLessons" class="form-control mr-sm-2" type="text" v-model="search" placeholder="Search Subject or Location.." />
            </div>
          </form>
        </div>
      </nav>
    </header>

    <div class="root">
      <main>
        <div v-if='!showProduct' class="row">
          <Lesson :sortedLessons="sortedLessons" @canAddToCart="canAddToCart" />
        </div>
        <div v-else class="row">
          <Checkout :cart="cart" @removeFromCart="removeFromCart" @submit="submit" @showCheckout="showCheckout" />
        </div>
      </main>
    </div>
  </main>
</template>

<script>
import Lesson from './components/Lesson.vue'
import Checkout from './components/Checkout.vue'

export default {
  data() {
    return {
      search: '',
      sitename: 'LessonHub',
      sessions: [],
      cart: [],
      showProduct: false,
      order: {
        firstName: '',
        lastName: '',
      },
      sort: 'ascending',
      type: '',
      user: {
        name: '',
        phone: ''
      }
    }
  },
  async created() {
    let course = await fetch("mongodb+srv://grahkevinseguy:Tree0nice@cluster0.8q26p8n.mongodb.net/cw2/courses")
    let result = await course.json()
    this.sessions = result
    console.log(result)
  },
  methods: {
    filteredLessons() {
      fetch(`mongodb+srv://grahkevinseguy:Tree0nice@cluster0.8q26p8n.mongodb.net/cw2/courses/search?key_word=${this.search}`)
        .then(response => response.json())
        .then(data => {
          this.sessions = data
        })
    },
    canAddToCart(lesson) {
      this.sessions.find(item => item.id == lesson.id).availablespace -= 1;
      this.cart.push({ cartId: (this.cart.length + 1), ...lesson });
    },
    removeFromCart(lesson) {
      if (confirm('Remove from cart?')) {
        this.cart = [...this.cart].filter(item => item.cartId != lesson.cartId)
      }
    },
    showCheckout() {
      this.showProduct = !this.showProduct;
    },
    submit(name, phone) {
      console.log("Order Submitted")
      let orders = {
        checkoutName: name,
        checkoutPhone: phone,
        cartProduct: this.cart,
      }
      let order_details = JSON.stringify(orders)
      fetch('mongodb+srv://grahkevinseguy:Tree0nice@cluster0.8q26p8n.mongodb.net/cw2/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        mode: "cors",
        cache: "no-store",
        body: order_details,
      })
        .then(response => response.json())
        .then(json_response => {
          console.log(json_response)
          this.submitForm()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    phonenumber(phone) {
      // You need to define the 'phoneno' variable or import it from another module
      if ((phone.match(phone))) {
        return true;
      }
    },
    submitForm() {
      alert("Submitted")
    },
  },
  computed: {
    total() {
      return this.cart.length > 0 ? this.cart.map(item => item.price).reduce((acc, cur) => acc + cur) : 0;
    },

    // Everything here is for sorting lessons
    sortedLessons() {
      switch (this.type) {
        case 'title':
          return [...this.sessions].sort((a, b) => {
            switch (this.sort) {
              case 'ascending':
                return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
              default:
                return a.title.toUpperCase() < b.title.toUpperCase() ? 1 : -1;
            }
          })
        case 'location':
          return [...this.sessions].sort((a, b) => {
            switch (this.sort) {
              case 'ascending':
                return a.location.toUpperCase() > b.location.toUpperCase() ? 1 : -1;
              default:
                return a.location.toUpperCase() < b.location.toUpperCase() ? 1 : -1;
            }
          })
        case 'price':
          return [...this.sessions].sort((a, b) => {
            return this.sort == 'ascending' ? a.price - b.price : b.price - a.price;
          })
        case 'availablespace':
          return [...this.sessions].sort((a, b) => {
            return this.sort == 'ascending' ? a.availablespace - b.availablespace : b.availablespace - a.availablespace;
          })
        default:
          return [...this.sessions].sort((a, b) => {
            return this.sort == 'ascending' ? a.id - b.id : b.id - a.id;
          })
      }
    }
  },
  components: {
    Lesson,
    Checkout
  }
}
</script>
