import React, {useState, useContext} from "react";
import Card from "../../shared/components/UIElements/Card/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal/Modal";

import {AuthContext} from "../../shared/context/auth-context";

import './PostItem.css'
import {useHttpClient} from "../../shared/hoooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/Error/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/Loading/LoadingSpinner";
import {useHistory} from "react-router-dom";



const AdminPostItem = props => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const auth = useContext(AuthContext);
    const [showConfirm, setShowConfirm] = useState(false);




    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />



                <Card className='place-item-content'>
                    {isLoading && <LoadingSpinner asOverlay/>}
                    <div className='place-item-info'>
                        <h2>{props.title}</h2>
                        <p>{props.description}</p>
                    </div>
                    <div className='place-item-image'>
                        <img src={props.image} alt={props.title}/>
                    </div>
                </Card>
        </React.Fragment>
    )
}

export default AdminPostItem;