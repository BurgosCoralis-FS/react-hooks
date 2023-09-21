import React, { useState } from "react";
import UserTable from "./components/tables/Usertable";
import AddUserForm from "./components/forms/AddUserForm";
import EditUserForm from "./components/forms/EditUserForm";

const App = () => {
  const userData = [
    {id: 1, name: 'Alice', username: 'CuteUwU'},
    {id: 2, name: 'Michael', username: 'HerOwner'},
    {id: 3, name: 'Jessica', username: 'HisKitten'},
  ]

  const [users, setUsers] = useState(userData);

  // edit user
  const [editing, setEditing] = useState(false)
  const initialFormState = {id: null, name: '', username: ''}
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const editRow = (user) => {
    setEditing(true)

    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }

  const updateUser = (id, updateUser) => {
    setEditing(false)

    setUsers(users.map((user) => (user.id === id ? updateUser : user)))
  }

  // add user
  const addUser = (user) => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  // delete user
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
    setEditing(false)
  }
  
  return(
    <div className='container'>
      <h1>CRUD App with Hooks</h1>
      <div className='flex-row'>
        <div className='flex-large'>
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm 
              setEditing={setEditing}
              currentUser={currentUser}
              updateUser={updateUser} />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser}/>
            </div>
          )}
        </div>
        
        <div className='flex-large'>
          <h2>View Users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser}/>
        </div>
      
    </div>
    </div> 
  )
}

export default App;
