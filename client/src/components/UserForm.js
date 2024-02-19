import { useEffect, useState } from "react";

async function handleEditSubmit(e, user, id) {
  e.preventDefault();
  try {
    const response = await fetch(`/api/registration/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    const updatedUser = await response.json();
    console.log("User updated:", updatedUser);
    alert("Changes Saved Successfully");
  } catch (error) {
    console.error("Error updating:", error);
    alert("Error saving changes");
  }
}

function onSubmit(e, user) {
  e.preventDefault();
  fetch("/api/registration", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log("Registration Successful:", response);
      alert("Successful Registration");
    })
    .catch((error) => {
      console.error(error);
      alert("Registration Error");
    });
}

const UserForm = ({ editMode, user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [studies, setStudies] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hobbies, setHobbies] = useState("");

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
      setUserName(user.userName ?? "");
      setUserEmail(user.userEmail ?? "");
      setBirthDate(user.birthDate ?? "");
      setStudies(user.studies ?? "");
      setPhoneNumber(user.phoneNumber ?? "");
      setHobbies(user.hobbies ?? "");
    }
  }, [user]);

  /* if (!user) {
    // If user data is not available yet, return null or loading indicator
    return null; // or return <div>Loading...</div>;
  } */

  return (
      <>
        <div className="registration-container">
        <div className="header">
          <h1>Welcome</h1>
          <h2>{editMode ? "Editing Registration" : "Registration"}</h2>
        </div>
        <form
          onSubmit={
            editMode
              ? (e) =>
                  handleEditSubmit(
                    e,
                    {
                      firstName,
                      lastName,
                      userName,
                      userEmail,
                      birthDate,
                      studies,
                      phoneNumber,
                      hobbies,
                    },
                    user._id
                  )
              : (e) => onSubmit(e, {
                firstName,
                lastName,
                userName,
                userEmail,
                birthDate,
                studies,
                phoneNumber,
                hobbies,
              })
          }
          className="form"
        >
          <label>
            First Name:
            <input
              type="text"
              value={firstName ?? ""}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-field"
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={lastName ?? ""}
              onChange={(e) => setLastName(e.target.value)}
              className="input-field"
            />
          </label>
          <label>
            User Name:
            <input
              type="text"
              value={userName ?? ""}
              onChange={(e) => setUserName(e.target.value)}
              className="input-field"
            />
          </label>
          <label>
            User Email:
            <input
              type="text"
              value={userEmail ?? ""}
              onChange={(e) => setUserEmail(e.target.value)}
              className="input-field"
            />
          </label>
          <label>
            Birth Date:
            <input
              type="text"
              value={birthDate ?? ""}
              onChange={(e) => setBirthDate(e.target.value)}
              className="input-field"
            />
          </label>
          <label>
            Studies:
            <input
              type="text"
              value={studies ?? ""}
              onChange={(e) => setStudies(e.target.value)}
              className="input-field"
            />
          </label>
          <label>
            Phone Number:
            <input
              type="text"
              value={phoneNumber ?? ""}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="input-field"
            />
          </label>
          <label>
            Hobbies:
            <input
              type="text"
              value={hobbies ?? ""}
              onChange={(e) => setHobbies(e.target.value)}
              className="input-field"
            />
          </label>
          <button type="submit" className="submit-button">
            {editMode ? "Edit user" : "Create user"}
          </button>
        </form>
        </div>
      </>
    )
};

export default UserForm;
