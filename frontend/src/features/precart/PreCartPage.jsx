import {useUser} from '../../context/userContext'
import React, { useEffect, useState } from 'react';
import cartService from '../cart/cartService';
import PreCartCard from '../precart/PreCartCard'
import { useNavigate } from 'react-router-dom';

const PreCartPage = () => {
    const { userId: cust_id } = useUser();
    // const cust_id = 1
    const [cartList, setCartList] = useState([])
    const [loading, setLoading] = useState(true);  // Loading state for handling fetch delays
    const [error, setError] = useState(null); 
    const navigate = useNavigate();
    const fetchUserCartList = async() => {
        try {
            setLoading(true);
            setError(null);
            console.log('cust_id:', cust_id);
            const fetchedUserCartList = await cartService.getListOfUserCart(cust_id)
            const fetchedUserCartListData = fetchedUserCartList.data.listOfUserCart
            console.log('Cart list:', fetchedUserCartListData);
            setCartList(fetchedUserCartListData)

        } catch(error) {
            setError('Failed to fetch User Cart')
        } finally {
            setLoading(false);
        }
    }


    const handleCartClick = (cart) => {
        navigate(`/cart/${cart.merchant_id}`);
    }

    useEffect(() => {
        if (!cust_id) return;

        fetchUserCartList()
    },[cust_id])

    return (
        
        <div className="mt-2 min-h-screen font-['Plus_Jakarta_Sans'] text-[#1b1c19]">
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
                    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

                    .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                    }
                `}
            </style>


            <div className="w-full px-6 md:px-8 lg:px-10 xl:px-12">

                <div className=" mb-6 pt-4 py-2 text-left">
                    <h2 className="mb-2  font-['Noto_Serif'] text-2xl font-medium tracking-tight text-[#173124]">
                        Cart Selection 🌿
                    </h2>

                    <p className="text-sm leading-relaxed tracking-wide text-[#424844]">
                        Continue your ritual from your favorite tea houses.
                    </p>
                </div> 

                {loading && <div className="flex flex-col items-center
                  justify-center h-48 gap-3">
                <div className="w-9 h-9 rounded-full
                  border-[2.5px] border-transparent
                  border-t-gray-900 border-b-gray-200
                  animate-spin" />
                    <p className="text-sm text-gray-400">
                        Loading Transactions...
                    </p>
                </div>}

                {error && <p>{error}</p>}

                {!loading && !error && cartList.length === 0 && (
                    <p>No carts found.</p>
                )}

                <div className="grid grid-cols-1 gap-2">
                    {cartList.map((cart) => (
                        <PreCartCard
                            key={cart.merchant_id}
                            cart={cart}
                            onClick={() => handleCartClick(cart)}
                        />
                    ))}
                </div> 
            </div>

       
        </div>
  );
}

export default PreCartPage;
