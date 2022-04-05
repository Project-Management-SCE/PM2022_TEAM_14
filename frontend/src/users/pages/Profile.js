import React, {useEffect, useState, useContext} from "react";
import {useHttpClient} from "../../shared/hoooks/http-hook";
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

    useEffect(()=> {
        const fetchUserData= async () => {
            try {
                const data = await  sendRequest(`http://localhost:5000/api/users/${auth.userId}`,
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
            await sendRequest(`http://localhost:5000/api/users/${auth.userId}`,
                'DELETE',
                null,
                {Authorization: 'Bearer ' + auth.token}
            )
            auth.logout();
        }catch (e) {

        }
    }

    return <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
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
        </div>}
    </React.Fragment>
}

export default Profile;