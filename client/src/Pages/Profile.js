import React from "react";
import { Multiselect } from "multiselect-react-dropdown";
import "./Profile.scss";
import Footer from "../Components/Footer";
import LoginNav from "../Components/LoginedNavBar";
import { AuthContext } from "../App";
import Modal from "react-bootstrap/Modal";
import Button from "../Components/Button";

const FETCH_URL =
  process.env.NODE_ENV === "production"
    ? "https://alt-lane.herokuapp.com/"
    : "http://localhost:9000/";

function Profile() {
  const { state: authState } = React.useContext(AuthContext);
  const careerChoice = React.useRef(null);
  const menteeCareer = React.useRef(null);
  const [interest, setMenteeInterests] = React.useState([]);
  const [form, setForm] = React.useState({});
  const [editBtn, setEditBtn] = React.useState(true);
  const [show, setShow] = React.useState(false); // For adding and removing edit photo module from window
  const formData = new FormData(); // Data from uploadFile function
  const fileSelect = React.useRef(null); // File user selects from input file in edit photo module

  const [careers, setCareers] = React.useState([]);
  const selectedValues = [];

  React.useEffect(() => {
    async function fetchCareers() {
      const fields = await fetch(`${FETCH_URL}careers`);
      const allCareers = await fields.json();
      const careersList = [];
      allCareers.data.forEach((field) => {
        careersList.push({ key: field.name, id: field.id });
      });
      setCareers(careersList);
    }
    fetchCareers();

    async function fetchMentor() {
      const response = await fetch(
        `${FETCH_URL}${authState.userType}s/${authState.user_id}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      const result = await response.json();

      setForm({
        firstName: result.data[0].first_name,
        lastName: result.data[0].last_name,
        email: result.data[0].email,
        photoUrl: result.data[0].photo_url,
        userType: result.data[0].email,
        careerField: result.data[0].career_field_id,
        parentName: result.data[0].parent_name,
        parentEmail: result.data[0].parent_email,
        bio: result.data[0].bio,
        company: result.data[0].company,
        linkedin: result.data[0].linkedin_url,
        careerFieldInterest: [],
      });
    }
    fetchMentor();
    async function getMenteeInterests() {
      const response = await fetch(
        `${FETCH_URL}mentee_interests/interests_for_one_mentee`,
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
          body: JSON.stringify({ mentee_id: authState.user_id }),
        }
      );
      const result = await response.json();
      setMenteeInterests(result.data);
    }
    getMenteeInterests();
  }, [authState.user_id, authState.userType, authState.token]);

  careers.forEach((career) => {
    if (career.id === form.careerField) {
      selectedValues.push(career);
    }
  });

  interest.forEach((interestEle) => {
    careers.forEach((career) => {
      if (career.key === interestEle.name) {
        selectedValues.push(career);
      }
    });
  });

  // Gets any changed values in career fields form input
  const getAllVals = () => {
    const values = careerChoice.current.getSelectedItems();
    form.careerField = values[0].id;
  };

  // Gets any changed values in career fields form input
  const menteeInterests = () => {
    const values = menteeCareer.current.getSelectedItems();
    form.careerFieldInterest = [];
    values.forEach((val) => form.careerFieldInterest.push(val.id));
  };

  // Fetch that deletes all interests and adds fields in arr
  const callInterestsRoute = async (arr) => {
    try {
      const response = await fetch(
        `${FETCH_URL}mentee_interests/deleteInterests`,
        {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
          body: JSON.stringify({
            mentee_id: authState.user_id,
            career_field_array: arr,
          }),
        }
      );
      return response.json();
    } catch (err) {
      console.log(err);
    }
  };

  // Edit button that allows users to edit their profile information
  const btnClick = () => {
    if (editBtn === false) {
      setEditBtn(true);
    } else {
      // Retreving all interests in careerField
      if (authState.userType === "mentor") getAllVals();
      else menteeInterests();
      setEditBtn(false);
    }
  };

  // First submit button under First and Last Name fields
  // Checks if fields first name and last name have been changed
  // If so, add the new information to the database
  const submitClick = async () => {
    setEditBtn(true);
    let changed = false;

    if (
      document.getElementById("firstName").value !== form.firstName &&
      document.getElementById("firstName").value !== ""
    ) {
      var fName = document.getElementById("firstName").value;
      changed = true;
    }

    if (
      document.getElementById("lastName").value !== form.lastName &&
      document.getElementById("lastName").value !== ""
    ) {
      var lName = document.getElementById("lastName").value;
      changed = true;
    }

    // If any user changes their first and/or last name
    if (changed === true) {
      try {
        const response = await fetch(`${FETCH_URL}users`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
          body: JSON.stringify({
            user_id: authState.user_id,
            first_name: fName,
            last_name: lName,
          }),
        });
        return response.json();
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Gets file added to input field in edit photo molude
  const uploadFile = (event) => {
    const photo = event.target.files[0];
    const unsignedPreset = "lsaabzji";

    formData.append("file", photo);
    formData.append("upload_preset", unsignedPreset);
  };

  // Using a PUT fetch request when user tries to update a photo using edit photo module to change photo_url in database
  async function updatePhoto(photo) {
    try {
      const response = await fetch(`${FETCH_URL}/users`, {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify({
          user_id: authState.user_id,
          photo_url: photo,
        }),
      });
      return response.json();
    } catch (err) {
      console.log(err);
    }
  }

  // Sending image in input from edit photo module and uploading it to cloudinary
  // Recieves a url as a result and passes it to function above
  async function sendNewPhoto() {
    setShow(false);
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/alt-lane/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      updatePhoto(result.secure_url);
    } catch (err) {
      console.log(err);
    }
  }

  // Handles edit profile picture button and module that shows in window on click
  // Module handles picture upload to cloudinary when user clicks submit using function above
  function PhotoChange() {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
        <Button onClick={handleShow} name="Edit Profile Picture" />
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Please upload a photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              className="form-control"
              ref={fileSelect}
              onChange={uploadFile}
              type="file"
              id="photoUrl"
              name="photoUrl"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} name="Close" />
            <Button variant="dark" onClick={sendNewPhoto} name="Submit" />
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  // Second submit button on the bottom of the form
  // Checks if fields bio, company and linkedin url have been changed
  // If so, add the new information to the database
  const submitClickPart2 = async () => {
    setEditBtn(true);
    let changedMentor = false;
    let changedMentee = false;

    // If the user Logged in is a mentor
    if (authState.userType === "mentor") {
      const mentorValue = careerChoice.current.getSelectedItems();
      const careerField = mentorValue[0].id;
      if (
        document.getElementById("company").value !== form.company &&
        document.getElementById("company").value !== ""
      ) {
        var comp = document.getElementById("company").value;
        changedMentor = true;
      }

      if (
        document.getElementById("linkedin").value !== form.linkedin &&
        document.getElementById("linkedin").value !== ""
      ) {
        var linked = document.getElementById("linkedin").value;
        changedMentor = true;
      }

      if (
        document.getElementById("bio").value !== form.bio &&
        document.getElementById("bio").value !== ""
      ) {
        var mbio = document.getElementById("bio").value;
        changedMentor = true;
      }

      if (form.careerField !== careerField) {
        var field = careerField;
        changedMentor = true;
      }

      // If a mentor changes any information
      if (changedMentor === true) {
        console.log(field, mbio, linked, comp);
        try {
          const response = await fetch(`${FETCH_URL}mentors`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authState.token}`,
            },
            body: JSON.stringify({
              mentor_id: authState.user_id,
              bio: mbio,
              career_field_id: field,
              company: comp,
              linkedin_url: linked,
            }),
          });
          return response.json();
        } catch (err) {
          console.log(err);
        }
      }

      // If the user Logged in is a mentee
    } else if (authState.userType === "mentee") {
      const menteeValues = menteeCareer.current.getSelectedItems();
      const careerFields = [];
      menteeValues.forEach((val) => careerFields.push(val.id));

      if (
        document.getElementById("parentName").value !== form.parentName &&
        document.getElementById("parentName").value !== ""
      ) {
        var pName = document.getElementById("parentName").value;
        changedMentee = true;
      }

      if (
        document.getElementById("parentEmail").value !== form.parentEmail &&
        document.getElementById("parentEmail").value !== ""
      ) {
        var pEmail = document.getElementById("parentEmail").value;
        changedMentee = true;
      }

      if (form.careerFieldInterest !== careerFields) {
        callInterestsRoute(careerFields);
      }

      // If a mentee changes any information
      if (changedMentee === true) {
        try {
          const response = await fetch(`${FETCH_URL}mentees`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authState.token}`,
            },
            body: JSON.stringify({
              mentee_id: authState.user_id,
              parent_name: pName,
              parent_email: pEmail,
            }),
          });
          return response.json();
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      alert("Wait....How did you get here???");
    }
  };

  return (
    <div>
      <LoginNav />
      {authState.userType === "mentor" ? (
        <div>
          <div
            className="container"
            style={{ marginTop: "10%", marginBottom: "10%" }}
          >
            <div
              className="containter d-flex justify-content-between"
              style={{ marginTop: "1%" }}
            >
              <div className=" col-2">
                <img
                  src={form.photoUrl}
                  className="rounded-circle"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginBottom: "10px",
                  }}
                  alt=""
                />
                <PhotoChange />
              </div>
              <div
                className="card w-75 col-8"
                style={{
                  background:
                    "linear-gradient(-90deg, #B2C3EE 20%, #D6C5F9 90%)",
                }}
              >
                <div className="card-body">
                  <div
                    className="d-flex justify-content-end"
                    style={{ marginBottom: "1%" }}
                  >
                    {editBtn === true ? (
                      <button className="btn btn-dark " onClick={btnClick}>
                        Edit
                      </button>
                    ) : (
                      <button className="btn btn-dark " onClick={btnClick}>
                        Cancel
                      </button>
                    )}
                  </div>
                  <form>
                    <div className="mb-3 row">
                      <label
                        htmlFor="firstName"
                        className="col-sm-2 col-form-label"
                      >
                        First Name
                      </label>
                      <div className="col-sm-10">
                        {editBtn === true ? (
                          <input
                            type="text"
                            className="form-control"
                            value={form.firstName}
                            name="firstName"
                            readOnly="readOnly"
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            placeholder={form.firstName}
                            id="firstName"
                            name="firstName"
                          />
                        )}
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label
                        htmlFor="lastName"
                        className="col-sm-2 col-form-label"
                      >
                        Last Name
                      </label>
                      <div className="col-sm-10">
                        {editBtn === true ? (
                          <input
                            type="text"
                            className="form-control"
                            value={form.lastName}
                            name="lastName"
                            readOnly="readOnly"
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            placeholder={form.lastName}
                            id="lastName"
                            name="lastName"
                          />
                        )}
                      </div>
                    </div>
                    {editBtn === true ? (
                      ""
                    ) : (
                      <div
                        className="d-flex justify-content-end"
                        style={{ marginBottom: "1%" }}
                      >
                        <button className="btn btn-dark " onClick={submitClick}>
                          Submit
                        </button>
                      </div>
                    )}
                    <div className="mb-3 row">
                      <label
                        htmlFor="company"
                        className="col-sm-2 col-form-label"
                      >
                        Company
                      </label>
                      <div className="col-sm-10">
                        {editBtn === true ? (
                          <input
                            type="text"
                            className="form-control"
                            value={form.company}
                            name="company"
                            readOnly="readonly"
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            placeholder={form.company}
                            id="company"
                            name="company"
                          />
                        )}
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label
                        htmlFor="linkedin"
                        className="col-sm-2 col-form-label"
                      >
                        LinkedIn
                      </label>
                      <div className="col-sm-10">
                        {editBtn === true ? (
                          <input
                            type="text"
                            className="form-control"
                            value={form.linkedin}
                            name="linkedin"
                            readOnly="readonly"
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            placeholder={form.linkedin}
                            id="linkedin"
                            name="linkedin"
                          />
                        )}
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label
                        htmlFor="careerField"
                        className="col-sm-2 col-form-label"
                      >
                        Career Field{" "}
                      </label>
                      <div className="col-sm-10">
                        <Multiselect
                          ref={careerChoice}
                          onChange={getAllVals}
                          options={careers}
                          disablePreSelectedValues={editBtn}
                          selectedValues={selectedValues}
                          displayValue="key"
                          selectionLimit="1"
                          disable={editBtn}
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label htmlFor="bio" className="col-sm-2 col-form-label">
                        Bio
                      </label>
                      <div className="col-sm-10">
                        {editBtn === true ? (
                          <textarea
                            rows="5"
                            cols="5"
                            className="form-control"
                            value={form.bio}
                            name="bio"
                            readOnly="readonly"
                          />
                        ) : (
                          <textarea
                            className="form-control"
                            rows="5"
                            cols="5"
                            placeholder={form.bio}
                            id="bio"
                            name="bio"
                          />
                        )}
                      </div>
                    </div>
                  </form>
                  {editBtn === true ? (
                    ""
                  ) : (
                    <div
                      className="d-flex justify-content-end"
                      style={{ marginBottom: "1%" }}
                    >
                      <button
                        className="btn btn-dark "
                        onClick={submitClickPart2}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="container"
            style={{ marginTop: "10%", marginBottom: "10%", minHeight: "50vh" }}
          >
            <div
              className="containter d-flex justify-content-between"
              style={{ marginTop: "1%" }}
            >
              <div className=" col-2">
                <img
                  src={form.photoUrl}
                  className="rounded-circle"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginBottom: "1rem",
                  }}
                  alt=""
                />
                <PhotoChange />
              </div>
              <div
                className="card w-75 col-8 "
                style={{
                  background:
                    "linear-gradient(-90deg, #B2C3EE 20%, #D6C5F9 90%)",
                }}
              >
                <div className="card-body profile">
                  <div
                    className="d-flex justify-content-end"
                    style={{ marginBottom: "1%" }}
                  >
                    {editBtn === true ? (
                      <button className="btn btn-dark " onClick={btnClick}>
                        Edit
                      </button>
                    ) : (
                      <button className="btn btn-dark " onClick={btnClick}>
                        Cancel
                      </button>
                    )}
                  </div>

                  <form className="profile">
                    <div className="mb-3 row">
                      <label
                        htmlFor="firstName"
                        className="col-sm-2 col-form-label"
                      >
                        First Name
                      </label>
                      <div className="col-sm-10">
                        {editBtn === true ? (
                          <input
                            type="text"
                            className="form-control"
                            value={form.firstName}
                            name="firstName"
                            readOnly="readOnly"
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            placeholder={form.firstName}
                            id="firstName"
                            name="firstName"
                          />
                        )}
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label
                        htmlFor="lastName"
                        className="col-sm-2 col-form-label"
                      >
                        Last Name
                      </label>
                      <div className="col-sm-10">
                        {editBtn === true ? (
                          <input
                            type="text"
                            className="form-control"
                            value={form.lastName}
                            name="lastName"
                            readOnly="readOnly"
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            placeholder={form.lastName}
                            id="lastName"
                            name="lastName"
                          />
                        )}
                      </div>
                    </div>
                    {editBtn === true ? (
                      ""
                    ) : (
                      <div
                        className="d-flex justify-content-end"
                        style={{ marginBottom: "1%" }}
                      >
                        <button className="btn btn-dark " onClick={submitClick}>
                          Submit
                        </button>
                      </div>
                    )}
                    <div className="mb-3 row">
                      <label
                        htmlFor="parentName"
                        className="col-sm-2 col-form-label"
                      >
                        Parent Name
                      </label>
                      <div className="col-sm-10">
                        {editBtn === true ? (
                          <input
                            type="text"
                            className="form-control"
                            value={form.parentName}
                            name="parentName"
                            readOnly="readOnly"
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            placeholder={form.parentName}
                            id="parentName"
                            name="parentName"
                          />
                        )}
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label
                        htmlFor="parentEmail"
                        className="col-sm-2 col-form-label"
                      >
                        Parent Email
                      </label>
                      <div className="col-sm-10">
                        {editBtn === true ? (
                          <input
                            type="text"
                            className="form-control"
                            value={form.parentEmail}
                            name="parentEmail"
                            readOnly="readOnly"
                          />
                        ) : (
                          <input
                            type="text"
                            className="form-control"
                            placeholder={form.parentEmail}
                            id="parentEmail"
                            name="parentEmail"
                          />
                        )}
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label
                        htmlFor="careerFieldInterest"
                        className="col-sm-2 col-form-label"
                      >
                        Career Field Interest
                      </label>
                      <div className="col-sm-10">
                        <Multiselect
                          className="multiselect"
                          ref={menteeCareer}
                          onChange={menteeInterests}
                          options={careers}
                          disablePreSelectedValues={editBtn}
                          selectedValues={selectedValues}
                          displayValue="key"
                          selectionLimit="3"
                          disable={editBtn}
                          style={{
                            chips: { background: "black" },
                            searchBox: {
                              background: "white",
                              border: "none",
                              "border-radius": "5px",
                            },
                          }}
                        />
                      </div>
                    </div>
                  </form>
                  {editBtn === true ? (
                    ""
                  ) : (
                    <div
                      className="d-flex justify-content-end"
                      style={{ marginBottom: "1%" }}
                    >
                      <button
                        className="btn btn-dark "
                        onClick={submitClickPart2}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
export default Profile;
