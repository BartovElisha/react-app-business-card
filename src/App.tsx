import { createContext, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './App.css';
import BusinessUserRegistration from './auth/BusinessUserRegistration';
import RouteGuard from './auth/RouteGuard';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import { setToken } from './auth/tokenMenagment';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './pages/About/About';
import BusinessCardRegistration from './pages/BusinessCardRegistration/BusinessCardRegistration';
import Card from './pages/Card/Card';
import FavoriteCards from './pages/FavoriteCards/FavoriteCards';
import Home from './pages/Home/Home';
import MyCards from './pages/MyCards/MyCards';
import { postRequest } from './services/apiService';

interface ISigninData {
    email: string;
    password: string;
}

interface Context {
    userName: string;
    handleSignout: Function;
    signIn: Function;
    isAdmin: boolean;
}

export const AppContext = createContext<Context | null>(null);

function App() {
    // States
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [isAdmin,setIsAdmin] = useState(false);
  

    function handleSignout() {
        // 1. Clear Local Storage
        localStorage.clear();
        // 2. Clear userName and isAdmin  
        toast.info(`User ${userName} is Signed Out !!!`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });        
        setUserName('');
        setIsAdmin(false); 
        navigate('/signin')
    }

    function signIn(data: ISigninData) {
        const res = postRequest(
            'users/login',
            data,
            false
        );
        
        if (!res) 
            return;

        res
        .then(response => response.json())
        .then(json => {
            if (json.error) {
                toast.error(json.error, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });                
                return;
            }
            toast.success(`User ${json.name} succsessifully Loged In`,{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });             
            setToken(json.token);
            localStorage.setItem('admin',json.isAdmin);
            setIsAdmin(json.isAdmin);
            setUserName(json.name);
            navigate('/mycards');
        });
    }

    return (
        <AppContext.Provider value={{
            userName,
            handleSignout,
            signIn,
            isAdmin
        }}>
            <div className="d-flex h-100 flex-column justify-content-between">
                <Navbar />
                <ToastContainer />
                <Routes>
                    <Route 
                        path="/"
                        element={<Home />}  
                    />
                    <Route
                        path="/card"
                        element={<Card />} 
                    />
                    <Route
                        path="/about"
                        element={<About />} 
                    />
                    <Route 
                        path="/signup"
                        element={<SignUp />}
                    />
                    <Route 
                        path="/businessuserregistration"
                        element={
                            <RouteGuard>
                                <BusinessUserRegistration />
                            </RouteGuard>
                        }
                    />
                    <Route
                        path="/businesscardregistration"
                        element={
                            <RouteGuard>
                                <BusinessCardRegistration />
                            </RouteGuard>
                        } 
                    />
                    <Route
                        path="/signin"
                        element={<SignIn handler={signIn} />} 
                    />
                    <Route
                        path="/mycards"
                        element={
                            <RouteGuard>
                                <MyCards />        
                            </RouteGuard>                            
                        } 
                    />                      
                    <Route
                        path="/favoritecards"
                        element={
                            <RouteGuard>
                                <FavoriteCards />
                            </RouteGuard>                            
                        } 
                    />                      
                </Routes>
                <Footer />
            </div>
        </AppContext.Provider>
    );
}

export default App;
