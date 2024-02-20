

function NavBar(props) {

    const userName=props.userName;
    return (
        <div className="nav-bar">
            <a href="/learn"><div className="nav-item">
                <label>Learn About Blackholes</label>
            </div></a>
            <a href="/quiz"><div className="nav-item">
                <label>Quiz</label>
            </div></a>
            <a href="/registration"><div className="nav-item">
                <label>Registarion</label>
            </div></a>
            <a href="/login"><div className="nav-item">
                <label>Login</label>
            </div></a>
            <a href="/profile"><div className="nav-item">
                <label>Profile</label>
            </div></a>
            <a href="/leaderboard"><div className="nav-item">
                <label>Leaderboard</label>
            </div></a>
            <a href="/users"><div className="nav-item">
                <label>Edit Users</label>
            </div></a>
            <div className="user-name-nav">
                {/* <img src="https://e7.pngegg.com/pngimages/782/114/png-clipart-profile-icon-circled-user-icon-icons-logos-emojis-users.png" style={{width:"30px",height:"30px"}} alt="profile" /> */}
                <label>{userName}</label>
            </div>
        </div>
    );
}

export default NavBar;