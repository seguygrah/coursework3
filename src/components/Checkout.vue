<template>
  <section style="display: inline-flex; align-items: start;">
      <div id="Checkout">
          <h2>Checkout Page</h2>
          <div>
              <div class="input_container">
                  <label for="name">Name: </label>
                  <input type="text" v-model.trim="user_D.name">
              </div>
              <div class="input_container">
                  <label for="phone" pattern="[A-Za-z]">Phone: </label>
                  <input type="text" v-model.trim="user_D.phone">
              </div>
              <button v-if="u_Checkout" @click="checkout()">Checkout</button>
          </div>
      </div>
      <div id="cart_container">
          <h2>Cart({{cartItemCount}})</h2>
          <div id="classlists">
              <div class="classlist" v-for="item in getCartItems" :key="item.id">
                  <img class="image" v-bind:src="item.item.image">
                  <div class="info_container">
                      <p>Title: {{item.item.title}}</p>
                      <p>Location: {{item.item.location}}</p>
                      <p>Price: {{item.item.price}}</p>
                      <button  v-on:click="remove_from_cart(item)">Remove From Cart</button>
                  </div>
              </div>
          </div>
      </div>

  </section>
</template>

<script>
//   import AppVue from '../App.vue'
// import App from '@/App.vue';

export default {
  name: 'CartComp',
  props:{
      Cart_I: {
          type: Array,
      }
  },
  emits: ['remove-cart','order-submitted'],
  computed:{
      getCartItems(){
          return this.Cart_I
      },
      cartItemCount(){
          return this.Cart_I.length || "Empty";
      },
      
      removeFromCart(){
          return this.Cart_I.length > 0
      },
      u_Checkout(){
          const user = this.user_D
          return user.name.match(/^[A-Za-z\s]+$/) && user.phone.match(/^[0-9]+$/)
      }
  },
  methods:{
      remove_from_cart(data){
          this.$emit("remove-cart",JSON.stringify(data))
      },
      checkout(){
          alert("Order submited")
          this.$emit("order-submitted")
      }
  },
  data(){
      return{
          user_D:{
              name:"",
              phone:"",
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
