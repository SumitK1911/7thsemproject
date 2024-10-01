'use client';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Sky, useTexture } from '@react-three/drei';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GirlModel } from './GirlModel';
import { Officetable } from './Officetable';
import Cart from './Cart';
import { useRouter } from 'next/navigation';

const phonemeToViseme = {
    A: "viseme_PP",
    B: "viseme_kk",
    C: "viseme_I",
    D: "viseme_AA",
    E: "viseme_O",
    F: "viseme_U",
    G: "viseme_FF",
    H: "viseme_TH",
    X: "viseme_PP",
};

export default function Experience() {
    const [images, setImages] = useState([]);
    const [responseText, setResponseText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isProcessingQuery, setIsProcessingQuery] = useState(false);
    const [userPrompt, setUserPrompt] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [hasSpokenWelcome, setHasSpokenWelcome] = useState(false);
    const isCurrentlySpeaking = useRef(false)
    const recognition = useRef(null);
    const [discountAmount, setDiscountAmount] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);
    const [currentDiscount, setCurrentDiscount] = useState(10);
    const router = useRouter();
    const [viseme, setViseme] = useState(null);
    const ws = useRef(null);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const handleCheckoutRedirect = (url) => {
        const finalAmountAfterDiscount = finalAmount;
        const paymentUrl = `${url}&amount=${finalAmountAfterDiscount}`;
        window.location.href = paymentUrl;
    };

    useEffect(() => {
        if (window.SpeechRecognition || window.webkitSpeechRecognition) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognition.current = new SpeechRecognition();
            recognition.current.continuous = true;
            recognition.current.interimResults = true;
            recognition.current.lang = 'en-US';

            recognition.current.onresult = async (event) => {
                const transcript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');

                if (event.results[0].isFinal) {
                    handleQuery(transcript);
                }
            };

            recognition.current.onerror = (event) => {
                console.error('Speech recognition error detected: ', event.error);
            };

            if (!hasSpokenWelcome) {
                console.log("Speaking welcome message");
                speakText("Welcome to AI Assistance, powered by RetailShop. How can I assist you today?");
                setHasSpokenWelcome(true);
            }
        }

        return () => {
            if (recognition.current) {
                recognition.current.stop();
            }
        };
    }, []);
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:8000/cart');
                setCartItems(response.data.cartItems || []);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8000/ws/cart');
        ws.current.onopen = () => {
            console.log('WebSocket connection established.');
        };
        ws.current.onmessage = (event) => {
            console.log('Received WebSocket message:', event.data);
            const data = JSON.parse(event.data);

            if (data.images) {
                setImages(data.images);
            }


            if (data.addToCart) {
                addToCart(data.addToCart);
            }

            if (data.deleteFromCart) {
                removeFromCart(data.deleteFromCart.description);
            }
            if (data.action === 'checkout' && data.url && !isRedirecting) {
                setIsRedirecting(true);
                console.log('Redirecting to eSewa payment URL:', data.url);
                handleCheckoutRedirect(data.url);
            }
            if (data.action === 'discount') {
                const newDiscount = Number(data.discount);  // Ensure it's a number
                if (newDiscount !== undefined) {
                    setCurrentDiscount(newDiscount);
                    updateFinalAmount();
                }

            }

        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.current.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    const handleQuery = async (queryText) => {
        if (isProcessingQuery || isSpeaking) return;

        setIsProcessingQuery(true);
        try {
            const response = await axios.post('http://localhost:8000/query/', { query_text: queryText });
            ws.current.send(JSON.stringify({ query_text: queryText }));


            const fetchedImages = response.data.images || [];
            setImages(fetchedImages);
            const newResponseText = response.data.response;

            if (newResponseText) {
                if (newResponseText.includes("out of context")) {
                    setResponseText("It seems like your query is out of context. Could you please clarify or ask something else?");
                } else {
                    if (newResponseText !== responseText) {
                        setResponseText(newResponseText);
                        speakText(newResponseText);
                    }
                }
            }

            const itemToAdd = response.data.addToCart;
            if (itemToAdd) {
                addToCart({
                    id: itemToAdd.id,
                    filename: itemToAdd.filename,
                    description: itemToAdd.description,
                    price: itemToAdd.price
                });
            }

            const itemToDelete = response.data.deleteFromCart;
            if (itemToDelete) {
                removeFromCart(itemToDelete.description);
            }
            if (response.data.discountApplied) {
                const newDiscount = Number(response.data.discount);  // Parse as number
                if (!isNaN(newDiscount)) {
                    setCurrentDiscount(newDiscount);  // Apply the new discount
                } else {
                    console.warn("Discount value is not a number:", response.data.discount);
                }
            }
            
        const finalAmount = response.data.finalAmount || calculateTotal();
            setFinalAmount(finalAmount - discountAmount);
        } catch (error) {
            console.error('Error querying the database', error);
        } finally {
            setIsProcessingQuery(false);
        }

    };

    const speakText = (text) => {
        if ('speechSynthesis' in window && !isCurrentlySpeaking.current) {
            isCurrentlySpeaking.current = true;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.onstart = () => {
                setIsSpeaking(true);
                stopListening();
            };
            utterance.onboundary = (event) => {
                const currentChar = text[event.charIndex];
                const currentViseme = phonemeToViseme[currentChar.toUpperCase()] || null;
                setViseme(currentViseme);
            };
            utterance.onend = () => {
                setIsSpeaking(false);
                isCurrentlySpeaking.current = false;
                setViseme(null);
                startListening();
            };
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn('Speech synthesis not supported in this browser.');
        }
    };

    const startListening = () => {
        if (recognition.current && !isSpeaking && !isProcessingQuery) {
            recognition.current.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognition.current) {
            recognition.current.stop();
            setIsListening(false);
        }
    };

    const handleTextSubmit = () => {
        if (userPrompt) {
            handleQuery(userPrompt);
            setUserPrompt('');
        }
    };

    const addToCart = async (item) => {
        try {
            console.log('Adding to cart:', item);

            await axios.post('http://localhost:8000/cart/add', item);

            setCartItems((prevItems) => {
                const existingItemIndex = prevItems.findIndex(cartItem => cartItem.description === item.description);
                if (existingItemIndex > -1) {
                    return prevItems.map((cartItem, index) =>
                        index === existingItemIndex
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem
                    );
                }
                return [...prevItems, { ...item, quantity: 1 }];
            });
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const removeFromCart = async (description) => {
        try {
            console.log('Removing from cart:', description);

            await axios.post('http://localhost:8000/cart/remove', { description });

            setCartItems((prevItems) => prevItems.filter((item) => item.description !== description));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const updateCartItem = async (index, quantity) => {
        try {
            const updatedItem = cartItems[index];
            updatedItem.quantity = Number(quantity);

            await axios.post('http://localhost:8000/cart/edit/', updatedItem, {
                headers: { 'Content-Type': 'application/json' }
            });

            setCartItems((prevItems) =>
                prevItems.map((item, i) =>
                    i === index ? { ...item, quantity: Number(quantity) } : item
                )
            );

            console.log('Item updated successfully');
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    const updateFinalAmount = () => {
        const total = calculateTotal();
        const discount = (total * currentDiscount) / 100
        setDiscountAmount(discount);
        setFinalAmount(total - discount);
    };

    useEffect(() => {
        updateFinalAmount();
    }, [cartItems, currentDiscount]);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
                <OrbitControls />
                <Sky />
                <Environment preset="sunset" />

                <GirlModel viseme={viseme} />
                <Officetable />
                <TextureAndViewport />
                <TextureOnTable />
            </Canvas>

            <button
                onClick={() => (isListening ? stopListening() : startListening())}
                className='absolute top-[60%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 z-10 p-2 text-2xl border rounded bg-slate-300'
            >
                {isListening ? '⏹️' : '🎤'}
            </button>
            <AnimatePresence>
                {images.length > 0 && (
                    <motion.div
                        className='absolute top-10 right-10 z-10 p-2 w-1/3 h-[80vh] overflow-auto bg-white rounded shadow-lg'
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 300 }}
                        transition={{ duration: 0.5 }}
                    >
                        {images.map((image, index) => (
                            <ImageCard key={`image-${image.id || image.description}-${index}`} image={image} onAddToCart={addToCart} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateCartItem={updateCartItem}
                total={calculateTotal()}
                discountAmount={discountAmount}
                finalAmount={finalAmount}

            />
            <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 p-2 w-1/3 bg-white rounded shadow-lg'>
                <input
                    type='text'
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder='Enter your query'
                    className='w-full p-2 border rounded'
                />
                <button
                    onClick={handleTextSubmit}
                    className='mt-2 w-full p-2 bg-blue-500 text-white rounded'
                >
                    Submit
                </button>
                {responseText && (
                    <div className='mt-4'>
                        <p>{responseText}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function TextureAndViewport() {
    const texture = useTexture('/shopping.jpg');
    const viewport = useThree((state) => state.viewport);

    return (
        <mesh>
            <planeGeometry args={[viewport.width, viewport.height]} />
            <meshBasicMaterial map={texture} position={[0, 0, -5]} />
        </mesh>
    );
}

function TextureOnTable() {
    const banner = useTexture('/falconrobotics.jpg');
    const tableFrontWidth = 0.8;
    const tableFrontHeight = 0.36;

    return (
        <mesh position={[0, -0.59, 4.9]} rotation={[0, 0.1, 0]}>
            <planeGeometry args={[tableFrontWidth, tableFrontHeight]} />
            <meshBasicMaterial map={banner} />
        </mesh>
    );
}

function ImageCard({ image, onAddToCart }) {
    return (
        <div className='p-2 border-b'>
            <h3>{image.description}</h3>
            <p>Price: ${image.price.toFixed(2)}</p>
            <Image
                src={`http://localhost:8000/images/${image.filename}`}
                alt={image.description}
                width={200}
                height={200}
                className='w-full h-auto'
            />
            <button
                onClick={() => onAddToCart(image)}
                className='mt-2 p-2 bg-green-500 text-white rounded'
            >
                Add to Cart
            </button>
        </div>
    );
}