import { useContext } from "react";
import Card from "../pages/Card/Card";
import { BusinessCardContext } from "../pages/Home/Home";

function BusinessCards() {
    const context = useContext(BusinessCardContext);
    const businessCards = context.businessCards || [];
    const delBusinessCard = context.delBusinessCard || function () {} ;
    const editBusinessCard = context.editBusinessCard || function () {} ;

    return (
        <div className="d-flex justify-content-around">
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
    );
}

export default BusinessCards;