import React, { createContext, useState } from 'react'

const Context = createContext()

export const CartContextProvider = ({ children }) => {
  const [ cart, setCart ] = useState([])

    const addItem = (productToAdd, quantity) => {
        const newItem = {
            ...productToAdd,
            quantity
        }
        if (isInCart(newItem.id)) {
            const updatedCart = cart.map((prod) => {
                if (prod.id === newItem.id) {
                    return {...prod, quantity: prod.quantity + newItem.quantity}
                }
                return prod
            })
            setCart(updatedCart)
        } else {
            setCart([...cart, newItem])
        }
    }
    const isInCart = (id) => {
        return cart.some((prod) => prod.id === id)
    }
    const removeItem = (id) => {
        const updateCart = cart.filter((prod) => prod.id !== parseInt(id))
        setCart([...updateCart])
    }
    const clearCart = () => {
        setCart = ([])
    }
    const totalPrice = () => {
        return cart.reduce((acc,el) => acc + el.precio * el.quantity, 0)
    }

    console.log(cart)
    return (
        <Context.Provider
            value = {{
                cart,
                setCart,
                addItem,
                removeItem,
                clearCart,
                totalPrice
            }}
        >
            {children}
        </Context.Provider>
  )
}

export default Context