import data from "./desert.json" with {type: "json"}

const generatedClasses = []

function createDesert(dName, fullName, price, UID) {

  const newElemt = document.createElement("div")
  newElemt.classList.add("mb-6")
  const generatedClass = `bg-${fullName}`

  generatedClasses.push(generatedClass)

  const htmlString = `
    <div id="${generatedClass}"  class="${generatedClass} bg-cover bg-center bg-no-repeat h-64 mb-6 rounded-xl justify-items-center place-content-end desserts-image">
      <button class="flex items-center text-customRed font-bold bg-white py-2.5 px-5 -mb-4 rounded-full border-rose-200 border cartBtn " id="${UID}"    >
        <span><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg></span>
        <span class="ps-2 text-xs fish">Add to Cart</span>
      </button>
    </div>

    <div>
      <p class="text-amber-900 text-sm opacity-60 font-medium" >${dName}</p>
      <p class="text-base text-rose-950 font-bold">${fullName}</p>
      <p class="text-customRed font-bold text-lg">$${price}</p>
    </div>
  `;

  newElemt.innerHTML = htmlString;
  return newElemt

}

const container = document.querySelector("#container")

for (let i = 0; i < data.desert.length; i++) {

  const params = data.desert[i]
  const newPrice = params.price.toFixed(2)
  const newElemt = createDesert(params.category, params.name, newPrice, params.id)
  container.insertAdjacentElement("beforeend", newElemt)
}

generatedClasses.forEach((genClass, idx) => {
  const bgHolder = document.getElementById(genClass)
  bgHolder.style.backgroundImage = `url('${data.desert[idx].imageClass}')`

})

const cartContainer = document.getElementById('cart-container')

function createNewCartItem(fullName, price, amount) {
  const cartItem = document.createElement('div')
  cartItem.innerHTML = `
            <p class="text-m text-customBrown opacity-50 mb-3">${fullName}</p>
            <div class="mb-4">
              <span class="text-customRed pe-3">${amount}x</span> 
              <span class="text-customBrown pe-3 opacity-50 font-medium">@${price}</span> 
              <span class="text-customBrown opacity-50">$${(amount * price).toFixed(2)}</span>
            </div>
      `
  return cartItem
}

let cartBtns = document.getElementsByClassName('cartBtn')
const myTotal = document.getElementById('total')

const cart = []

for (const cartBtn of cartBtns) {

  cartBtn.addEventListener('click', () => {

    const UID = Number(cartBtn.id)
    const cartItemData = data.desert.filter((desert) => {
      if (desert.id === UID) {
        return desert
      }
    })[0]

    // if item exist 
    const item = cart.filter((item) => {
      if (item.id === UID) {
        return item
      }
      return null
    })[0]

    if (!item) {
      cart.push({ ...cartItemData, amount: 1 })
    }
    if (item) {
      const index = cart.indexOf(item)
      cart[index].amount += 1
    }

    cartContainer.innerHTML = ""
    for (let i = 0; i < cart.length; i++) {
      const cartItem = createNewCartItem(cart[i].name, cart[i].price.toFixed(2), cart[i].amount)
      cartContainer.append(cartItem)
    }

    const total = cart.map((item) => {
      const { amount, price } = item
      return Number(amount) * Number(price)
    }).reduce((a, b) => {
      return a + b
    }).toFixed(2)

    myTotal.textContent = `$${total}`

    const orderContainer = document.getElementById('order-container')
    const emptyCart = document.getElementById('empty-cart');

    emptyCart.style.display = 'none'
    orderContainer.style.display = 'block'

    const cartAmount = document.getElementById('cart-amount')

    let cartAmountArray = []
    for (let i = 0; i < cart.length; i++) {
      cartAmountArray.push(cart[i].amount)
    }

    let totalAmount = 0;
    for (let i = 0; i < cartAmountArray.length; i++) {
      totalAmount += cartAmountArray[i]
    }
    cartAmount.innerHTML = `Your Cart (${totalAmount})`
  })
}

