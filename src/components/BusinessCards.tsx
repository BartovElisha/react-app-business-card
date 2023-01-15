import { useContext } from "react";
import Card from "../pages/Card/Card";
import { BusinessCardContext } from "../pages/Home/Home";

function BusinessCards() {
    const context = useContext(BusinessCardContext);
    const businessCards = context.businessCards || [];
    const delBusinessCard = context.delBusinessCard || function () {} ;
    const editBusinessCard = context.editBusinessCard || function () {} ;

    console.log(businessCards);

    return (
        <div className="d-flex justify-content-around">
            <Card />
            <Card />
            <Card />
        </div>
    );
}

export default BusinessCards;