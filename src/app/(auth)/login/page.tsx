'use client'

import { AuthService } from '@/lib/services';
import Link from 'next/link';
import React, { useState } from 'react'
import { FiMail, FiLock, FiLogIn, FiAlertCircle, FiUser } from 'react-icons/fi';

const LoginPage = () => {
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  const validate = () => {
    const newErrors:any = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Nom utilisateur est requis';
      setIsLoading(false);
    }
    
    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
      setIsLoading(false);
    }
           
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if(!validate()) return ;
    try {
      const res= await AuthService.login(formData.username, formData.password)
      if(res){
        console.log("SOMO")
        window.location.href='/dashboard'
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error in the login page : ", error)
    }finally {
      setIsLoading(false);
    }
  }
  return (
     <div className=" min-h-screen bg-white from-indigo-50  flex items-center justify-center">
          <div className="p-6 rounded-lg shadow-2xl max-w-md w-full" >
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-neutral-800"><span className="text-red-500 font-bold"> E-birth</span> Connexion</h2>
            </div>
            <form onSubmit={handleSubmit}>
 
         <div className=" mb-4 w-full">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Adresse Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <FiUser />
                  </span>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    className={`pl-10 pr-4 py-2 w-full border ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    placeholder="username"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}

              
              </div>
              <div className=" mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">
                    <FiLock />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-10 pr-4 py-2 w-full border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    placeholder="au moins 8 caractères "
                  />
                </div>
             
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              {process.env.NEXT_PUBLIC_ERROR_LOGIN && (
              
              <p className="mt-1 text-sm text-red-600">{process.env.NEXT_PUBLIC_ERROR_LOGIN }</p>
               )}
              </div>
              {errors.general && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
                  <FiAlertCircle className="mr-2" />
                  <span>{errors.general}</span>
                </div>
              )}
              

              <div className=" w-full relative">
              <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white
               font-medium py-2.5 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all 
                flex items-center justify-center cursor-pointer"
            >
              {isLoading ? (
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
              ) : (
                <>
                
                  Se connecter
                  <FiLogIn className="ml-2" />
                </>
              )}
            </button>
          </div>
            </form>
            <div className=" mt-6 text-center text-gray-700">
              <p className="text-sm">
                N'avez-vous pas de compte?{' '}
                <Link href="/register" className="text-red-500">
                 S'inscrire
                </Link>
              </p>
            </div>
          </div>
        </div>
  )
}

export default LoginPage

