import React, { useEffect, useState } from 'react';
//import merchantService from './merchantService'
import MerchantListing from './MerchantListing'

const MerchantsPage = () => {
    const fetchedMerchantsData = [
        {merchant_id : 1, merchant_name : "Rowayne's Matcha"},
        {merchant_id : 2, merchant_name : "Alyssa's Matcha"},
        {merchant_id : 3, merchant_name : "Shyan's Matcha"},
        {merchant_id : 4, merchant_name : "Delearns's Matcha"},
    ]
    const [merchants, setMerchants] = useState([])
    const [loading, setLoading] = useState(true);  // Loading state for handling fetch delays
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchMerchants = async() => {
            try {
                //const fetchedMerchants = await merchantService.getAllMerchants
                //const fetchedMerchantsData = fetchedMerchants.data.singleMerchantProducts
                setMerchants(fetchedMerchantsData)
            }catch(err) {
                setError('Failed to fetch products')
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }     
        }

        fetchMerchants();
    }, []);
    if(loading) return <div>Loading....</div>
    if(error) return <div>(error)</div>

    return (
     <div className="bg-gradient-to-r from-green-300 via-teal-400 to-lime-300 ">
      <div className="container mx-auto p-4 bg-purple">
        <h1 className="text-3xl text-black text-decoration-line: underline font-bold text-center mb-5">Merchants</h1>
        <MerchantListing merchants={merchants} />  {/* Pass mock products to ProductListing */}
      </div>
      </div>
  );

}

export default MerchantsPage


