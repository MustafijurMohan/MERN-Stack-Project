import { createContext, useContext, useEffect, useState } from "react"; 



export const AuthContext = createContext()
export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [services,setServices]=useState("")
    const authorizationToken =`${token}`


    const storeTokenLS = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem('token', serverToken)
    }

    const isLoggedIn = !!token

    // tackling the logout functionality
    const LogoutUser = () => {
        setToken("")
        return localStorage.removeItem("token")
    }

    // JWT AUTHENTICATION - to get the currently loggedIN user data
    const userAuthentication = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`http://localhost:3000/api/v1/user`, {
                method: 'GET',
                headers: {
                    Authorization : authorizationToken
                }
            })
            if (response.ok) {
                    const data = await response.json()
                    // console.log( 'user data ===> ',data.data)
                    setUser( data.data)
                    setIsLoading(false)
            }
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetch user data')
        }
    }

    // to fetch the data from database
    const getServices = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/service`, {
                method: "GET"
            })
            if (response.ok) {
                const data = await response.json()
                // console.log(data.data)
                setServices(data.data)
            }
        } catch (error) {
            console.log(`Services fronted error ${error}`)
        }
    }


    useEffect(() => {
        getServices()
        userAuthentication()
    }, [])
    

    
    return (
        <AuthContext.Provider value={{storeTokenLS, LogoutUser, isLoggedIn, user, services, authorizationToken, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const authContextValue = useContext(AuthContext)
    if (!authContextValue) {
        throw new Error('useAuth used outside of the Provider')
    }
    return authContextValue
}
