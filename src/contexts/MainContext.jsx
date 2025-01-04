import { useState,createContext, useEffect } from "react";
import api from "../services/api";


const MainContext = createContext();

const MainProvider = ({ children }) => {
    const [patient, setPatient] = useState({});
    const [doctor, setDoctor] = useState({});
    const [user, setUser] = useState({});
    const [token, setToken] = useState(getCookie("token"));

    
    //get token stored in coockie

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    //useEffect to get user data when token is available
    useEffect(() => {
                //request to get user authentiticated
                const fetchUser = async () => {
                    if(token) {
                    try {
                        const response = await api.get(`/user`, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            }
                        });
                        setUser(response.data);
                    } catch (error) {
                        console.error("Error fetching user data: ", error);
                    }
                }
                };

                fetchUser();
            
            
    }, [token]);

    return (
        <MainContext.Provider value={{ patient, setPatient, doctor, setDoctor, user, setUser,token,setToken }}>
            {children}
        </MainContext.Provider>
    );
}

export {MainContext, MainProvider};