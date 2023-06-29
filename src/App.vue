<template>
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
<header>
  <h1>{{sitename}}</h1>
  <div style="align-self: flex-end; margin-right: 2rem;" v-if="showClasslists">
      <button style="font-size: 1.15rem;" v-if="removeFromcart" @click="cycle">
          {{cartItemCount}}
          <i class="bx bx-cart"></i>
          Checkout
      </button>
      <button v-else style="font-size: 1.15rem;" disabled="disabled">
          {{cartItemCount}}
          <i class="bx bx-cart"></i>
      </button>
  </div>
  <div v-else>
    <button style="font-size: 1.15rem;" @click="cycle">
        <i class='bx bx-left-arrow-alt'></i>
        Go back
    </button>
  </div>
  <!-- <button @click="cycle" >{{currentViewStr}}</button> -->
</header>
<main>
  <component :is="currentView" :cart-items="cart" :classlist-items="classlists"  
  @add-cart="handleAddToCart"  @remove-cart="handleRemoveFromCart" 
  @order-submitted="handleOrderSubmitted"/>
</main>
</template>

<script>
import Checkout from './components/Cart.vue'
import Lesson from './components/Lesson.vue'


export default {
name: 'App',
created(){
 this.loadClasslists()
},
computed:{
  cartItemCount(){
      return this.cart.length || "Empty";
  },
  removeFromcart(){
      return this.cart.length > 0
  },
},
data(){
    return {
        sitename:"After School Activities Store",
        currentView: Lesson,
        currentViewStr: "Cart",
        showClasslists:true,
        cart:[],
        classlists:[]
    }
},
methods:{
  loadClasslists(){
    const port = 3000
    fetch(`http://localhost:${port}/collection/lessons`).then((res)=>{
      res.json().then((json)=>{
          this.classlists = json.map((x)=>{
              x["image"] = `/assets/${x["image"]}`
              return x
          })
      })
    })
  },
  handleAddToCart(data) {
    data = JSON.parse(data)
    for (let i = 0; i < this.classlists.length; i++) {
        const classlist = this.classlists[i]
        if(data["item"]._id == classlist._id){
            classlist.spaces--
        }
    }
    this.cart.push(data)
  },
  handleRemoveFromCart(data) {
    data = JSON.parse(data)

    const temp = []
    for (let i = 0; i < this.cart.length; i++) {
        const cart_item = this.cart[i]
        if(data["id"] != cart_item["id"]){
          temp.push(cart_item)
        }
    }

    this.cart = []

    temp.forEach(x =>{
      this.cart.push(x)
    })
    for (let i = 0; i < this.classlists.length; i++) {
        const classlist = this.classlists[i]
        if(data["item"]._id == classlist._id){
            classlist.spaces++
        }
    }
  },
  handleOrderSubmitted(){
    this.cart = []
    this.cycle()
  },
  cycle(){
      if(this.currentView["name"] == Lesson["name"]){
        this.currentView = Checkout
        this.currentViewStr = "Go Back"
        this.showClasslists = false
      }else{
        this.currentView = Lesson
        this.currentViewStr = "Cart"
        this.showClasslists = true
      }
  }
}
}
</script>

<style>

</style>
