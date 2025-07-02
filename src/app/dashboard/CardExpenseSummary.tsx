import {
  useGetPostsQuery,
} from "@/state/api";
import { PlusCircleIcon, TrendingUp } from "lucide-react";
import Image from "next/image";
import { FiMail, FiPhone, FiPlus, FiUser } from "react-icons/fi";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";



const colors = ["#00C49F", "#0088FE", "#FFBB28"];

const CardExpenseSummary = () => {

  const {data:posts, isLoading,isError } = useGetPostsQuery();

   if(isLoading){
        return <div className="py-4">
          <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
        </div>
    }

    if(isError || !posts){
        return(
           <div className="text-center text-red-500 py-4">
            Echec de chargement des posts
           </div> 
        )
    }

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between pb-16">
      {isLoading ? (
      <div className="m-5">Loading...</div>
      ) : ( 
        posts.map((post)=>(
        <>
          {/* HEADER */}
          <div key={post.id} className="">
          
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5 justify-between">
            { post.location == true ? (<p>A vendre</p>): (<p>En location</p>) }
            <p>créé le {post.created_at}</p>
            </h2>
            <hr />
          </div>
          {/* BODY */}
          <div className="xl:flex justify-between pr-7 overflow-auto">
          <Image
                  src={`/kinshasa.png`}
                  alt="maison"
                  width={600}
                  height={400}
                  className="mb-3 rounded-2xl w-100 h-100 justify-center"
                />
            
          </div>
          {/* HEADER */}
          <div>
            <hr />
          <h6 className="text-lg font-semibold mb-2 px-7 pt-5">
            <div className="flex flex-row justify-between">
            <p>{ post.location == true ? (<p>A vendre</p>): (<p>En location</p>) }</p>
            <p>Montant : {post.price} $</p>
            </div><br/>
            <div className="flex flex-row gap-3 justify-between">
            <button className="flex flex-row gap-3">
            <FiPhone color="red" size={30}/>  +243 816 932 639
            </button>

            <button className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded-full">
              <PlusCircleIcon color="yellow" className="w-5 mr-2 !text-gray-200"/><p color="red">plus</p>
            </button>
            </div>
            
            <div className="flex flex-row justify-between gap-3">
            <button className="flex gap-3">
            <FiUser color="red" size={30}/><p></p>
            </button>
             <button className="flex items-center mt-2 bg-red-500 hover:bg-yellow-700 text-gray-200 font-bold py-2 px-4 rounded-full">
              <FiMail color="red" className="w-5 mr-2 !text-gray-200"/><p color="red">chat</p>
            </button>
            </div>
          </h6>
        </div>

        </>
      ))
      )}
    </div>
  );
};

export default CardExpenseSummary;
