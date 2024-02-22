import { Link, Route } from "react-router-dom";
import "./Login.css";
import Login from "./Login";

function Logout(props) {
  const onLogout = props.onLogout;

  function handleLogout(event) {
    event.preventDefault();

    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserId");

    onLogout();
  }

  return (
    <div className="logout">
      <form onSubmit={handleLogout}>
        <input type="text" name="userName" placeholder={localStorage.getItem("currentUser")} />
        <button type="submit">Logout</button>
      </form>
      <Route path='/login' element={<Login/>}/>
    </div>
  );
}

export default Logout;
