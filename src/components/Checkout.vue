<template>
    <!-- Checkout and Cart sections displayed inline -->
    <section style="display: inline-flex; align-items: start;">
        <!-- Checkout section -->
        <div id="Checkout">
            <h2>Checkout Page</h2>
            <div>
                <!-- User input fields -->
                <div class="input_container">
                    <label for="name">Name: </label>
                    <input type="text" v-model.trim="user_D.name">
                </div>
                <div class="input_container">
                    <label for="phone" pattern="[A-Za-z]">Phone: </label>
                    <input type="text" v-model.trim="user_D.phone">
                </div>
                <!-- Checkout button -->
                <button v-if="uCheckout" @click="checkout()">Checkout</button>
            </div>
        </div>
        <!-- Cart section -->
        <div id="cart_container">
            <h2>Cart({{cartItemCount}})</h2>
            <div id="classlists">
                <!-- Iterate over cart items -->
                <div class="classlist" v-for="item in getCartItems" :key="item.id">
                    <img class="image" v-bind:src="item.item.image" alt="" width="100%">
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
  export default {
    name: 'CartComponent',
    props:{
        // Array of cart items
        cartItems: {
            type: Array,
        }
    },
    emits: ['remove-cart','order-submitted'],
    computed:{
        // Get the cart items
        getCartItems(){
            return this.cartItems
        },
        // Get the count of cart items
        cartItemCount(){
            return this.cartItems.length || "Empty";
        },
        
        // Check if there are items in the cart to enable removal
        uremovefromcart(){
            return this.cartItems.length > 0
        },
        // Check if the user input is valid for checkout
        uCheckout(){
            const user = this.user_D
            return user.name.match(/^[A-Za-z\s]+$/) && user.phone.match(/^[0-9]+$/)
        }
    },
    methods:{
        // Emit an event to remove an item from the cart
        remove_from_cart(data){
            this.$emit("remove-cart",JSON.stringify(data))
        },
        // Perform checkout and emit an event for order submission
        checkout(){
            alert("Order submitted")
            this.$emit("order-submitted")
        }
    },
    data(){
        return{
            // User data for checkout
            user_D:{
                name:"",
                phone:"",
            }
        }
    }
  }
  </script>
  