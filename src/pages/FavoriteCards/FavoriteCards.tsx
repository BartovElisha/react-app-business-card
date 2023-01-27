import MenuBar from "../../components/MenuBar";
import Title from "../../components/Title";

function FavoriteCards() {
    return (  
        <>
            <Title 
                main="Your Favorite Cards List"
                sub="Here you can view your favorite cards list"
            />
            <MenuBar />
            {/* <BusinessCards /> */}
        </>
    );
}

export default FavoriteCards;