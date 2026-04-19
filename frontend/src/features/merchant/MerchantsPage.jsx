import React, { useEffect, useState } from 'react';
import merchantsService from './merchantsService'
import MerchantListing from './MerchantsListing'
import GeolocationComponent from './GeolocationComponent'  // Import the Geolocation Component
import { haversineDistance } from '../../utils/distance';


const MerchantsPage = () => {
    const [merchants, setMerchants] = useState([])
    const [loading, setLoading] = useState(true);  // Loading state for handling fetch delays
    const [error, setError] = useState(null); 
    const [searchQuery, setSearchQuery] = useState(''); // To store the search input
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
      const stored = localStorage.getItem('location');
      if (stored) {
        setUserLocation(JSON.parse(stored));
      }
    }, []);

 
    // Fetch merchants — no sorting here, just store raw data
    useEffect(() => {
        const fetchMerchants = async() => {
            try {
                const fetchedMerchants = await merchantsService.getAllMerchantNames();
                const fetchedMerchantsData = fetchedMerchants.data.allMerchantNames;
                setMerchants(fetchedMerchantsData); // raw, unsorted
            } catch(err) {
                setError('Failed to fetch products');
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchMerchants();
    }, []);

    // This runs reactively whenever merchants OR userLocation changes
    const filteredMerchants = merchants
      .filter(merchant =>
        merchant.merchant_brand_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        // 1. Active merchants first
        if (b.merchant_active_status !== a.merchant_active_status) {
          return b.merchant_active_status - a.merchant_active_status;
        }
        // 2. Within same active group, sort by nearest
        if (userLocation && a.merchant_lat && b.merchant_lat) {
          const distA = haversineDistance(userLocation.lat, userLocation.lng, a.merchant_lat, a.merchant_lng);
          const distB = haversineDistance(userLocation.lat, userLocation.lng, b.merchant_lat, b.merchant_lng);
          return distA - distB;
        }
        return 0;
      });

    
    if (loading) return (
      <div className="flex flex-col items-center
          justify-center h-48 gap-3">
        <div className="w-9 h-9 rounded-full
          border-[2.5px] border-transparent
          border-t-gray-900 border-b-gray-200
          animate-spin" />
        <p className="text-sm text-gray-400">
          Loading merchants...
        </p>
      </div>
    );
    if(error) return <div>(error)</div>

    return (
      <div className="container item-center mx-auto mt-2 p-2 pb-20">
        <GeolocationComponent onLocationFetched={(loc) => setUserLocation(loc)} />
        <form className="max-w-s mx-auto p-3 m-2">   
          <div className="relative flex items-center">
            {/* Search Icon */}
            <div className="absolute left-3 text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 21l-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"></path>
              </svg>
            </div>
            {/* Search Input */}
            <input
              type="text"
              id="search"
              className="w-full pl-10 pr-16 py-2 border rounded-2xl text-sm"
              placeholder="Search for Merchants"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update state when user types
            />
          </div>
        </form>
        <MerchantListing merchants={filteredMerchants} userLocation={userLocation} />  {/* Pass mock products to ProductListing */}
      </div>
  );

}

export default MerchantsPage




   // useEffect(() => {
    //     const fetchMerchants = async() => {
    //         try {
    //             const fetchedMerchants = await merchantsService.getAllMerchantNames();
    //             const fetchedMerchantsData = fetchedMerchants.data.allMerchantNames
    //             console.log(fetchedMerchantsData)
    //             const sortedMerchants = [...fetchedMerchantsData].sort(
    //             (a, b) => b.merchant_active_status - a.merchant_active_status
    //             );

    //             setMerchants(sortedMerchants)
    //         }catch(err) {
    //             setError('Failed to fetch products')
    //             console.error('Error fetching products:', err);
    //         } finally {
    //             setLoading(false);
    //         }     
    //     }

    //     fetchMerchants();
    // }, []);

    // // Filter merchants based on search query
    // const filteredMerchants = merchants.filter(merchant =>
    //     merchant.merchant_brand_name.toLowerCase().includes(searchQuery.toLowerCase())
    // );
