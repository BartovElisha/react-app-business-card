function MenuBar() {
    return (  
        <div className="d-flex p-4">
            <div className="d-flex align-items-center mx-auto w-50">
                <button
                    className="btn mx-1"
                >
                    <i className="bi-grid-3x3-gap"></i>
                </button>
                <button
                    className="btn btn-sucess mx-1"
                >
                    <i className="bi-list-task"></i>
                </button>
                <input
                    className="form-control ms-3"
                    placeholder="Enter business name or number"
                ></input>
            </div>
        </div>    
    );
}

export default MenuBar;