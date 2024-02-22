
import { useEffect, useState } from "react";
import "./ProfileEdit.css"

function ProfileEdit(props) {

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

    const handleSubmitForm=(event) => {
        event.preventDefault();
        const target=event.target;
        const newFirstName = target.firstName.value;
        const newLastName = target.lastName.value;
        const newUserName = target.userName.value;
        const newBirthDate = target.birthDate.value;
        const newStudies = target.studies.value;
        const newPhonenumber = target.phoneNumber.value;
        const newHobbies = target.hobbies.value;

        fetch(`/api/user/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName:newFirstName,
                lastName:newLastName,
                userName:newUserName,
                birthDate:newBirthDate,
                studies:newStudies,
                phoneNumber:newPhonenumber,
                hobbies:newHobbies
            })
        })
        .then(response=> response.json())
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
        window.location.href = "/profile"
    }


    return (
        <div className="profile-data">
            {userData ? (<form onSubmit={handleSubmitForm}>

                <div className="first-name">
                    <label>First Name: <input type="text" name="firstName" defaultValue={userData.firstName}></input></label>
                </div>
                <div className="last-name">
                    <label>Last Name: <input type="text" name="lastName" defaultValue={userData.lastName}></input></label>
                </div>
                <div className="user-name">
                    <label>Username: <input type="text" name="userName" defaultValue={userData.userName}></input></label>
                </div>
                <div className="email-name">
                    <label>E-mail: <input type="text" name="email" defaultValue={userData.userEmail}></input></label>
                </div>
                <div className="birth-date">
                    <label>Birth Date: <input type="text" name="birthDate" defaultValue={userData.birthDate}></input></label>
                </div>
                <div className="studies">
                    <label>Sudies: <input type="text" name="studies" defaultValue={userData.studies}></input></label>
                </div>
                <div className="phone-number">
                    <label>Phonenumber: <input type="text" name="phoneNumber" defaultValue={userData.phoneNumber}></input></label>
                </div>
                <div className="hobbies">
                    <label>Hobbies: <input type="text" name="hobbies" defaultValue={userData.hobbies}></input></label>
                </div>
                <button>Finish Editing</button>
            </form>

            ) : (
                <>
                    <h1>Something went wrong</h1>
                </>
            )}
        </div>
    );
}

export default ProfileEdit;