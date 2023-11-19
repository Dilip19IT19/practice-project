"use client"
import { product } from '@/components/ProductsList';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { removeFromCart } from '@/redux/cartSlice';


function Carts() {
 const cartProducts:product[]=useAppSelector((state)=>state.cart.Products);
 const dispatch=useAppDispatch();

  return (
    <div>
      <ul className='flex flex-wrap justify-center md:justify-between item-center p-10 gap-3'>
        {cartProducts.length===0 ? <div className=' w-full h-screen flex justify-center items-center'> <p>No products available</p></div> :  cartProducts.map((product) => (
          <li key={product.id} >
            <div  className="hover:scale-110 transition-all duration-300 cursor-pointer card card-compact md:w-[380px] md:h-[370px] w-[270px] h-[300px] bg-base-100 shadow-xl">
              <figure><img src={product.thumbnail} alt={product.title} className='object-center object-cover ' /></figure>
              <div className="card-body">
                <h2 className="card-title">{product.title}</h2>
                <p>{product.description}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-error" onClick={() => dispatch(removeFromCart(product))}>Remove from cart</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Carts;