"use client";

import React, { useEffect, useState } from "react";
import { Food } from "../../../types/foods";
import { getCartItems, removeFromCart, updateCartQuantity } from "../actions/actions";
import Swal from "sweetalert2";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiUserBold } from "react-icons/pi";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Food[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire("Removed!", "Item has been removed.", "success");
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) handleQuantityChange(id, product.inventory + 1);
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.inventory > 1) handleQuantityChange(id, product.inventory - 1);
  };

  const calculatedTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.inventory, 0);
  };

  const handleProceed = () => {
    Swal.fire({
      title: "Proceed to Checkout?",
      text: "Please review your cart before checkout",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success", "Your order has been successfully processed", "success");
        setCartItems([]);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">

<header className="bg-black text-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-yellow-500">FoodTuck</h1>
          <nav className="lg:block hidden">
            <ul className="flex space-x-6">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/ourmenu">Menu</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/ourchef">Chef</Link></li>
            <li><Link href="/aboutus">About</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/signin">Signin</Link></li>
            </ul>
          </nav>
          <div className="flex gap-4 ">
          <h1><IoSearch className="text-whitetext text-[24px] cursor-pointer" /></h1>
          <h1><Link href={"/signup"}><PiUserBold className="text-whitetext text-[24px] cursor-pointer" /></Link></h1>
          <h1><Link href={"/shoppingcart"}><HiOutlineShoppingBag className="text-whitetext text-[24px] cursor-pointer" /></Link> </h1>
          </div>
         <div className="lg:hidden block">
         <Sheet>
          <SheetTrigger>
            <GiHamburgerMenu className="text-whitetext text-[24px] cursor-pointer" />
          </SheetTrigger>
          <SheetContent>
            <ul className="flex flex-col gap-[10px] font-medium text-[16px] text-blackkk">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/ourmenu">Menu</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/ourchef">Chef</Link></li>
            <li><Link href="/aboutus">About</Link></li>
            <li><Link href="/shop">Shop</Link></li>
            <li><Link href="/signin">Signin</Link></li>
            </ul>
          </SheetContent>
        </Sheet> 
         </div>
        </div>
      </header>
      
      <section
        className="bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: "url('/allnav.png')" }}
      >
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Shopping Cart</h2>
          <p className="pt-2">
            <Link href="/" className="text-yellow-400">Home</Link> › Cart
          </p>
        </div>
      </section>
      <h2 className="text-2xl font-bold text-center mb-6">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between border-b py-4">
              {item.image && (
                <Image
                src={urlFor(item.image).url()}
                className="w-16 h-16 object-cover rounded-lg" 
                alt="image"
                width={500}
                height={500}

                />
            )}
              <div className="flex-1 ml-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center">
                <button
                  className="px-2 py-1 bg-gray-300 rounded-l hover:bg-gray-400"
                  onClick={() => handleDecrement(item._id)}
                >
                  -
                </button>
                <span className="px-3 py-1 bg-gray-200">{item.inventory}</span>
                <button
                  className="px-2 py-1 bg-gray-300 rounded-r hover:bg-gray-400"
                  onClick={() => handleIncrement(item._id)}
                >
                  +
                </button>
              </div>
              <button
                className="ml-4 px-3 py-1 text-red-500 hover:text-red-700"
                onClick={() => handleRemove(item._id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <h3 className="text-lg font-semibold">Total: ${calculatedTotal().toFixed(2)}</h3>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              onClick={handleProceed}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
