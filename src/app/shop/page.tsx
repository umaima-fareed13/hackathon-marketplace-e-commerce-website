"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { PiUserBold } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";
import { client } from "@/sanity/lib/client";
import { productAll } from "@/sanity/lib/queries";
import { Food } from "../../../types/foods";
import { urlFor } from "@/sanity/lib/image";
import { addToCart } from "../actions/actions";
import Swal from "sweetalert2";

const Page = () => {
  const [food, setFood] = useState<Food[]>([]);

  useEffect(() => {
    async function fetchFood() {
      const fetchedFood: Food[] = await client.fetch(productAll);
      setFood(fetchedFood);
    }
    fetchFood();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, food: Food) => {
    e.preventDefault()
    Swal.fire({
      position : "top-right",
      icon : "success",
      title : `${food.name} added to cart`,
      showConfirmButton : false,
      timer : 1000
    })
    addToCart(food)
  }

  return (
    <div>
      {/* Header */}
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
          <div className="flex gap-4">
            <IoSearch className="text-white text-[24px] cursor-pointer" />
            <Link href="/signup">
              <PiUserBold className="text-white text-[24px] cursor-pointer" />
            </Link>
            <Link href="/shoppingcart">
              <HiOutlineShoppingBag className="text-white text-[24px] cursor-pointer" />
            </Link>
          </div>
          <div className="lg:hidden block">
            <Sheet>
              <SheetTrigger>
                <GiHamburgerMenu className="text-white text-[24px] cursor-pointer" />
              </SheetTrigger>
              <SheetContent>
                <ul className="flex flex-col gap-[10px] font-medium text-[16px] text-black">
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

      {/* Banner */}
      <section
        className="bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: "url('/allnav.png')" }}
      >
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Our Shop</h2>
          <p className="pt-[10px]">
            <Link href="/" className="text-yellow-400">Home</Link> › Shop
          </p>
        </div>
      </section>

      {/* Sorting & Filter Section */}
      <div className="mt-[100px] mb-[100px] px-6 lg:px-[120px]">
        <div className="lg:flex gap-4">
          <div className="flex items-center">
            <h1>Sort by: </h1>
            <h1 className="flex justify-between px-[20px] w-[200px] h-[40px] border py-2 text-gray-500 ml-2 cursor-pointer">
              Newest <IoIosArrowDown className="pt-[5px] text-xl" />
            </h1>
          </div>
          <div className="flex items-center mt-4 lg:mt-0">
            <h1>Show: </h1>
            <h1 className="flex justify-between px-[20px] w-[200px] h-[40px] border py-2 text-gray-500 ml-2 cursor-pointer">
              Default <IoIosArrowDown className="pt-[5px] text-xl" />
            </h1>
          </div>
        </div>

        {/* Product Grid */}
        <div className="container mx-auto px-5 py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {food.map((item) => (
              <div key={item._id} className="p-4 border rounded-lg shadow-md">
                <Link href={`/product/${item._id}`}>
                <div className="relative h-48 w-full overflow-hidden rounded">
                  {item.image && (
                    <Image
                      src={urlFor(item.image).url()}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-gray-900 font-medium text-lg">{item.name}</h2>
                  <p className="text-gray-700 mt-1">${item.price}</p>
                </div>
                <button
                  className="bg-gradient-to-r from-black to-purple-200 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg 
                  hover:scale-110 transition-transform duration-300 ease-in-out
                  "
                  onClick={(e) => handleAddToCart(e, item)}
                  >
                    Add to Cart 
                </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
