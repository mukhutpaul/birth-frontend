import { v4 } from "uuid";
import Header from "@/app/(components)/Header";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import Image from "next/image";

type PostFormData = {
  content: string;
  price: number;
  location: boolean;
  adresse: string;
  user_id : string
};

type CreatePostModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: PostFormData) => void;
};

const CreatePostModal = ({
  isOpen,
  onClose,
  onCreate,
}: CreatePostModalProps) => {
  const [formData, setFormData] = useState({
    id: v4(),
    content: "",
    price: 0,
    location: true,
    adresse: "",
    user_id: ""
  });


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const [isUploading, setIsUploading] = useState(false);
  
  const [isPhotos, SetIsPhotos] = useState(true);

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  

  const handleChange = (e: ChangeEvent<HTMLInputElement >) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "price"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    //onClose();
    SetIsPhotos(false)
  };

   const handlePhotos = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
    SetIsPhotos(true)
  };


  if (!isOpen) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles ="block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-4/6 shadow-lg rounded-md bg-white">
      {isPhotos ? (
        <>
        <Header name="Créer un Post" />
        <form onSubmit={handleSubmit} className="mt-5">
       
          {/* STOCK QUANTITY */}
          {/* <label htmlFor="stockQuantity" className={labelCssStyles}>
            Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={formData.content}
            className={inputCssStyles}
          /> */}

           {/* Content */}
          <label htmlFor="rating" className={labelCssStyles}>
            Description
          </label>
          <textarea className={inputCssStyles}/>
          {/* ADRESSE*/}
          <label htmlFor="rating" className={labelCssStyles}>
            Adresse
          </label>
          <textarea className={inputCssStyles}/>

           {/* LOCATION */}
          <div className="flex flex-row gap-3">
          <label htmlFor="rating" className={`${labelCssStyles} mt-2`}>
            Location
          </label>
          <input
            type="checkbox"
            name="location"
            onChange={handleChange}
            className="mt-2"
          />
          </div>

          {/* CREATE ACTIONS */}
          <br/>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Ajouter les images
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Annuler
          </button>
        </form>
      </>
      ):(
        <>
        <Header name="Téléchargement des photos" />
        <form onSubmit={handlePhotos} className="mt-5">

          <div className="flex flex-wrap bg-gray-200  min-h-[300px]">

          </div>

          <input 
          ref={fileInputRef}
          disabled={isUploading}
          type="file" 
          className="absolute right-[9999px]"
          onChange={(e) => {
            const file = e.target.files?.[0] as File;
            console.log(file)
            setIsUploading(true)
            const data = new FormData();
            data.set("file",file)
            
          }}   
          />
          <div className="flex justify-center">
          <button
            type="button"
            disabled={isUploading}
            onClick={() =>{
              fileInputRef.current?.click()
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {isUploading ? "Chargement..." : "Parcourir"}
          </button>
        </div>
          {/* CREATE ACTIONS */}
          <br/>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Valider
          </button>
          <button
            onClick={onClose}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Annuler
          </button>
          
        </form>
        
        </>

      )}
        
      </div>
    </div>
  );
};
export default CreatePostModal;