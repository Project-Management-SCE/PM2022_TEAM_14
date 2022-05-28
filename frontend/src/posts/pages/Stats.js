import React, {useContext, useEffect, useState} from "react";
import LoadingSpinner from "../../shared/components/UIElements/Loading/LoadingSpinner";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {AuthContext} from "../../shared/context/auth-context";
import Card from "../../shared/components/UIElements/Card/Card";

const Stats = props => {
    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedPosts, setLoadedPosts] = useState({});
    const [loadedUsers, setLoadedUsers] = useState([]);


    useEffect(() => {
        const fetchAdminPost = async () => {
            try {
                const data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/stats`,
                'GET',
                null,
                {'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token});
                setLoadedUsers(data.userRating)
            }catch (e) {

            }

        }
        fetchAdminPost();
    }, [sendRequest])

    useEffect(() => {
        const fetchPosts= async () => {
            try {
                const data = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/posts/stats`,
                'GET',
                null,
                {'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token});
                setLoadedPosts(data)
            }catch (e) {

            }

        }
        fetchPosts();
    }, [sendRequest])

    
    return <React.Fragment>
        {isLoading && <div className="center">
            <LoadingSpinner/>
        </div>}

       
        {!isLoading && loadedPosts && loadedUsers &&
        <div className={"stats-page"}>
            <div className={'stats-item'}>
                <Card>
                    <div>Post By Category</div>
                    <ul className="app-news-list">
                        <li key={loadedPosts.sport}>
                            <span>Sport:</span>
                            <span>{loadedPosts.sport}</span>
                        </li>
                        <li key={loadedPosts.politic}>
                            <span>Politic :</span>
                            <span>{loadedPosts.politic}</span>
                        </li>
                        <li key={loadedPosts.economic}>
                            <span>Economic:</span>
                            <span>{loadedPosts.economic}</span>
                        </li>
                        <li key={loadedPosts.culture}>
                            <span>Culture:</span>
                            <span>{loadedPosts.culture}</span>
                        </li>
                    </ul>
                </Card>
            </div>

            <div className={'stats-item'}>
                <Card>
                    <div>Users Posts</div>
                    <ul className="app-news-list">
                        {loadedUsers.map(o => {
                            return <li key={o}>
                                <span>{o.name}</span>
                                <span>{o.posts} Posts</span>
                            </li>
                        }) }
                    </ul>
                </Card>
            </div>
        </div>
        }

    </React.Fragment>

}

export default Stats;