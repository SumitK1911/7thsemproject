'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Cart({ cartItems, removeFromCart, updateCartItem, total, discountAmount, finalAmount }) {
    const router = useRouter();
    const ws = useRef(null);

    useEffect(() => {
        // Initialize WebSocket connection
        ws.current = new WebSocket('ws://localhost:8000/ws/cart');

        ws.current.onopen = () => {
            console.log('WebSocket connection established.');
        };

        ws.current.onclose = () => {
            console.log('WebSocket connection closed.');
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    const handleQuantityChange = (index, value) => {
        const quantity = Number(value);
        if (!isNaN(quantity) && quantity >= 0) {
            updateCartItem(index, quantity);
            sendCartUpdate(cartItems[index], 'update', quantity);
        }
    };

    const handleRemoveClick = (description) => {
        removeFromCart(description);
        sendCartUpdate({ description }, 'remove');
    };

    const handleProceedToCheckout = async () => {
        // Ensure the WebSocket connection is open before proceeding
        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
            console.error('WebSocket connection is not open.');
            alert('Unable to proceed to checkout. Please try again.');
            return;
        }
    
        const productIds = cartItems.map(item => item.id).join(',');
    
        try {
            const response = await fetch('http://localhost:8000/esewa-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: finalAmount,  // Use final amount for payment
                    product_id: productIds,
                }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                alert(`Payment initiation failed: ${errorData.detail || 'Unknown error'}`);
                return;
            }
    
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url; // Redirect to eSewa payment URL
            }
        } catch (error) {
            console.error('Error initiating payment:', error);
            alert('Error initiating payment.');
        }
    };
    

    const sendCartUpdate = (item, action, quantity = null) => {
        if (ws.current) {
            const update = {
                action,
                item: {
                    description: item.description,
                    quantity: quantity !== null ? quantity : undefined,
                }
            };
            ws.current.send(JSON.stringify(update));
        }
    };

    return (
        <AnimatePresence>
            {cartItems.length > 0 && (
                <motion.div
                    className='absolute top-10 left-10 z-10 p-2 w-1/3 h-[80vh] overflow-auto bg-white rounded shadow-lg'
                    initial={{ opacity: 0, x: -300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className='text-xl font-bold mb-4'>Cart</h2>
                    {cartItems.map((item, index) => (
                        <div key={index} className='p-2 border-b'>
                            <div className='flex items-center'>
                                <Image
                                    src={`http://localhost:8000/images/${item.filename}`}
                                    alt={item.description || item.name}
                                    width={100}
                                    height={100}
                                    className='mr-4'
                                />
                                <div>
                                    <h3 className='text-lg font-semibold'>{item.description}</h3>
                                    <div className='flex justify-between items-center mt-2'>
                                        <input
                                            type='number'
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                                            className='w-16 p-1 border rounded'
                                            min='0'
                                        />
                                        <p className='ml-4'>Price: ${item.price.toFixed(2)}</p>
                                        <button
                                            onClick={() => handleRemoveClick(item.description)}
                                            className='ml-4 p-1 bg-red-500 text-white rounded'
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='p-2 mt-4 border-t'>
                        <h3 className='text-lg font-semibold'>Total: ${total.toFixed(2)}</h3>
                        <h3 className='text-lg font-semibold'>Discount: ${discountAmount.toFixed(2)}</h3>
                        <h3 className='text-lg font-semibold'>Final Amount: ${finalAmount.toFixed(2)}</h3>
                        <button
                            className='text-center border-black rounded-xl p-3 bg-slate-600 text-white'
                            onClick={handleProceedToCheckout}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
