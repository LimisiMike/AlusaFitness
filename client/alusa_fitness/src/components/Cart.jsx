import React, { useState } from 'react'
import { makePayment } from '../utils/api'

const Cart = ({ cartItems, token}) => {
        const [message, setMessage] = useState('')

        const handleCheckout = async () => {
            try {
                const paymentData = { items: cartItems }
                const response = await makePayment(paymentData, token)
                setMessage('Payment successful! Your order is being processed.')
                //Clear cart or navigate to order confirmation page
            } catch (error) {
                setMessage('Payment failed. Please try again')
            }
        }
        return (
            <div>
                <h2>Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your Cart is empty.</p>
                ) : (
                    <div>
                        <ul>
                            {cartItems.map((items, index) => (
                                <li key={index}>
                                    {items.name} - ${items.price} * {items.quantity}
                                </li>
                            ))}
                        </ul>
                        <button onClick={handleCheckout}>Checkout</button>
                    </div>
                )}
                <p>{message}</p>
            </div>
        )
    }

export default Cart
