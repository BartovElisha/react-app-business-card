import BusinessCards from "../../components/BusinessCards";
import MenuBar from "../../components/MenuBar";
import Title from "../../components/Title";

function MyCards() {
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