import { groq } from "next-sanity";

export const allProducts = groq`*[_type == "chef"]`;
export const productAll = groq`*[_type == "food"]`;