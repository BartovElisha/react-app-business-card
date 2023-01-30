import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../App";
import SignOut from "../auth/SignOut";
import User from "./User";

function Navbar() {
    const context = useContext(AppContext);
    if (!context) {
        return <div>Error</div>;
    }

    const isSignedIn = context && context.userName.length > 0;

    return (  
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <NavLink 
                        className="navbar-brand" 
                        to="/">
                        <i className="bi bi-person-vcard me-2"></i>
                        Businiss Cards App
                    </NavLink>
                    <ul className="navbar-nav flex-row me-auto mb-2 mb-lg-0">
                        <li className="nav-item me-3">
                            <NavLink 
                                className="nav-link"
                                aria-current="page"
                                to="/about"
                            >About
                            </NavLink>
                        </li>                        
                        <li className="nav-item me-3">
                            <NavLink 
                                className="nav-link"
                                aria-current="page"
                                to="/mycards"
                            >My Cards
                            </NavLink>
                        </li>
                        <li className="nav-item me-2">
                            <NavLink 
                                className="nav-link"
                                aria-current="page"
                                to="/favoritecards"
                            >My Favorite Cards
                            </NavLink>
                        </li>
                        <span className="btn text-light">
                            <User />
                        </span>                        
                    </ul>
                    <ul className="navbar-nav flex-row mb-2 mb-lg-0">
                        {
                            !isSignedIn &&
                            <>
                                <li className="nav-item me-3">
                                    <NavLink
                                        className="nav-link"
                                        aria-current="page"
                                        to="/signin"
                                    >Signin                                
                                    </NavLink>
                                </li>
                                <li className="nav-item me-3">
                                    <NavLink
                                        className="nav-link"
                                        aria-current="page"
                                        to="/signup"
                                    >Signup                                
                                    </NavLink>
                                </li>
                                <li className="nav-item me-3">
                                    <NavLink
                                        className="nav-link"
                                        aria-current="page"
                                        to="/businessuserregistration"
                                    >Business User                               
                                    </NavLink>
                                </li>
                            </>
                        }
                        {
                            isSignedIn &&
                            <>
                                <li className="nav-item me-3">
                                    <NavLink
                                        className="nav-link"
                                        aria-current="page"
                                        to="/businesscardregistration"
                                    >Business Card                                
                                    </NavLink>
                                </li>                            
                                <li className="nav-item me-3">
                                    <SignOut />
                                </li>
                            </>
                        }
                    </ul>
                </div>                
            </nav>
        </header>
    );
}

export default Navbar;