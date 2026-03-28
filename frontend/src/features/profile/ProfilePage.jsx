import React, { useEffect, useState } from 'react';
import ProfileHeader from './ProfileHeader';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { FaCreditCard, FaHistory, FaSignOutAlt } from 'react-icons/fa'; // Icons for cards
import { useUser } from '../context/UserContext'; // Import the hook
// import ProfileEditor from './ProfileEditor';
// import Transactions from './Transactions';
// import AddCard from './AddCard';
// import Logout from './Logout';

const ProfilePage = () => {
    const { userId } = useUser();
    const fetchedUserData = {
        cust_id  : 1, 
        cust_name : "Rowayne Siah", 
        cust_login : "Rowayne6969",
        cust_password : "999999"
    
    }
    const [user, setUser] = useState({});
    const [error, setError] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async() => {
            try {
                //const fetchedUser = await merchantsService.getAllMerchantNames();
                //const fetchedUserData = fetchedMerchants.data.userProfile
                console.log(fetchedUserData)
                setUser(fetchedUserData)
            }catch(err) {
                setError('Failed to fetch User')
                console.error('Error fetching User :', err);
            } finally {
                setLoading(false);
            }     
        }

        fetchUser()
    }, []);
    
    // const handleSave = (newName, newEmail) => {
    //     setUser(newName);
    //     setEmail(newEmail);
    //     // Here you can send the updated profile data to your backend
    // };
    if(loading) return <div>Loading....</div>
    if(error) return <div>(error)</div>

    return (
        <div className="container mx-auto p-5 space-y-3 pb-20">
            {/* Profile Header */}
            <ProfileHeader user={user} />   
            
           {/* Action List - Two columns for all devices */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-3 ">
                {/* Edit Profile */}
                <Link to="/edit-profile">
                    <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer transition-all w-full h-[115px]">
                        <FaHistory className="w-8 h-8 text-indigo-600 mr-4" />
                        <span className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 text-center">Edit Profile</span>
                    </div>
                </Link>
          
                {/* View Transactions */}
                <Link to="/transactions">
                    <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer transition-all w-full h-[115px]">
                        <FaHistory className="w-8 h-8 text-indigo-600 mr-4" />
                        <span className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 text-center">View Transactions</span>
                    </div>
                </Link>

                {/* Add Payment Card */}
                <Link to="/add-card">
                    <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer transition-all w-full h-[115px]">
                        <FaCreditCard className="w-8 h-8 text-green-600 mr-4" />
                        <span className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 text-center">Add Payment Card</span>
                    </div>
                </Link>

                {/* Log Out */}
                <Link to="/logout">
                    <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:bg-gray-100 cursor-pointer transition-all w-full h-[115px]">
                        <FaSignOutAlt className="w-8 h-8 text-red-600 mr-4" />
                        <span className="text-sm sm:text-lg md:text-xl font-semibold text-gray-800 text-center">Log Out</span>
                    </div>
                </Link>
            </div>



            

          
        </div>
            

   
        
    );
};

export default ProfilePage;