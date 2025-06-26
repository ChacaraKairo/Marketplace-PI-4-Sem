import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {toast} from 'react-hot-toast';

type CartContextType = {
    cartTotalQty: number;
    cartTotalAmount: number;
    cartProducts: CartProductType[] | null;
    handleAddProductToCart: (product: CartProductType) => void;
    handleRemoveProductFromCart: (product: CartProductType) => void;
    handleCartQtyIncrease: (product: CartProductType) => void;
    handleCartQtyDecrease: (product: CartProductType) => void;
    handleClearCart: () => void;
    paymentIntent: string | null;
    handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props{
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) =>{
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0);
    const [cartProducts, setCartProducts] =  useState<CartProductType[] | null>(null);
    const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

    //Faz com que os itens persistam na tela ao reload do localStorage
    useEffect(() => {
        const cartItems: any = localStorage.getItem('klpShopCartItems');
        const cProducts: CartProductType[] | null = JSON.parse(cartItems);

        //Salva a intesão de pagamento no localStorage
        const shopPaymentIntent:any = localStorage.getItem('shopPaymentIntent');
        const paymentIntent: string | null = JSON.parse(shopPaymentIntent)

        setCartProducts(cProducts);
        setPaymentIntent(paymentIntent);
    }, []);

    useEffect(()=> {
        const getTotals = () => {
            if(cartProducts){
            const {total, qty} = cartProducts?.reduce((acc, item)=> {
                    const itemTotal = item.price * item.quantity;
                    
                    acc.total += itemTotal
                    acc.qty += item.quantity
    
                    return acc;
                }, {
                    total: 0,
                    qty: 0
                });  
                setCartTotalQty(qty);
                setCartTotalAmount(total);
            }
        };
        getTotals()
    }, [cartProducts])

    //A função pega o estado antigo do carrinho e adiciona o produto novo.
    const handleAddProductToCart = useCallback((product: CartProductType) => {
        setCartProducts((prev) => {
            let updateCart;
            if(prev){
                updateCart = [...prev, product]
            }else{
                updateCart = [product]
            }
            toast.success('Produto adicionado ao carrinho')
            localStorage.setItem('klpShopCartItems', JSON.stringify(updateCart));
            return updateCart;
        })
    }, []);
    const handleRemoveProductFromCart = useCallback((product: CartProductType)=>{
        if(cartProducts){
            const filteredProducts = cartProducts.filter((item) => {
                return item.id !== product.id
            })

            setCartProducts(filteredProducts);
            toast.success('Produto removido do carrinho')
            localStorage.setItem('klpShopCartItems', JSON.stringify(filteredProducts));
        }
    },[cartProducts]);

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        let updatedCart;

        if(product.quantity === 99){
            return toast.error("Ops! Quantidade de produtos exedida")
        }
        if(cartProducts){
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id
            );

            if(existingIndex > -1){
                ++updatedCart[existingIndex].quantity
            }

            setCartProducts(updatedCart)
            localStorage.setItem('klpShopCartItems', JSON.stringify(updatedCart));
        }
    }, [cartProducts]);

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        let updatedCart;

        if(product.quantity === 1){
            return toast.error("Ops! Quantidade de produtos exedida")
        }
        if(cartProducts){
            updatedCart = [...cartProducts];

            const existingIndex = cartProducts.findIndex(
                (item) => item.id === product.id
            );

            if(existingIndex > -1){
                --updatedCart[existingIndex].quantity;
            }

            setCartProducts(updatedCart)
            localStorage.setItem('klpShopCartItems', JSON.stringify(updatedCart));
        }
    }, [cartProducts]);

    const handleClearCart = useCallback(() => {
        setCartProducts(null);
        setCartTotalQty(0);
        localStorage.setItem('klpShopCartItems', JSON.stringify(null));
    }, [cartProducts]);

    const handleSetPaymentIntent = useCallback(
        (val: string | null) => {
            setPaymentIntent(val);
            localStorage.setItem("shopPaymentIntent", JSON.stringify(val));
        }, [paymentIntent]
    );

    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart,
        paymentIntent,
        handleSetPaymentIntent,
    };

    return <CartContext.Provider value={value} {...props}/>
};

export const useCart = () =>{
    const context = useContext(CartContext);

    if(context === null){
        throw new Error("useCart deve ser usado dentro de um CartContextProvider")
    }
    return context;
}