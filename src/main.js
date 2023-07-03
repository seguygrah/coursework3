// Import the Vue library
import Vue from 'vue'

// Import the root component of the application
import App from './App.vue'

// Disable the production tip in Vue's configuration
Vue.config.productionTip = false

// Create a new Vue instance
new Vue({
  // Render the root component as the template
  render: h => h(App),
}).$mount('#app')
