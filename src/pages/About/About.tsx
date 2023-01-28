import Title from "../../components/Title";

function About() {
    return (  
        <>
            <Title
                main="About Us"
                sub="Here you will find an explanation of how to interface with the application." 
            />
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-8">
                        <p className="fs-4 fw-lighter">
                            After the short registration as business user, you can create a card for your business, publish it in the app, edit or delete it if nessary. Other users will be able to see your business details and contact you with the details you provide on your business card.
                        </p>
                    </div>
                    <div className="col-6 col-md-4">
                        <div className="container mb-5">
                            <div className="card">
                                <img 
                                    src="https://cdn.pixabay.com/photo/2016/11/11/10/09/app-1816210_1280.jpg" 
                                    className="card-img-top rounded img-fluid img-thumbnail"
                                    alt="Img Title"/>  
                                <div className="card-body">
                                    <p><strong>Description: </strong>Businnes card description</p>
                                    <p><strong>Address: </strong>Businnes card address</p>
                                    <p><strong>Phone: </strong>Businnes card phone number</p>
                                    <p><strong>Card Number: </strong>Businnes card number</p>
                                    <hr />
                                    <div className="d-flex justify-content-evenly">
                                        <button 
                                            className="btn btn-default"
                                        >
                                        <i className="bi bi-pen"></i>
                                        </button>
                                        <button 
                                            className="btn btn-default"
                                        >
                                        <i className="bi-hand-thumbs-up"></i>
                                        </button> 
                                        <button 
                                            className="btn btn-default"
                                        >
                                        <i className="bi bi-house-door"></i>
                                        </button>                            
                                    </div>  
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default About;