import { NavLink } from "react-router-dom";

function Navbar() {
    return (  
        <header>
            <nav className="navbar navbar-dark bg-dark">
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
                    </ul>
                    <ul className="navbar-nav flex-row mb-2 mb-lg-0">
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
                            >Business                                
                            </NavLink>
                        </li>
                        <li className="nav-item me-3">
                            <NavLink
                                className="nav-link"
                                aria-current="page"
                                to="/signout"
                            >Signout                                
                            </NavLink>
                        </li>
                    </ul>
                </div>                
            </nav>
        </header>
    );
}

export default Navbar;