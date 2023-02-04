import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../../App";
import BusinessCards from "../../components/BusinessCards";
import MenuBar from "../../components/MenuBar";
import Title from "../../components/Title";
import { getRequest } from "../../services/apiService";
import { IBusinessCard } from "../../types/types";

function FavoriteCards() {
    const context = useContext(AppContext);
    const signedInUserId = context?.user_id; 
    const updateBusinessCards = context?.updateBusinessCards || function() {}; 
    
    function filterFavoriteCards(card: IBusinessCard) {
        // console.log(card);
        if (!signedInUserId) {
            return;
        }

        if(card.users_likes_id.includes(signedInUserId)) {
            return true;
        }
    }

    function handleFilterFavirite(cards: Array<IBusinessCard>) {
        const filteredCards = cards.filter(filterFavoriteCards);
        updateBusinessCards(filteredCards);
    }

    function getBusinessCards() {
        const res = getRequest('allcards',false);

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
            handleFilterFavirite(json);
        });
    }

    // Hook useEffect, Run getBusinessCards function only ones time then page loades.
    useEffect(getBusinessCards,[]);

    return (  
        <>
            <Title 
                main="Your Favorite Cards List"
                sub="Here you can view your favorite cards list"
            />
            <MenuBar />
            <BusinessCards />
        </>
    );
}

export default FavoriteCards;