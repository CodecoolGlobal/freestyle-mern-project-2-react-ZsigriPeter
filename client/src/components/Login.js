
import "./Login.css";

function fetchUser(name) {
  return fetch(`/api/username/${name}`).then((response) => response.json());
}

function Login(props) {
  const onLogin = props.onLogin;

  function handleLogin(event) {
    event.preventDefault();
    const target = event.target;
    const name = target.userName.value;

    fetchUser(name).then((user) => {
      localStorage.setItem("currentUser", user.userName);
      localStorage.setItem("currentUserId", user._id);
      onLogin();
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
        </div>
      }
    </div>
  );
}

export default Login;
