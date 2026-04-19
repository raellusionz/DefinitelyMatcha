import React, {createContext, useState, useEffect, useContext} from "react";
import userStorage from "../utils/userStorage";

const UserContext = createContext()
const getUserId = userStorage.getUserId

export const UserProvider = ({children}) => {
    const [userId, setUserId] = useState(null)
    const [userRole, setUserRole] = useState(null);
    const [userLoading, setUserLoading] = useState(true); // add this

    useEffect(() => {
        const fetchedUserId = getUserId(); // Get user ID from storage
        const role = userStorage.getUserRole();
        setUserId(fetchedUserId);
        setUserRole(role);
        setUserLoading(false); // 👈 this must be here
    }, []);

    return (
        <UserContext.Provider value = {{userId, setUserId, userRole, setUserRole, userLoading}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);