// اضافه المنتاجات
let container = document.querySelector("#Featured-container")
let products = [
    {
        id : 1,
        offer : "-13%",
        src : "pngwing.com.png",
        name : "MacBook Pro M4",
        vew : "4.9",
        old : 2.299,
        new : 1.999
    },
    {
        id : 2,
        offer : "-14%",
        src : "pngwing1.com.png",
        name : "iphone 17 Pro",
        vew : "4.8",
        old : 1.399,
        new : 1.199
    },
    {
        id : 3,
        offer : "-20%",
        src : "pngwing2.com.png",
        name : "Sony WH-1000XM6",
        vew : "4.9",
        old : 499,
        new : 399
    },
    {
        id : 4,
        offer : "-15%",
        src : "pngwing3.com.png",
        name : "Apple Watch Ultra 3",
        vew : "4.7",
        old : 999,
        new : 849
    }

]
function add (){
    let solve = products.map(function(item){
        return `
            <div class="Featured-cart1">
                    <div class="Featured-cart-top">
                        <p>${item.offer}</p>
                        <img src="images/${item.src}" alt="Laptop">
                        <i class="fa-regular fa-heart"></i>
                    </div>
                    <div class="Featured-cart-bottom">
                        <h3>${item.name}</h3>
                        <div>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <span>(${item.vew})</span>
                        </div>
                        <div>
                            <p class="old-price">$${item.old}</p>
                            <p class="new-price">$${item.new}</p>
                        </div>
                        <button onclick="addCart(${item.id})">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <p>Add to Cart</p>
                        </button>
                    </div>
                </div>
        `
    })
    container.innerHTML += solve.join("")
}
add()
// اضافة الي العربة
let counter = document.querySelector("#counter")
let menu =document.querySelector("#menu")
let cart = JSON.parse(localStorage.getItem("products")) || []
function addCart(id){
    let product = products.find(item =>{
        return item.id === id
    })

    let existingProduct = cart.find(item => {
        return item.id === id
    })
    if(existingProduct){
        existingProduct.quantity++
    }
    else{
        cart.push({
            ...product ,
            quantity : 1
        })
    }
    
    updateCart()
    console.log(cart)
}

function updateCart() {

    let dis = cart.map(function(item) {
        localStorage.setItem("products" , JSON.stringify(cart))
        let process = item.new * item.quantity;
        return `
            <div class="menu-cont">

                <div class="left">
                    <p class="name">${item.name}</p>

                    <button 
                        class="button-left"
                        onclick="mea(${item.id} , 'me')">
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button 
                        class="button-right"
                        onclick="mea(${item.id} , 'plus')">
                        +
                    </button>
                    <button class="menu-del" onclick="fun(${item.id})">Delet</button>
                </div>

                <p>Price: $${process}</p>

            </div>
        `;
    });

    
    let total = cart.reduce(function(first , item){
        return first + (item.new * item.quantity)
    } , 0)

    
    menu.innerHTML = dis.join("") + `
        <p class="menu-p">Total price is : $${total}</p> 
        <a href="cart.html" class="menu-a">View all products</a>
    `;

    counter.textContent = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);
    

}
updateCart()

function fun(id){
        cart = cart.filter(item => {
            return item.id !== id
        })
        updateCart()
    }
let car = document.querySelector("#cart")
car.addEventListener("click" , function(){
    menu.style.display=
        menu.style.display == "block" ? "none" : "block"
    if(cart.length == 0){
        menu.innerHTML = `
            <h3 style="color : #000; text-align:center; letter-spacing:1px">Cart is empty</h3>
        `
    }
    
})
function mea(id ,world) {

    let pro = cart.find(item => {
        return item.id === id;
    });

    if (!pro) return;

    world == "plus" ? pro.quantity++ : pro.quantity--

    if (pro.quantity <= 0) {
        cart = cart.filter(item => {
            return item.id !== id;
        });
    }

    updateCart();
}