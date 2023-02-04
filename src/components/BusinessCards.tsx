import { useContext } from "react";
import { AppContext } from "../App";
import Card from "./Card";

function BusinessCards() {
    const context = useContext(AppContext);

    if (!context) {
        return <div>Error</div>;
    }
    const filteredBusinessCards = context.filteredBusinessCards || [];

    return (        
        <div className="container mb-5">
            <div className="row g-4 m-auto">
                {
                    filteredBusinessCards.length === 0 &&
                    <div className ="alert alert-warning text-center" role="alert">
                        No Business Cards Founds !!!
                    </div>
                }
                {
                    filteredBusinessCards.length > 0 && 
                    filteredBusinessCards.map((card) => 
                        <Card 
                            key={card._id}
                            {...card}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default BusinessCards;