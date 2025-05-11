import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import { useState } from "react"
import { User } from './types/user.types';
import { v4 as uuidv4 } from 'uuid'
import { Toaster, toast } from 'react-hot-toast';

const App = () => {
  /* Your states here */
  const [users, setUser] = useState<User[]>([])
  const [isView, setIsView] = useState<boolean>(false)
  const [userToEdit, setUserToEdit] = useState<User | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  /* Your handlers here */
  const handleAddUser = (user: Omit<User, 'id'>) => {
    const newUser = {
      ...user,
      id: uuidv4(),
    };
    setUser(prevState =>[...prevState, newUser])
    setIsView(true)
    setSelectedUser(newUser)
    toast.success("User added succesfully!")
  }

  const handleDeleteUser = (id: string) => {
    setUser(prevState =>
      prevState.filter((user) => user.id !== id)
    )
  }

  const handleUpdateUser = (editUser: User) => {
    setUser(prevState => 
      prevState.map(user =>
        user.id === editUser.id
        ? {...editUser}
        : user
      )
    )
    setIsView(true);
    setSelectedUser(editUser);
    setUserToEdit(null);
    toast.success("Employee updated!")
  }

  const handleViewUser = (id: string) => {
    const foundUser = users.find((user) => user.id === id);
    if (!foundUser) return;
    setSelectedUser(foundUser);
    setIsView(true);
  }

  const handleEditUser = (id: string) => {
    const found = users.find((user) => user.id === id);
      if (found) {
        setUserToEdit(found);
      } else {
        setUserToEdit(null);
      }
      setIsView(false);
  }

  return (
    <>
      <div><Toaster /></div>
      <UserForm
        onAdd={handleAddUser}
        editUser={userToEdit}
        onUpdate={handleUpdateUser}
      />
      <ul style={{ paddingLeft: 0 }}>
        {users.map((user) => (
          <UserList
            key={user.id}
            user={user}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onView={handleViewUser}
          />
        ))}
      </ul>
      {isView && selectedUser ? <UserProfile user={selectedUser} /> : null}
    </>
  )
}

export default App
