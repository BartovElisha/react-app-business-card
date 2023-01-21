import { createContext, useEffect, useState } from "react";
import BusinessCards from "../../components/BusinessCards";
import MenuBar from "../../components/MenuBar";
import Title from "../../components/Title";
import { getRequest } from "../../services/apiService";
import { IBusinessCard } from "../../types/types";

interface Context {
    businessCards?: Array<IBusinessCard>; 
    delBusinessCard?: Function;
    editBusinessCard?: Function;   
}

export const BusinessCardContext = createContext<Context>({})

function Home() {
    // States
    const [businessCards, setBusinessCards] = useState<Array<IBusinessCard>>([]);

    function getBusinessCards() {
        const res = getRequest('cards');

        if(!res) {
            console.log('No response...')
            return;
        }

        res
        .then(response => response.json())
        .then(json => {
            setBusinessCards(json);
        });
    }

    function delBusinessCard(businessCard: IBusinessCard) {
        console.log(`Delete button pressed from ${businessCard.title}`);
    }

    function editBusinessCard(businessCard: IBusinessCard) {
        console.log(`Edit button pressed from ${businessCard.title}`);
    }    

    // Hook useEffect, Run getBusinessCards function only ones time then page loades.
    useEffect(getBusinessCards,[]);

    return (  
        <BusinessCardContext.Provider value={{ businessCards, delBusinessCard, editBusinessCard }}>
            <Title 
                main="Business Card App"
                sub="Here you will find business cards."
            />
            <MenuBar />
            <BusinessCards />
        </BusinessCardContext.Provider>
    );
}

export default Home;