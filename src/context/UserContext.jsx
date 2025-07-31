import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { backendClient } from "../clients/backendClient";
const UserContext = createContext({
    currentUser: null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("social-app-token"))
        //console.log(token, "from userContext")
        if (token) {
            backendClient.get("/projects", {
                headers: {
                    Authorization: `Bearer ${JSON.parse(
                        localStorage.getItem("social-app-token")
                    )}`,
                },
            }).then((res) => { setCurrentUser(res.data) })
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("social-app-token");
        localStorage.removeItem("user-info");
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