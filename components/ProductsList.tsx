"use client"
import { useAppDispatch } from '@/hooks'
import { addToCart } from '@/redux/cartSlice'
import React, {  useEffect, useState } from 'react'

export type product = {
  id: number
  title: string
  description: string
  price: number
  category: string
  thumbnail: string
}

function ProductsList() {
  const [products, setProducts] = useState<product[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchDataFromApi() {
      try {
        setLoading(true);
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDataFromApi();
  }, []);

  return (
    <div>
      <ul className='flex flex-wrap gap-10 p-8 justify-center md:justify-between items-center'>
        {products.map((product) => (
          <li key={product.id}>
            {loading ? (
              <span className='loading loading-ring loading-lg'></span>
            ) : (
              <div className='hover:scale-110 transition-all duration-300 cursor-pointer card card-compact md:w-[380px] md:h-[370px] w-[270px] h-[300px] bg-base-100 shadow-xl'>
                <figure>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className='object-center object-cover '
                  />
                </figure>
                <div className='card-body'>
                  <h2 className='card-title'>{product.title}</h2>
                  <p>{product.description}</p>
                  <div className='card-actions justify-end'>
                    <button
                      className='btn btn-primary'
                      onClick={() => dispatch(addToCart(product))}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsList;
