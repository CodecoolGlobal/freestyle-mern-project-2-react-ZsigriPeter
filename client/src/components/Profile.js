
import { useEffect, useState } from "react";
import "./Profile.css";

function Profile(props) {
    const [userData, setUserData] = useState(null);

    const userId = props.userId;

    const fetchUserById = () => {
        fetch(`/api/user/${userId}`, {
            method: "GET",
        })
            .then(response => response.json())
            .then(response => {
                setUserData(response);
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchUserById();
    }, []);

    return (
        <div className="profile-data">
            {userData ? (<>
                <div className="first-last-name">
                    <label>Welcome {userData.firstName +" "+ userData.lastName}!</label>
                </div>
                <div className="user-name">
                    <label>Username: {userData.userName}</label>
                </div>
                <div className="email-name">
                    <label>E-mail: {userData.userEmail}</label>
                </div>
                <div className="birth-date">
                    <label>Birthdate: {userData.birthDate}</label>
                </div>
                <div className="studies">
                    <label>Studies: {userData.studies}</label>
                </div>
                <div className="phone-number">
                    <label>Phonenumber: {userData.phoneNumber}</label>
                </div>
                <div className="hobbies">
                    <label>Hobbies: {userData.hobbies}</label>
                </div>
                <a className="link-btn" href="/profile/edit"><div className="nav-item">
                <label>Edit Userdata</label>
            </div></a>
            </>

            ) : (
                <>
                    <h1>Something went wrong</h1>
                </>
            )}
        </div>
    );
}

export default Profile;