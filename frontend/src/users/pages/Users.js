import React, { useEffect, useState, useContext } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/Error/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/Loading/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

const Users = () => {
  const auth = useContext(AuthContext);
  const [loadedUsers, setLoadedUsers] = useState([]);
  const [titleSearch, setTitleSearch] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await sendRequest(
          `http://localhost:5000/api/users`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );
        setLoadedUsers(data.users.filter((u) => u.id !== auth.userId));
      } catch (e) {}
    };
    fetchUsers();
  }, [sendRequest]);

  const inputChangeHandler = (event) => {
    console.log("change ", event.target.value);
    setTitleSearch(event.target.value);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && (
        <UsersList
          items={loadedUsers.filter((u) => {
            if (titleSearch) {
              return u.name.includes(titleSearch);
            } else {
              return u;
            }
          })}
        />
      )}
    </React.Fragment>
  );
};

export default Users;
