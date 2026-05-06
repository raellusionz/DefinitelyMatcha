import React, {useEffect, useState}from "react";
import { useNavigate } from "react-router-dom";
import MerchWelcomeBanner from "./MerchWelcomeBanner"
import MerchStoreStatusCard from './MerchStoreStatusCard'
import MerchStatsRow from "./MerchStatsRow";
import MerchantService from "../merchant/merchMerchantsService";
import MerchCloseStoreModal from './MerchCloseStoreModal'
import MerchNavCards from "./MerchNavCards";

const MerchHomePage = () => { 

    const navigate = useNavigate();
    const merchant_id = 1
    const [merchant, setMerchant] = useState({ 
            name: "Rowayne's Matcha",
            reviews: 4.5,  // Number of reviews
            rating: 120  // Star rating
    });
    const [isOpen, setIsOpen] = useState(null)
    const [showConfirm, setShowConfirm] = useState(false);
    const [error,setError] = useState(null)

    const handleToggle = async () => {
        if (isOpen) {
            setShowConfirm(true);
            return;
        }

        const newStatus = true;

        try {
            await MerchantService.handleOpenClosePg(
                merchant_id,
                newStatus
            );

            setIsOpen(newStatus);
        } catch (error) {
            setError("Failed to update Merchant Active Status");
            console.error("Error updating Merchant Active Status:", error);
        }
    };

    const handleConfirmClose = async () => {
        const newStatus = false;
        try {
            console.log(merchant_id)
            console.log(newStatus)
            await MerchantService.handleOpenClosePg(
                merchant_id,
                newStatus
            )
            setIsOpen(false)
            setShowConfirm(false)
            
        } catch (error) {
            setError('Failed to update Merchant Active Status')
            console.error('Error updating Merchant Active Status :', error);
        }
    }

    const handleCancelClose = () => {
        setShowConfirm(false);
    }

    const fetchMerchant = async () => {
        try{
            const fetchedMerchant = await MerchantService.getOneMerchantPg(merchant_id);
            console.log(fetchedMerchant)
            const fetchedMerchantData = fetchedMerchant.data.singleMerchantInfo
            console.log(fetchedMerchantData)
            setMerchant ({
                name : fetchedMerchantData.merchant_brand_name,
                review : 4.5,
                rating : 120
            })

            setIsOpen(fetchedMerchantData.merchant_active_status)

        } catch(error) {
            setError('Failed to fetch Merchant Name')
            console.error('Error fetching Merchant Nam :', error);
        }
    }

    // Navigation handler — swap out with your router e.g. navigate("/products")
    const handleNavigate = (path) => {
        console.log("Navigate to:", path);
        navigate(path)
    }

    useEffect(() => {
        fetchMerchant()
    }, []); 

    return (
        
        <div className="container mx-auto p-4 bg-purple pb-24 " >
            <MerchWelcomeBanner 
                name= {merchant.name} 
            />
            <MerchStoreStatusCard
                isOpen={isOpen}
                onToggle={handleToggle}
            />
            <MerchStatsRow 
                merchant_id = {merchant_id}
            />
            <MerchNavCards
                onNavigate={handleNavigate} 
            />

            {showConfirm && (
                <MerchCloseStoreModal
                    onCancel={handleCancelClose}
                    onConfirm={handleConfirmClose}
                />
            )}


        </div>



    );
}

export default MerchHomePage