import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
const UserContext = createContext({
    currentUser: null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
   const navigate = useNavigate();
   
    useEffect(() => {
    }, []);

    const logout = () => {
        localStorage.removeItem("social-app-token");
        setCurrentUser(null);
        navigate("/");
    };

    const values = {
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
        logout,
    };
    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
        );
}   

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
    const context = useContext(UserContext);
    return context;
};

export default UserProvider;