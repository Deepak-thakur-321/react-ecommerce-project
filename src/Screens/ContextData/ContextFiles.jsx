import React, { createContext, useState, useEffect, } from 'react';
import axios from 'axios';


export const MyProductContext = createContext();

const MyContextProvider = ({ children }) => {
   const [products, setProducts] = useState([]);

   const [search, setSearch] = useState("")

   const [cart, setCart] = useState(() => {
      try {
         const savedCart = localStorage.getItem("cart")
         return savedCart ? JSON.parse(savedCart) : [];
      } catch (error) {
         console.log(error);
         return []
      }

   });

   useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(cart))

   }, [cart])


   const addToCart = (product) => {
      setCart((prev) => {
         const existingItems = prev.find((items) => items.id === product.id)
         if (!existingItems) {
            return [...prev, { ...product, quantity: 1 }]
         } else {
            return prev.map((item) =>
               item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
            )
         }
      })
   };


   const incrementQty = (id) => {
      setCart((prev) =>
         prev.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
         )
      );
   };

   const decrementQty = (id) => {
      setCart((prev) =>
         prev
            .map((item) =>
               item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0)
      );
   };

   const removeItem = (id) => {
      setCart((prev) => prev.filter((item) => item.id !== id));
   };



   useEffect(() => {
      const featuredData = async () => {
         try {
            let response = await axios.get("https://dummyjson.com/products")
            setProducts(response.data?.products || [])
         } catch (error) {
            console.log(error);

         }
      }

      featuredData()

   }, [])

   return (
      <MyProductContext.Provider value={{ products, setProducts, search, setSearch, cart, setCart, addToCart, incrementQty, decrementQty, removeItem }}>
         {children}
      </MyProductContext.Provider>
   );
};

export default MyContextProvider;
