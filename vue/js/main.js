 Vue.component('product', {
    template: `
   <div class="product">
        <div class="product-image">
              <img :src="image" :alt="altText"/>
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In stock</p>
            <p v-else>Out of Stock</p>

            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <p>Shipping: {{ shipping }}</p>

            <h4>Colors:</h4>
            <div
                class="color-box"
                v-for="(variant, index) in variants"
                :key="variant.variantId"
                :style="{ backgroundColor:variant.variantColor }"
                @mouseover="updateProduct(index)"
            >
            </div>
              
            <button v-on:click="addToCart" 
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
            >
                Add to cart
            </button>

            <button v-on:click="delFromCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
            >
                Delete from cart
            </button>
        </div>
   </div>
   `,

   data() {
    return {
        product: "Socks",
        brand: 'Vue Mastery',
        selectedVariant: 0,
        altText: "A pair of socks",
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 10,
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0,
            }
         ],
    }
   },

   props: {
        premium: {
            type: Boolean,
            required: true
        }
    },


   methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },

        delFromCart() {
            this.$emit('del-from-cart', this.variants[this.selectedVariant].variantId);
        },

        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
         },
     },

     computed: {
        title() {
            return this.brand + ' ' + this.product;
        },

        image() {
            return this.variants[this.selectedVariant].variantImage;
         },
         
         inStock() {
            return this.variants[this.selectedVariant].variantQuantity
         },

         shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
         }         
     }
 })

 let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },

        deleteCart(id) {
            let index = this.cart.indexOf(id)
            this.cart.splice(index, 1)
        }
     }     
 })

 
