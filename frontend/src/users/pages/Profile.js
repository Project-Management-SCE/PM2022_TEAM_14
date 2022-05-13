import React, {useEffect, useState, useContext} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {useHttpClient} from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/Error/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/Loading/LoadingSpinner";
import UsersItem from "../components/UsersItem";
import {AuthContext} from "../../shared/context/auth-context";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal/Modal";
import './Profile.css'

const Profile = () => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [userData, setUserData] = useState();
    const [showConfirm, setShowConfirm] = useState(false);
    const history = useHistory();
    const creatorId = useParams().userId;

    useEffect(()=> {
        let id = auth.userId;
        if(creatorId !== auth.userId) {
            id = creatorId;
        }
        const fetchUserData= async () => {
            try {
                const data = await  sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`,
                    'GET',
                    null,
                    {Authorization: 'Bearer ' + auth.token});
                setUserData(data.user);
            }catch (e) {
            }
        }
        fetchUserData();
    },[sendRequest])


    const openConfirmHandler = () => setShowConfirm(true);
    const closeConfirmHandler = () => setShowConfirm(false);
    const confirmDeleteHandler = async () => {
        closeConfirmHandler();
        try {
            await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}`,
                'DELETE',
                null,
                {Authorization: 'Bearer ' + auth.token}
            )
            auth.logout();
        }catch (e) {

        }
    }

    const showPostHandler = () => {
        let id = auth.userId;
        if(creatorId !== auth.userId) {
            id = creatorId;
        }
        history.push(`/${id}/posts`);
    }

    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        <Modal
            show={showConfirm}
            onCancel={closeConfirmHandler}
            header="Delete your profile?"
            contentClass="place-item-modal-content"
            footerClass="place-item-modal-actions"
            footer={
                <React.Fragment>
                    <Button inverse onClick={closeConfirmHandler}>Cancel</Button>
                    <Button  danger onClick={confirmDeleteHandler}>DELETE</Button>
                </React.Fragment>
            }>
            <p>Profile can't be restored</p>
        </Modal>
        {isLoading && <div className="center">
            <LoadingSpinner/>
        </div>}
        {!isLoading && userData && <div className={"user-profile"}>
            <UsersItem
                key={userData.id}
                id={userData.id}
                image={userData.image}
                name={userData.name}
                email={userData.email}
                postCount={userData.posts.length}/>
            <div className={"user-profile-controls"}>
                {auth.isLoggedIn && auth.userId === creatorId && <Button danger onClick={openConfirmHandler}>DELETE PROFILE</Button>}
                {auth.isLoggedIn && <Button inverse onClick={showPostHandler}>SHOW POSTS</Button>}
                {auth.isLoggedIn && <Button to={`/update/${userData.id}`}>EDIT PROFILE</Button>}
            </div>
        </div>}
    </React.Fragment>
}

export default Profile;