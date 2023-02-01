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
import BusinessCard from './pages/BusinessCard/BusinessCard';
import BusinessCardRegistration from './pages/BusinessCardRegistration/BusinessCardRegistration';
import Edit from './pages/Edit/Edit';
import FavoriteCards from './pages/FavoriteCards/FavoriteCards';
import Home from './pages/Home/Home';
import MyCards from './pages/MyCards/MyCards';
import { deleteRequest, postRequest } from './services/apiService';
import { IBusinessCard } from './types/types';

interface Context {
    userName: string;
    user_id: string;
    isAdmin: boolean;
    cardsDisplayMode: string;
    businessCards: Array<IBusinessCard>;
    filteredBusinessCards: Array<IBusinessCard>;
    handleSignout: Function;
    signIn: Function;    
    handleCardsDisplayMode: Function;
    delBusinessCard: Function;
    updateBusinessCards: Function;
    searchBusinessCard: Function;     
}

interface ISigninData {
    email: string;
    password: string;
}

export const AppContext = createContext<Context | null>(null);

function App() {
    // States
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>('');
    const [user_id, setUser_id] = useState<string>('');
    const [isAdmin,setIsAdmin] = useState<boolean>(false);
    const [cardsDisplayMode, setCardsDisplayMode] = useState<string>('col-12 col-md-6 col-lg-4');
    const [businessCards, setBusinessCards] = useState<Array<IBusinessCard>>([]);
    const [filteredBusinessCards, setFilteredBusinessCards] = 
        useState<Array<IBusinessCard>>([...businessCards]);

    function handleCardsDisplayMode(displayType: string)
    {
        setCardsDisplayMode(displayType);
    }

    function handleSignout() {
        // 1. Clear Local Storage
        localStorage.clear();
        // 2. Clear userName and isAdmin  
        toast.info(`See You Later ${userName}`, {
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
        setUser_id('');
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
            toast.success(`Welcome ${json.name}`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });            
            
            setToken(json.token);
            localStorage.setItem('admin',json.isAdmin);
            setIsAdmin(json.isAdmin);
            setUserName(json.name);
            setUser_id(json.id);
            navigate('/');
        });
    }

    function delBusinessCard(businessCard: IBusinessCard) {
        const res = deleteRequest(
            `cards/${businessCard._id}`            
        );
        if (!res) {
            return;
        }

        res
        .then(response => response.json())
        .then(json => {
            const updated = [...businessCards].filter(
                businessCardItem => businessCardItem._id !== businessCard._id
            );
            toast.info(`Business Card ${json.title} was deleted`,{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            }); 
            setBusinessCards(updated);
            setFilteredBusinessCards(updated);
        });        
    }

    function updateBusinessCards(cards: Array<IBusinessCard>) {
        setBusinessCards(cards);   
        setFilteredBusinessCards(cards);
    }   
    
    function searchBusinessCard(cards: Array<IBusinessCard>) {
        setFilteredBusinessCards(cards);
    }
    
    return (
        <AppContext.Provider value={{
            userName,
            user_id,
            isAdmin,
            cardsDisplayMode,
            businessCards,
            filteredBusinessCards,
            handleSignout,
            signIn,
            handleCardsDisplayMode,
            delBusinessCard,
            updateBusinessCards,
            searchBusinessCard                                      
        }}>
            <div className="d-flex h-100 flex-column justify-content-between">
                <Navbar />
                <ToastContainer />
                <Routes>
                    <Route 
                        path="/"
                        element={
                            <Home />
                        }  
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
                        element={<BusinessUserRegistration />}
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
                    <Route 
                        path="/edit/:id"
                        element={
                            <RouteGuard>
                                <Edit />
                            </RouteGuard>
                        }
                    />       
                    <Route
                        path="/card/:id"
                        element={
                            <RouteGuard>
                                <BusinessCard />
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
