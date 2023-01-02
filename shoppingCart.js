//product grid

const productList = [{
    id:1,
    name: "First Product",
    price: 5.6,
    img1:"image/product-image-cat-01.jpg",
    img2:"image/product-image-cat-02.jpg"
},
{
    id:2,
    name: "Second Product",
    price: 12.99,
    img1:"image/product-image-car-01.jpg",
    img2:"image/product-image-car-02.jpg"
},
{
    id:3,
    name: "Third Product",
    price: 2.5,
    img1:"image/product-image-decor-01.jpg",
    img2:"image/product-image-decor-02.jpg"
},
{
    id:4,
    name: "Forth Product",
    price: 90.2,
    img1:"image/product-image-bird-01.jpg",
    img2:"image/product-image-bird-02.jpg"
}
]

//display featured collection 
const featuredCollection = document.querySelector(".featured-collection")

window.addEventListener("DOMContentLoaded", () => {
    displayProducts()
})

function displayProducts() {
    return featuredCollection.innerHTML = productList.map((product) => {
        return `
        <div class="products">
                <div class="product-images">
                    <img src=${product.img1} alt="product image">
                    <img src=${product.img2} alt="product image">
                </div>
               
                <a href="">${product.name}</a> 
                <p id="">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to cart</button>
            </div>
        `
    }).join("")   
}



//shopping cart
const showCartBtn = document.getElementById("showCartBtn")
const closeCartBtn = document.getElementById("closeCartBtn")
const shoppingCart = document.querySelector(".shopping-cart")
const cartItemContainer = document.querySelector(".cart-item-container")
const cartQty = document.querySelector(".cart-qty")
const subtotal = document.querySelector(".subtotal")
const emptyCart = document.querySelector(".empty-cart")
const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
})

showCartBtn.addEventListener("click", () => {
    shoppingCart.classList.add("show")
})

document.addEventListener("mousedown", (e) => {
 
        if (!shoppingCart.contains(e.target) || closeCartBtn.contains(e.target)) {
            shoppingCart.classList.remove("show")
        }
    })


let cart = JSON.parse(localStorage.getItem("data")) || []


window.addEventListener("DOMContentLoaded", () => {
    if(cart.length !== 0) {
        displayCart()
        updateCartQty()
        calSubtotal()
        emptyCart.classList.add("hide")
        

    }
   
})



//add to cart
function addToCart(id) {
    plusItem(id)
    emptyCart.classList.add("hide")
    shoppingCart.classList.add("show")
}

function displayCart() {
    return cartItemContainer.innerHTML = cart.map((cartItem) => {
        let search = productList.find((product) => product.id === cartItem.id)
        return `
        <div class="cart-item">
                    <img src="${search.img1}" alt="">
                    <div class="cart-item-details">
                        <h3>${search.name}</h3>
                        <p>$${search.price.toFixed(2)}</p>
                        <div class="item-btn">
                            <div class="item-qty-btn">
                                <button onclick="minusItem(${cartItem.id})"><i class="fa-solid fa-minus"></i></button>
                                ${cartItem.qty}
                                <button onclick="plusItem(${cartItem.id})"><i class="fa-solid fa-plus"></i></button>
                            </div>
                            <button onclick="removeCartItem(${cartItem.id})"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                    <div class="item-subtotal">${formatter.format((search.price*cartItem.qty).toFixed(2))}</div>
                </div>
        `
    }).join("")
}

function plusItem(id) {
    let search = cart.find(cartItem => cartItem.id === id)
    
    if (search === undefined) {
        cart.push({
            id: id,
            qty: 1
        })
    }

    else {
        search.qty += 1
    }
    console.log(cart)
    updateLocalStorage()
    displayCart()
    updateCartQty()
    calSubtotal()
}

function minusItem(id) {
    let search = cart.find(cartItem => cartItem.id === id)
    console.log(search)
    search.qty -= 1

    if (search.qty === 0) {
        cart = cart.filter(cartItem => cartItem.qty !== 0)
    }

    if (cart.length === 0) {
        emptyCart.classList.remove("hide")
    }
    console.log(cart)
    updateLocalStorage()
    displayCart()
    updateCartQty()
    calSubtotal()
}

function calSubtotal() {
    return subtotal.children[1].textContent = formatter.format(cart.map((cartItem) => {
        let search = productList.find(product => product.id === cartItem.id)
        return search.price * cartItem.qty
    }).reduce((x, y) => x + y, 0).toFixed(2))
    
}

function updateCartQty() {
    cartQty.innerText = cart.map((product) => product.qty).reduce((x, y) => x + y, 0)
}

function removeCartItem(id) {
    cart = cart.filter(cartItem => cartItem.id !== id)
    updateLocalStorage()
    displayCart()
    updateCartQty()
    
    if (cart.length === 0) {
        emptyCart.classList.remove("hide")
    }

}

function updateLocalStorage() {
    localStorage.setItem('data', JSON.stringify(cart))

}

