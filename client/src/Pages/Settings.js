import React, { useState, useEffect } from "react";
import "./Settings.scss";
import Footer from "../Components/Footer";
import LoginNav from "../Components/LoginedNavBar";
import Button from "../Components/Button";

import { AuthContext } from "../App";

const FETCH_URL =
  process.env.NODE_ENV === "production"
    ? "https://alt-lane.herokuapp.com/"
    : "http://localhost:9000/";

function Settings() {
  const { state: authState } = React.useContext(AuthContext);
  const userId = authState.user_id;
  const authToken = authState.token;
  const [isDisable, setDisable] = useState(true);
  const [editBtn, setEditBtn] = useState("Edit");
  const [userData, setUserData] = useState({
    oldEmail: "",
    newEmail: "",
    oldPassword: "",
    newPassword: "",
  });
  let onlyEmail = false;

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await fetch(`${FETCH_URL}users/get`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
          body: JSON.stringify({
            user_id: userId,
          }),
        });
        const result = await response.json();
        await result.data[0];
        setUserData({
          oldEmail: result.data[0].email,
        });
      } catch (err) {
        console.log(err);
      }
    }
    getUserInfo();
  }, [authState.token, userId]);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  async function checkPassword() {
    try {
      const response = await fetch(`${FETCH_URL}users/pass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify({
          user_id: userId,
          password: userData.oldPassword,
        }),
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  async function updateUserInfo() {
    if (onlyEmail === true && userData.oldEmail !== userData.newEmail) {
      try {
        await fetch(`${FETCH_URL}users`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
          body: JSON.stringify({
            user_id: userId,
            email: userData.newEmail,
          }),
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await fetch(`${FETCH_URL}users`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
          body: JSON.stringify({
            user_id: userId,
            password: userData.newPassword,
            email: userData.newEmail,
          }),
        });
      } catch (err) {
        console.log(err);
      }
    }
    onlyEmail = false;
  }

  function enableEdit() {
    if (isDisable === true) {
      setDisable(false);
      setEditBtn("Cancel");
    } else {
      setDisable(true);
      setEditBtn("Edit");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData.newPassword) {
      onlyEmail = true;
      updateUserInfo();
    } else {
      let isValidRequest = await checkPassword();
      if (isValidRequest.isVerified) {
        updateUserInfo();
      }
    }
  };

  return (
    <div>
      <LoginNav userType={authState.userType} authToken={authToken} />
      <div
        className="container"
        style={{
          marginTop: "10%",
          marginBottom: "10%",
          position: "relative",
          minHeight: "50vh",
        }}
      >
        <div
          className="containter d-flex justify-content-center"
          style={{ marginTop: "1%" }}
        >
          <div
            className="card w-75 col-8"
            style={{
              background: "linear-gradient(-90deg, #B2C3EE 20%, #D6C5F9 90%)",
            }}
          >
            <div className="card-body">
              <div
                className="d-flex justify-content-end"
                style={{ marginBottom: "1%" }}
              >
                <Button
                  className="btn btn-dark"
                  onClick={enableEdit}
                  name={editBtn}
                />
              </div>

              <form className="settings" onSubmit={handleSubmit}>
                <div className="mb-3 row">
                  <label htmlFor="email" className="col-sm-2 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      disabled={isDisable}
                      value={userData.newEmail}
                      onChange={handleChange}
                      type="newEmail"
                      id="newEmail"
                      name="newEmail"
                    />
                  </div>
                </div>

                <div className="mb-3 row">
                  <label htmlFor="password" className="col-sm-2 col-form-label">
                    Old Password
                  </label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      disabled={isDisable}
                      value={userData.oldPassword}
                      onChange={handleChange}
                      type="password"
                      id="oldPassword"
                      name="oldPassword"
                    />
                  </div>
                </div>
                <div className="mb-3 row">
                  <label htmlFor="password" className="col-sm-2 col-form-label">
                    New Password
                  </label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      disabled={isDisable}
                      value={userData.newPassword}
                      onChange={handleChange}
                      type="password"
                      id="newPassword"
                      name="newPassword"
                    />
                  </div>
                </div>
                <div
                  className="d-flex justify-content-end"
                  style={{ marginBottom: "1%" }}
                >
                  <Button href="#" className="btn btn-dark" name="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default Settings;
