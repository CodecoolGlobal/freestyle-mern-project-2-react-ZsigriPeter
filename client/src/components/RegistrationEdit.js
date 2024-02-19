import { useEffect, useState } from "react";
import UserForm from "./UserForm";
import { useParams } from "react-router-dom";

function fetchUser(id) {
  return fetch(`/api/user/${id}`).then((response) => response.json());
}

function EditUserData() {
  const [user, setUser] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchUser(id).then((user) => setUser(user));
    console.log(id);
    console.log(user);
  }, [id]);

  return <UserForm user={user} editMode={true} />;
}

export default EditUserData;
