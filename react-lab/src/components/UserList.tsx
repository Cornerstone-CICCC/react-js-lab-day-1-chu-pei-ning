import { User } from '../types/user.types'

type Props = {
  user: User,
  onView: (id: string) =>void,
  onDelete: (id: string) => void,
  onEdit: (id: string) => void
}

const UserList = ({ user, onView, onDelete, onEdit }: Props) => {
  return (
    <div> 
      <li
      key={user.id}
      style={{
        display: "flex",
        gap: "1rem",
        margin: ".5rem 0",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
        <div>{user.fullname}</div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={() => onView(user.id)}>View</button>
          <button onClick={() => onEdit(user.id)}>Edit</button>
          <button onClick={() => onDelete(user.id)}>Delete</button>
        </div>
      </li>
    </div>
  )
}

export default UserList

// - List down all the users in an html table.
// - Each row should only show the user's `fullname` and `id`.
// - At the end of each row are the **View**, **Edit**, and **Delete** buttons.