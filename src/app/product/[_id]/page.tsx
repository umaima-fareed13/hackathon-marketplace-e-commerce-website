import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Food } from "../../../../types/foods";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { IoSearch } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiUserBold } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface ProductPageProps {
  params: { _id: string };
}

async function getProduct(_id: string): Promise<Food | null> {
  const product = await client.fetch(
    groq`
      *[_type == "food" && _id == $_id][0] {
        _id,
        name,
        image,
        originalPrice,
        price,
        description
      }`,
    { _id }
  );
  return product || null;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { _id } = params;
  const product = await getProduct(_id);

  if (!product) {
    return <div className="text-center text-red-500 text-xl">Product not found.</div>;
  }

  return (
    <div className="max-w-auto mx-auto px-6">
      {/* Header */}
      <header className="bg-black text-white py-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-yellow-500">FoodTuck</h1>
          <nav className="hidden lg:flex space-x-6">
            <Link href="/" className="hover:text-yellow-400">Home</Link>
            <Link href="/ourmenu" className="hover:text-yellow-400">Menu</Link>
            <Link href="/blog" className="hover:text-yellow-400">Blog</Link>
            <Link href="/ourchef" className="hover:text-yellow-400">Chef</Link>
            <Link href="/aboutus" className="hover:text-yellow-400">About</Link>
            <Link href="/shop" className="hover:text-yellow-400">Shop</Link>
            <Link href="/signin" className="hover:text-yellow-400">Signin</Link>
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
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger>
                <GiHamburgerMenu className="text-white text-[24px] cursor-pointer" />
              </SheetTrigger>
              <SheetContent className="bg-white p-6">
                <nav className="flex flex-col space-y-4 text-black">
                  <Link href="/">Home</Link>
                  <Link href="/ourmenu">Menu</Link>
                  <Link href="/blog">Blog</Link>
                  <Link href="/ourchef">Chef</Link>
                  <Link href="/aboutus">About</Link>
                  <Link href="/shop">Shop</Link>
                  <Link href="/signin">Signin</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      

      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-64 flex items-center justify-center"
        style={{ backgroundImage: "url('/allnav.png')" }}
      >
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold">Product Page</h2>
          <p className="pt-2">
            <Link href="/" className="text-yellow-400">Home</Link> › Product
          </p>
        </div>
      </section>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-16">
        <div className="flex justify-center">
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              width={500}
              height={500}
              className="rounded-lg shadow-lg object-cover"
            />
          )}
        </div>
        <div className="flex flex-col space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 text-lg">{product.description}</p>
          <div className="flex items-center space-x-4">
            <span className="text-3xl font-semibold text-red-600">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg text-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}