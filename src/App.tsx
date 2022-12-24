import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import BusinessUserRegistration from './auth/BusinessUserRegistration';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './pages/About/About';
import BusinessCardRegistration from './pages/BusinessCardRegistration/BusinessCardRegistration';
import Card from './pages/Card/Card';
import FavoriteCards from './pages/FavoriteCards/FavoriteCards';
import Home from './pages/Home/Home';
import MyCards from './pages/MyCards/MyCards';

function App() {
  return (
    <>
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
                element={<BusinessUserRegistration />}
            />
            <Route
                path="/businesscardregistration"
                element={<BusinessCardRegistration />} 
            />
            <Route
                path="/signin"
                element={<SignIn />} 
            />
            <Route
                path="/mycards"
                element={<MyCards />} 
            />                      
            <Route
                path="/favoritecards"
                element={<FavoriteCards />} 
            />                      
        </Routes>
        <Footer />
    </>
  );
}

export default App;
