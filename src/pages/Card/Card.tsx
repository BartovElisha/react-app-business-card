function Card() {
    return (  
        <div className="col">
            <div className="card mt-4">
                <img src="url" className="card-img-top rounded" alt="alt" />  
                <div className="card-body">
                    <h5 className="card-title text-start">Card Title</h5>
                    <span className="text-muted">Card SubTitle</span>
                    <hr />
                    <p><strong>Phone:</strong></p>
                    <p><strong>Address:</strong></p>
                    <p><strong>Card Number:</strong></p>
                    <div className="d-flex justify-content-evenly">
                        <button className="btn btn-default">
                            <i className="bi-pen"></i>
                        </button>
                        <button className="btn btn-default">
                            <i className="bi-trash"></i>
                        </button>
                        <button className="btn btn-default">
                            <i className="bi-hand-thumbs-up"></i>
                            {/* <i className="bi-hand-thumbs-up-fill"></i> */}
                        </button>                          
                    </div>
                </div>  
            </div>
        </div>
    );
}

export default Card;