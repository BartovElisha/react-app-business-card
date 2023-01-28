import Title from "../../components/Title";

function BusinessCard() {
    // const { id } = useParams();  // Custom Hook "useParams"
    // const context = useContext(AppContext);
    // states
    // const [title, setTitle] = useState<string>('');
    // const [subTitle, setSubTitle] = useState<string>('');
    // const [description, setDescription] = useState<string>('');
    // const [address, setAddress] = useState<string>('');
    // const [phone, setPhone] = useState<string>('');
    // const [image, setImage] = useState<string>('');

    // if (!context) {
    //     return <div>Error</div>
    // }    

    // const filteredBusinessCards = context?.filteredBusinessCards || [];  

    // if (filteredBusinessCards.length > 0) {
    //     console.log(filteredBusinessCards);
    //     const businessCard = [...filteredBusinessCards].filter(card => 
    //         (card._id.toString().includes(id.toString())));
    //     console.log(businessCard);    
    //     // setTitle('');  
    // }       
    // console.log(title);

    // useEffect(() => {
    //     const filteredBusinessCards = context?.filteredBusinessCards || []; 

    //     if (filteredBusinessCards.length > 0) {
    //         console.log(filteredBusinessCards);
    //         const businessCard = [...filteredBusinessCards].filter(card => 
    //             (card._id.toString().includes(id.toString())));
    //         console.log(businessCard);    
    //         // setTitle('');  
    //     }           
        
    // },[id])

    return (
        <>
            <Title 
                // main={title}
                main="{businessCard.title}"
                sub="Here you can update the business card"                
            />
        </>
    );
}

export default BusinessCard;