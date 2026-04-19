import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/userContext';

const ProfilePage = () => {
  const { userId } = useUser();
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUserData = {
          cust_id: userId,
          cust_name: 'Rowayne Siah',
          cust_login: 'Rowayne6969',
        };
        setUser(fetchedUserData);
      } catch (err) {
        setError('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const initials = user.cust_name
    ? user.cust_name.split(' ').map(n => n[0]).join('')
    : '?';

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-48 gap-3">
      <div className="w-9 h-9 rounded-full border-[2.5px] border-transparent border-t-gray-900 border-b-gray-200 animate-spin" />
      <p className="text-sm text-gray-400">Loading profile...</p>
    </div>
  );

  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-white pb-24">

      {/* Avatar + name */}
      <div className="flex flex-col items-center mt-5 px-5 pt-6 pb-7">
        <div className="w-20 h-20 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-2xl font-medium text-gray-500 mb-4">
          {initials}
        </div>
        <p className="text-xl font-medium text-gray-900">{user.cust_name}</p>
        <p className="text-sm text-gray-400 mt-1">@{user.cust_login}</p>
      </div>

      {/* Stats row */}
      <div className="mx-5 flex border border-gray-100 rounded-xl overflow-hidden mb-6">
        {[
          { label: 'Orders', value: '12' },
          { label: 'Cards', value: '3' },
          { label: 'Spent', value: '$248' },
        ].map((stat, i, arr) => (
          <div key={stat.label} className={`flex-1 py-4 text-center ${i < arr.length - 1 ? 'border-r border-gray-100' : ''}`}>
            <p className="text-lg font-medium text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wide mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Account section */}
      <div className="px-5 mb-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2 pl-1">Account</p>
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <MenuRow to="/edit-profile" icon={<UserIcon />} title="Edit profile" sub="Name, username, photo" />
          <MenuRow to="/add-card" icon={<CardIcon />} title="Payment cards" sub="Add or remove cards" divider />
          <MenuRow to="/transactions" icon={<HistoryIcon />} title="Transaction history" sub="View past orders" divider />
        </div>
      </div>

      {/* Session section */}
      <div className="px-5">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2 pl-1">Session</p>
        <div className="border border-gray-100 rounded-xl overflow-hidden">
          <MenuRow to="/logout" icon={<LogoutIcon />} title="Log out" danger />
        </div>
      </div>
    </div>
  );
};

const MenuRow = ({ to, icon, title, sub, danger, divider }) => (
  <Link to={to}>
    <div className={`flex items-center gap-4 px-4 py-4 bg-white hover:bg-gray-50 transition-colors ${divider ? 'border-t border-gray-100' : ''}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${danger ? 'bg-red-50' : 'bg-gray-100'}`}>
        <span className={danger ? 'text-red-500' : 'text-gray-500'}>{icon}</span>
      </div>
      <div className="flex-1">
        <p className={`text-sm ${danger ? 'text-red-500' : 'text-gray-900'}`}>{title}</p>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={danger ? 'text-red-400' : 'text-gray-300'}>
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </div>
  </Link>
);

const UserIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const CardIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
  </svg>
);

const HistoryIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const LogoutIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

export default ProfilePage;