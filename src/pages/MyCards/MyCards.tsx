import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../App";
import BusinessCards from "../../components/BusinessCards";
import MenuBar from "../../components/MenuBar";
import Title from "../../components/Title";
import { getRequest } from "../../services/apiService";

function MyCards() {
    const context = useContext(AppContext);
    const updateBusinessCards = context?.updateBusinessCards || function() {}; 

    const navigate = useNavigate();

    function getBusinessCards() {
        const res = getRequest(`cards/user/${context?.user_id}`);
        
        if(!res) {
            console.log('No response...')
            return;
        }

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
            updateBusinessCards(json);
        });
    }

    // Hook useEffect, Run getBusinessCards function only ones time then page loades.
    useEffect(() => {
        if (!context?.user_id) {
            navigate('/signin');
            return;
        }
        getBusinessCards();
    },[]);

    return ( 
        <>
            <Title 
                main="Your Cards List"
                sub="Here you can view your cards list"
            /> 
            <MenuBar />
            <BusinessCards />
        </>
    );
}

export default MyCards;