import { useContext } from "react";
import Card from "../pages/Card/Card";
import { BusinessCardContext } from "../pages/Home/Home";

function BusinessCards() {
    const context = useContext(BusinessCardContext);
    const businessCards = context.businessCards || [];
    const delBusinessCard = context.delBusinessCard || function () {} ;
    const editBusinessCard = context.editBusinessCard || function () {} ;

    return (        
        <div className="container">
            <div className="row g-3">
                {
                    businessCards.map((card) => 
                        <Card 
                            key={card._id}
                            {...card}
                            handleDeleteCard={() => delBusinessCard(card)}
                            handleEditCard={() => editBusinessCard(card)}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default BusinessCards;