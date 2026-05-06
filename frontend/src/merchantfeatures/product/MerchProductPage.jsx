import React, {useEffect,useState}from "react";
import merchantProductService from "./MerchProductService";
import MerchantService from "../merchant/merchMerchantsService";
import ProductListing from "./MerchProductListing";
import ProductModal from "./MerchProductModal";
import { useParams } from "react-router-dom";

const ProductsPage = () => {
    const merchant_id = 1
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState([])
    const [products, setProducts] = useState([])
    const [merchant, setMerchant] = useState({ 
        name: "",
        reviews: 4.5,  // Number of reviews
        rating: 120  // Star rating
    });
    const [searchQuery, setSearchQuery] = useState(''); // State to store search input
    const [loading, setLoading] = useState(true);  // Loading state for handling fetch delays
    const [error, setError] = useState(null); 

    const fetchProducts = async() => {
        if (!merchant_id) return; 
        setLoading(true)
        try {
            console.log(merchant_id)
            const fetchedProducts = await merchantProductService.getSingleMerchantProductsPg(merchant_id);
            //console.log(fetchedProducts)
            const fetchedProductsData = fetchedProducts.data.singleMerchantProducts
            // console.log(fetchedProductsData)
            setProducts(fetchedProductsData)
            // console.log(fetchedProductsData)
        } catch(err) {
            setError('Failed to fetch products')
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    }; 

    const fetchMerchantName = async() => {
        if (!merchant_id) return; 
        
        try {
            const fetchedMerchant = await MerchantService.getOneMerchantPg(merchant_id);
            //console.log(fetchedMerchant)
            const fetchedMerchantData = fetchedMerchant.data.singleMerchantInfo
            // console.log(fetchedMerchantData.merchant_brand_name)
            setMerchant({
                name: fetchedMerchantData.merchant_brand_name,
                reviews: 4.5,  // Number of reviews
                rating: 120  // Star rating
            });
            // console.log(fetchedProductsData)
        } catch(err) {
            setError('Failed to fetch Merchant Name')
            console.error('Error fetching Merchant Nam :', err);
        } finally {
            setLoading(false);
        }
    }; 


    useEffect(() => {
        fetchMerchantName()
        fetchProducts()
    }, []);

    if(loading) return (
        <div className="flex flex-col items-center
            justify-center h-48 gap-3">
        <div className="w-9 h-9 rounded-full
            border-[2.5px] border-transparent
            border-t-gray-900 border-b-gray-200
            animate-spin" />
        <p className="text-sm text-gray-400">
            Loading Products...
        </p>
        </div>
    )

    if(error) return <div>(error)</div>

    
    // Filter products based on search query
    const filteredProducts = products.filter(product =>
        product.pdt_name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handleNewProductModalClick = () => {
        setSelectedProduct(null)
        setModalOpen(true)
    }

    const closeNewProductModalClick = () => {
        setSelectedProduct(null)
        setModalOpen(false)
    }

    const handleEditProductModalClick = (product) => {
        setSelectedProduct(product)
        setModalOpen(true)
    }

    const handleProductAdded = (savedProduct) => {
        if (!savedProduct) {
            fetchProducts();
            return;
        }

        setProducts((prev) => {
        const exists = prev.some(
            (p) => p.merchant_pdt_id === savedProduct.merchant_pdt_id
        );

        if (exists) {
            return prev.map((p) =>
            p.merchant_pdt_id === savedProduct.merchant_pdt_id
                ? savedProduct
                : p
            );
        }

        return [...prev, savedProduct];
        });
    };

    

    return (
     <div className="bg-white">
      <div className="container mx-auto p-4 bg-purple pb-20" >

        {/* Merchant section with padding and margin */}
        <div className="container mx-auto p-3 bg-white rounded-xl shadow-lg mt-1 mb-5"> {/* Gap Between Search Bar and Merchant Bar*/}
          <div className="flex items-center space-x-4"> {/* Align image and name on the same line */}
            <img
              src={merchant.image}
              alt={merchant.name}
              className="w-16 h-16 object-cover rounded-full"
            />
            <div>
              <h1 className="text-3xl text-left text-black font-bold mb-3 mt-3">{merchant.name}</h1>

              {/* Star rating and number of reviews displayed inline */}
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 17.75l-5.42 3.32a1 1 0 0 1-1.56-1.05l1.04-5.91-4.3-4.18a1 1 0 0 1 .56-1.71l5.94-.87 2.63-5.33a1 1 0 0 1 1.81 0l2.63 5.33 5.94 .87a1 1 0 0 1 .56 1.71l-4.3 4.18 1.04 5.91a1 1 0 0 1-1.56 1.05L12 17.75z"/>
                </svg>
                <span className="ml-2 mt-1 text-gray-600">
                    {merchant.rating} ({merchant.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>



        {/* Search Bar */}
        <div className="relative flex items-center mb-4">

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
                className="w-full pl-10 pr-16 py-2 border rounded-md text-sm"
                placeholder="Search for Products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update state when user types
            />
            </div>

            <button
                onClick={handleNewProductModalClick}
                className="mb-4 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium"
            >
                    + Add Product
            </button>

            {/* Pass mock products to ProductListing */}
            <ProductListing 
                products={filteredProducts}
                handleEditClick={handleEditProductModalClick}
            /> 

            <ProductModal
                isOpen = {modalOpen}
                onClose = {closeNewProductModalClick}
                merchant_id = {merchant_id}
                onProductAdded={handleProductAdded} 
                productToEdit = {selectedProduct} 
            />
        </div>
        </div>
  );

}

export default ProductsPage;


// const addItemToCart = async (merchant_pdt_id, action) => {

//         const itemToAdd = products.find(item => item.merchant_pdt_id === merchant_pdt_id)

//         if(itemToAdd) {
//             await cartService.addItemToCartPg(
//                 cust_id,
//                 merchant_id, 
//                 itemToAdd.merchant_pdt_id, 
//                 itemToAdd.pdt_name, 
//                 itemToAdd.pdt_price

//             )
//         }
        
//     }