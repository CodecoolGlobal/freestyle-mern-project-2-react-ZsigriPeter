import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function fetchUser(name) {
  return fetch(`/api/username/${name}`).then((response) => response.json());
}

function Login(props) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const onLogin = props.onLogin;

  function handleLogin(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.userName.value;

    fetchUser(name).then((user) => {
      localStorage.setItem("currentUser", user.userName);
      localStorage.setItem("currentUserId", user._id);
      onLogin();
      setErrorMessage("");
      navigate('/profile');
    })
    .catch((error) => {
      setErrorMessage("Invalid username. Please try again.");
    });
  }

  return (
    <div>
      {
        <div className="login">
          <form onSubmit={handleLogin}>
            <label>
              Username:
              <input type="text" name="userName" className="user-name"></input>
            </label>
            <button type="submit">Login</button>
          </form>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      }
    </div>
  );
}

export default Login;
