import { useContext } from "react";
import { AppContext } from "../App";

function SignOut() {
    const context = useContext(AppContext);

    if (!context)
        return <div>Error</div>;

    return (  
        <>
            <button
                className="btn btn-link nav-link"
                onClick={(e) => context.handleSignout(e)}
            >
                Signout    
            </button>      
        </>
    );
}

export default SignOut;