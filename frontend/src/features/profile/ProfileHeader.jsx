import React from 'react';

const ProfileHeader = ({ user }) => {
  return (
    <div className="flex flex-col items-center  shadow-lg mb-4 ">
      {/* Profile Picture */}
      <div className="w-32 h-32 rounded-full bg-gray-200 flex justify-center items-center overflow-hidden m-4 border-4 border-white">
        <img
          src={user.image}
          alt={user.cust_name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-semibold">{user.cust_name}</h1>
        <p className="text-lg text-gray-600">{user.location}</p>
      </div>
    </div>
  );
};

export default ProfileHeader;