import React, {createContext, useState, useEffect, useContext} from "react";
import userStorage from "../utils/userStorage";

const UserContext = createContext()
const getUserId = userStorage.getUserId

export const UserProvider = ({children}) => {
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        setUserId(getUserId())
    }, []);

    return (
        <UserContext.Provider value = {{userId,setUserId}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);