import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function fetchUsers() {
  return fetch(`/api/users`).then((response) => response.json());
}
const UserList = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchUsers().then((users) => setUsers(users));
  }, []);

  return (
    users && (
      <div>
        {users.map((user) => {
          return (
            <div>
              <p key={user._id}>{user.firstName}</p>{" "}
              <p key={user._id}>{user.lastName}</p>
              <Link to={`/edit-user/${user._id}`}>
                <button>Edit</button>
              </Link>
            </div>
          );
        })}
      </div>
    )
  );
};

export default UserList;
