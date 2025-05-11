import { User } from "../types/user.types";

type Props = {
  user: User
}

const UserProfile = ({ user }: Props) => {
  return (
    <div>
      <h3>{user.fullname}'s Info</h3>
      <div>
        <ul style={{ paddingLeft: 0 }}>
          <li>
            <span>Full name:</span>
            <strong>{user.fullname}</strong>
          </li>
          <li>
            <span>Age:</span>
            <strong>{user.age}</strong>
          </li>
          <li>
            <span>Education:</span>
            <strong>{user.education}</strong>
          </li>
          <li>
            <span>Gender:</span>
            <strong>{user.gender}</strong>
          </li>
          <li>
            <span>Bio:</span>
            <strong>{user.bio}</strong>
          </li>
          <li>
            <span>Skills:</span>
            <strong>
              {user.skills.join(', ')}
            </strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile

    // - Shows all the selected user's data when the **View** button is clicked on `UserList` component. For the skills array, you can just separate each element with a comma.