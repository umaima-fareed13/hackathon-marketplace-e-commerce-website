import { Food } from "../../../types/foods";


export const addToCart = (food : Food) => {
    const cart : Food[] = JSON.parse(localStorage.getItem('cart') || '[]')

    const existingProductIndex = cart.findIndex(item => item._id === food._id)

    if(existingProductIndex > -1) {
        cart[existingProductIndex].inventory += 1
    }
    else {
        cart.push({
            ...food, inventory: 1
        })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
}

export const removeFromCart = (FoodId : string) => {
    let cart : Food[] = JSON.parse(localStorage.getItem('cart')|| '[]')
    cart = cart.filter(item => item._id !== FoodId)
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const updateCartQuantity = ( productId : string, quantity : number) => {
    const cart : Food[] = JSON.parse(localStorage.getItem('cart')|| '[]')
    const productIndex = cart.findIndex(item => item._id === productId)

    if(productIndex > -1) {
        cart[productIndex].inventory = quantity
    }
}

export const getCartItems = () : Food[] => {
    return JSON.parse(localStorage.getItem('cart')|| '[]')
}