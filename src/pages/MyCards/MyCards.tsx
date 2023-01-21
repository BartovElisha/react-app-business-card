import { createContext, useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import BusinessCards from "../../components/BusinessCards";
import MenuBar from "../../components/MenuBar";
import Title from "../../components/Title";
import { getRequest } from "../../services/apiService";
import { IBusinessCard } from "../../types/types";

interface Context {
    myBusinessCards?: Array<IBusinessCard>; 
    delMyBusinessCard?: Function;
    editMyBusinessCard?: Function;   
}

export const BusinessCardContext = createContext<Context>({})

function MyCards() {
    // Hooks & States
    const context = useContext(AppContext);
    const [myBusinessCards, setMyBusinessCards] = useState<Array<IBusinessCard>>([]);

    function getMyBusinessCards() {
        const res = getRequest(`cards/user/${context?.user_id}`);
        
        if(!res) {
            console.log('No response...')
            return;
        }

        res
        .then(response => response.json())
        .then(json => {
            setMyBusinessCards(json);
            console.log(res);
        });
    }

    function delMyBusinessCard(myBusinessCard: IBusinessCard) {
        console.log(`Delete button pressed from ${myBusinessCard.title}`);
    }

    function editMyBusinessCard(myBusinessCard: IBusinessCard) {
        console.log(`Edit button pressed from ${myBusinessCard.title}`);
    }

    // Hook useEffect, Run getBusinessCards function only ones time then page loades.
    useEffect(getMyBusinessCards,[]);

    if (!context) {
        return <div>Error</div>
    }       

    return ( 
        <BusinessCardContext.Provider value={{ myBusinessCards, delMyBusinessCard, editMyBusinessCard }}>
            <Title 
                main="Your Cards List"
                sub="Here you can view your cards list"
            /> 
            <MenuBar />
            <BusinessCards />
        </BusinessCardContext.Provider>
    );
}

export default MyCards;