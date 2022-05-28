import React, {useContext, useEffect, useState} from "react";
import PostList from "../components/PostList";
import LoadingSpinner from "../../shared/components/UIElements/Loading/LoadingSpinner";
import AdminPostItem from "../components/AdminPostItem";
import {useHttpClient} from "../../shared/hooks/http-hook";
import Select from "../../shared/components/FormElements/Select/Select";
import {AuthContext} from "../../shared/context/auth-context";

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
                setLoadedUsers(data)
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
        <div>
              <Card className='place-item-content'>
                <ul className="app-news-list">
                    {loadedExchange.map(o => {
                        return <li key={o}>
                            <span>{o[0]}</span>
                            <span>{o[1]}</span>
                        </li>
                    }) }
                </ul>
            </Card>
        </div>
        }

    </React.Fragment>

}

export default Stats;