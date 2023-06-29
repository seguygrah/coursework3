<template>
  <h1>Lesson Page</h1>
  <section style="display: flex; flex-direction: row; width: 100%;">
    <section style="width: 30%;">
        <h3>Filter & Order</h3>
        <!-- div element to encapsulate the sorting div and order div -->

        <div id="filters" style="display:flex; flex-direction: column; align-self: flex-start; width: 100%;">
            <h3 style="margin: 0.5rem 0;">Filter</h3>

            <!-- div element to encapsulate the sorting input radios -->

            <div id="sort">
                <div v-for="(value, key) in sort_dict" :key="value.id">
                  
                    <input type="radio" name="sort" value="key" v-if="value.checked" checked v-on:click="sort(key)">
                    <input type="radio" name="sort" value="key" v-else v-on:click="sort(key)">
                    <label for="sort">{{key}}</label>
                </div>
            </div>
            <h3 style="margin: 0.5rem 0;">Order</h3>

            <!-- div element to encapsulate the order input radios -->

            <div id="order">
                <div v-for="(value, key) in order_dict" :key="value.id"> 
                    <input type="radio" name="order" value="key" v-if="value.checked" checked v-on:click="order(key)">
                    <input type="radio" name="order" value="key" v-else v-on:click="order(key)">
                    <label for="order">{{key}}</label>
                </div>
            </div>
        </div>
    </section>

    <section style="width: 100%;">
      <div style="width: 100%; display: inline-flex; align-items: center; justify-content: flex-start;">
          <div id="search">
              <input type="text" v-bind:placeholder="searchTerm" v-if="search" v-model="searchInput">
              <button v-on:click="search"><i class='bx bx-search'></i></button>
          </div>
          
      </div>
      
      <div id="classlists">
          <div class="classlist" v-for="item in classlist_copy" :key="item.id">
            <img class="image" :src="item.image">
            <div class="info_container">
                <p>Subject: {{item.subject}}</p>
                <p>Location: {{item.location}}</p>
                <p>Price: ${{item.price}}</p>
                <p>Spaces: {{item.spaces}}</p>
                <button v-if="item.spaces > 0" @click="add_to_cart(item)">Add To Cart</button>
                <button v-else disabled>Add To Cart</button>
            </div>
          </div>
      </div>
  </section>
    
</section>
</template>

<script>

export default {
  name: 'LessonComp',
  props:{
        classlistItems: {
            type: Array,
        }
    },
  emits: ['add-cart'],
  created(){
    this.loadClasslists()
  },
  methods:{
    
    showCheckout(){
        this.showClasslists = this.showClasslists ? false : true
    },
    add_to_cart(item){
        const id = `${item.subject[0]}`+item.id+`${item.location[0]}`+Math.ceil(Math.random()*1000000)
        let data = {
            "id": id,
            "item":item,
        }
        this.$emit("add-cart",JSON.stringify(data))
    },
    search_func(query){
        let val = this.sort_value.toLowerCase()

        if(val != "all" & query.trim() != ''){

            if(val != "price"){
                this.classlist_copy = this.classlistItems.filter(x => x[val].toLowerCase().includes(query.toLowerCase()))
            }else{
                if(query.match(/^[0-9]+$/) != null){
                    this.classlist_copy = this.classlistItems.filter(x => (''+x[val]).includes(query))
                }
            }
            this.order_sort(this.sort_value)
        }

        
        if(query.trim() == ''){
            this.loadClasslists()
            this.order_sort(this.sort_value)
        }

    },
    order(value){
        this.order_value = value
        this.order_sort(this.sort_value)
    },
    sort(value){
        this.sort_value = value
        this.order_sort(value)
    },
    order_sort(criteria){
        criteria = criteria.toLowerCase()
        if(criteria != "all"){
            this.searchTerm = criteria
            const isAscending = this.order_value == "Ascending"
            this.classlist_copy.sort((a,b)=>{
                if(a[criteria] > b[criteria]) return isAscending ? 1 : -1
                if(b[criteria] > a[criteria]) return isAscending ? -1 : 1                       
                return 0
            })
        }else{
            this.searchTerm = "Please choose criteria eg. subject, location, price."
            this.loadClasslists()
        }
    },
    loadClasslists() {
      this.classlist_copy = []
    
      this.classlistItems.forEach(x=>{
        this.classlist_copy.push(x);
      })
    }
  },
  data(){
    return{
      sitename:"After School Activities Store",
      cart:[],
      order_value:"Ascending",
      order_dict:{
          "Ascending":{id:1,checked:true},
          "Descending":{id:2,checked:false}
      },
      sort_value:"All",
      sort_dict:{
          "All":{id:1,checked:true},
          "Subject":{id:2,checked:false},
          "Location":{id:3,checked:false},
          "Price":{id:4,checked:false}
      },
      searchInput:'',
      searchTerm:'Please choose criteria eg. subject, location, price.',
      
      classlist_copy:[],
      user_D:{
          name:"",
          phone:"",
      },
    }
  },
  computed:{
    cartItemCount(){
        return this.cart.length || "Empty";
    },
    removeFromcart(){
        return this.cart.length > 0
    },
    search(){
        this.search_func(this.searchInput)
        return true
    },
  }
}
</script>

<style scoped>
 
</style>