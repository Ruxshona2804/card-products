import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiClient } from '../Utilits/apiservice';
import { Star } from 'lucide-react';
import sale1 from '../images/sale1.png'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProducts] = useState(null)

  const getProductDetail = async () => {
    let res = await apiClient({
      url: `products/${id}`
    })

    if (res?.is_succes) setProducts(res?.data)
  }

  useEffect(() => {
    getProductDetail()
  }, [])

  return (
    <div className='mx-auto py-20 flex flex-col gap-10 justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      {product && (
        <div className='max-w-4xl w-full bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden p-8 mt-10 mb-10'>
          <div className='flex flex-col gap-5 md:flex-row'>
            <img
              src={product.thumbnail}
              alt={product.title}
              className='w-full md:w-1/2 h-96 object-cover rounded-lg shadow-lg'
            />
            <div className='md:w-1/2 md:pl-8 flex flex-col justify-center'>
              <h1 className='text-4xl font-extrabold text-gray-900 dark:text-white'>{product.title}</h1>
              <p className='text-lg text-gray-700 dark:text-gray-300 mt-4'>{product.description}</p>
              <div className='mt-6 flex flex-col'>
                <span className='text-2xl font-bold text-green-600'>${product.price}</span>
              </div>
              <div className='mt-10   flex items-end space-x-2'>
                <Star className='text-yellow-500' />
                <span className='text-xl font-semibold text-gray-900 dark:text-white'>{product.rating}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='mt-10 mb-10'>
        <img src={sale1} alt="sale" className='w-full max-w-xl rounded-lg shadow-lg' />
      </div>
    </div>
  )
}

export default ProductDetail
// https://dummyjson.com/products/1