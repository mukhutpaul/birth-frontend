"use client";

import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Header from "@/app/(components)/Header";
import Rating from "@/app/(components)/Rating";
import Image from "next/image";
import DashWrapper from "../dashWrapper";
import CreatePostModal from "./CreatePost";
import { useGetPostsQuery } from "@/state/api";
import { FiDollarSign, FiHome, FiMail, FiPhone, FiUser } from "react-icons/fi";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Post = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {data: posts,isLoading,isError} = useGetPostsQuery();

  

  //const [createPost] = useCreateProductMutation();
  // const handleCreateProduct = async (productData: ProductFormData) => {
  //   await createProduct(productData);
  // };

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !posts) {
    return (
      <div className="text-center text-red-500 py-4">
        Echec de chargement de posts
      </div>
    );
  }

  return (
    <DashWrapper>
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Maisons" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Créer un post
        </button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg-grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div style={{margin:"50%"}} >Loading...</div>
        ) : (
          posts?.map((post) => (
            <div
              key={post.id}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto bg-white"
            >
              <h1 className="text-lg text-gray-900 font-semibold items-center justify-between">
                 {post.location ==true ? "En Location" : "A Vendre"}
              </h1>
              
              <hr className="bg-white"/>
              <div className="flex flex-col bg-white">
                <div className="items-center mt-5">
                 {post.user[0]?.password}
                <Image
                  src={post.imagepost_set[0]?.url}
                  alt={post.content}
                  width={600}
                  height={300}  
                  className="h-80 mb-5"
                  quality={95}
                  placeholder="empty"
                />
                </div>
                <hr className="bg-gray-950 border-b-gray-950" />
                <div className="flex flex-row gap-1 mt-3 mb-2">
                <FiDollarSign color="blue" size={20}/>
                <h2 className="text-gray-800">{post.price}</h2>
                </div>
                <p className="flex flex-row gap-3 mt-2 mb-2">
                 <FiHome color="blue" size={20}/><p className="text-gray-800">{post.adresse}</p>
                 </p>
                <div className="text-sm text-gray-600 mt-1">

                <div className="flex flex-row gap-3 justify-between mt-2 mb-2">
                    <button className="flex flex-row gap-3">
                    <FiPhone color="red" size={20}/>  +243 816 932 639
                    </button>

                    <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded-full">
                      <PlusCircleIcon color="yellow" className="w-5 mr-2 !text-gray-200"/><p color="red">plus</p>
                    </button>
               </div>
              
              
                <div className="flex flex-row justify-between gap-3 mt-2 mb-2">
                    <button className="flex gap-3">
                    <FiUser color="red" size={20}/><p>{post.user[0]?.noms}</p>
                    </button>
                    <button className="flex items-center mt-2 bg-red-500 hover:bg-yellow-700 text-gray-200 font-bold py-2 px-4 rounded-full">
                    <FiMail color="red" className="w-5 mr-2 !text-gray-200"/><p color="red">chat</p>
                    </button>
                </div>
                <hr className="mt-2"/>
                <p className="mt-3 gap-2">Description : {post.content}</p>
                  {/* Stock: {product.stockQuantity} */}
                </div>
                {/* {product.rating && (
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                )} */}
              </div>
            </div>
          ))
        )}
      </div>
      
    {/* MODAL */}

    <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={()=>{}}
      />
    </div>

  </DashWrapper>

  );
};

export default Post;
