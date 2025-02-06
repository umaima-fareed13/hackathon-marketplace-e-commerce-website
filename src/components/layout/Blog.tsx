import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import { MdThumbUpOffAlt } from "react-icons/md";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { LuShare2 } from "react-icons/lu";
import latest1 from "../../../public/latestnew1.png"
import latest2 from "../../../public/latestnew2.png"
import latest3 from "../../../public/latestnew3.png"

const Blog = () => {
  return (
    <div className="mt-[100px]">
      <h1 className="text-center text-bordercoloryello font-greatVibes text-[28px] md:text-[32px] leading-[36px] md:leading-[40px] font-medium">
        Blog Post
      </h1>
      <h1 className="text-center font-helvetica font-bold text-[32px] md:text-[40px] leading-[38px] md:leading-[45px] text-whitetext">
        <span className="text-bordercoloryello">La</span>test News & Blog
      </h1>

      <section className="text-gray-600 flex flex-col px-[20px] sm:px-[30px] lg:px-[100px]">
        <div className="container py-10 md:py-16">
          <div className="flex flex-wrap justify-center md:justify-between -m-1"> {/* Reduced spacing */}
            
            {/* Blog Card */}
            {[latest1, latest2, latest3].map((image, index) => (
              <div key={index} className="p-2 w-[340px] sm:w-[370px] h-auto sm:h-[400px]"> {/* Reduced padding */}
                <div className="h-full border-2 border-gray-200 border-opacity-60 overflow-hidden">
                  <Image
                    src={image}
                    className="lg:h-52 md:h-40 object-cover object-center " /* Adjusted height */
                    alt="blog"
                  />
                  <div className="p-3 md:p-4"> {/* Reduced padding inside */}
                    <h2 className="text-bordercoloryello title-font font-medium text-[14px] md:text-[15px] mb-1">
                      10 February 2022
                    </h2>
                    <p className="font-helvetica font-bold text-[13px] md:text-[15px] leading-[16px] md:leading-[18px] text-whitetext">
                      {index === 0
                        ? "Pellentesque Non Efficitur Mi Aliquam Convallis Mi Quis"
                        : index === 1
                        ? "Morbi Sodales Tellus Elit, In Blandit Risus Suscipit A"
                        : "Curabitur rutrum velit ac congue malesuada"}
                    </p>
                  </div>

                  <div className="px-3 md:px-[20px] flex justify-between">
                    <div className="text-[12px] md:text-[13px] font-medium leading-[18px] md:leading-[20px] text-whitetext">
                      <Link href={"/blog"}>Learn More</Link>
                    </div>
                    <div className="flex gap-[5px] text-whitetext text-[16px] md:text-[18px]">
                      <MdThumbUpOffAlt className="hover:text-bordercoloryello cursor-pointer" />
                      <LiaCommentDotsSolid className="hover:text-bordercoloryello cursor-pointer" />
                      <LuShare2 className="hover:text-bordercoloryello cursor-pointer" />
                    </div>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
