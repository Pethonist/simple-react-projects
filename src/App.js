import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Here is the list of users: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    /*==========REALISATION WITH FETCH==========*/
    /* fetch('https://reqres.in/api/users')
      .then((response) => response.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((error) => {
        console.warn(error);
        alert('Ошибка при получении пользователей');
      })
      .finally(() => setIsLoading(false));*/

    /*==========REALISATION WITH AXIOS==========*/
    axios
      .get('https://reqres.in/api/users')
      .then((response) => response.data)
      .then((data) => setUsers(data.data))
      .catch((error) => {
        console.warn(error);
        alert('Error getting users');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          items={users}
          isLoading={isLoading}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
