import React from "react";
import { Redirect } from "react-router-dom";
import LandingNavBar from "../Components/LandingNavBar";
import Footer from "../Components/Footer";
import Form from "../Hooks/Form";
import MenteeForm from "../Hooks/MenteeForm";
import { Multiselect } from "multiselect-react-dropdown";

import Button from "../Components/Button";
import "./Register.scss";

const FETCH_URL =
  process.env.NODE_ENV === "production"
    ? "https://alt-lane.herokuapp.com/"
    : "http://localhost:9000/";

function Register() {
  const [registered, setRegistered] = React.useState(null);
  const [photo, setPhoto] = React.useState([]);
  const fileSelect = React.useRef(null);
  const careerChoice = React.useRef(null);
  const menteeCareer = React.useRef(null);
  const { form, handleChange } = Form({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photoUrl: "",
    userType: "",
    parentName: "",
    parentEmail: "",
    careerField: "",
    bio: "",
    careerFieldInterest: [],
    company: "",
    linkedin: "",
  });
  const { menteeForm, handleMentee } = MenteeForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photoUrl: "",
    userType: "",
    parentName: "",
    parentEmail: "",
    careerFieldInterest: [],
  });

  const [careers, setCareers] = React.useState([]);
  React.useEffect(() => {
    async function getCareers() {
      const fields = await fetch(`${FETCH_URL}careers`);
      const allCareers = await fields.json();
      const careersList = [];
      allCareers.data.forEach((field) => {
        careersList.push({ key: field.name, id: field.id });
      });
      setCareers(careersList);
    }
    getCareers();
  }, []);

  // get the image uploaded by user
  const uploadFile = (e) => {
    const photo = e.target.files[0];
    if (photo) {
      setPhoto(photo);
    }
  };
  // set the data to post to cloudinary
  const unsignedPreset = "lsaabzji";
  const formData = new FormData();
  formData.append("file", photo);
  formData.append("upload_preset", unsignedPreset);

  // get the values for mentor interests
  const getAllVals = () => {
    const values = careerChoice.current.getSelectedItems();
    form.careerField = values[0].id;
  };
  // get the values for mentee interests as an array of ids
  const menteeInterests = () => {
    const values = menteeCareer.current.getSelectedItems();
    values.forEach((val) => menteeForm.careerFieldInterest.push(val.id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.userType = e.target.id;

    try {
      // sending user images to cloudinary to then store a image url in the db
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/alt-lane/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      form.photoUrl = result.secure_url;
      menteeForm.photoUrl = result.secure_url;
    } catch (err) {
      console.log(err);
    }

    let data = {};
    if (form.userType === "mentee") {
      data = {
        first_name: menteeForm.firstName,
        last_name: menteeForm.lastName,
        email: menteeForm.email,
        password: menteeForm.password,
        photo_url: menteeForm.photoUrl,
        user_type: form.userType,
        parent_name: menteeForm.parentName,
        parent_email: menteeForm.parentEmail,
        career_field_array: menteeForm.careerFieldInterest,
      };
      menteeInterests();
    } else {
      data = {
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        password: form.password,
        photo_url: form.photoUrl,
        user_type: form.userType,
        bio: form.bio,
        career_field_id: form.careerField,
        company: form.company,
        linkedin_url: form.linkedin,
      };

      getAllVals();
    }

    try {
      await fetch(`${FETCH_URL}users/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setRegistered(true);
    } catch (err) {
      console.log(err);
    }
  };

  if (registered) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <LandingNavBar />
      <div
        className="container"
        style={{ marginTop: "5%", marginBottom: "10%" }}
      >
        <div
          className="container  justify-content-center"
          style={{ marginTop: "1%" }}
        >
          <div
            className="card w-50 panel-login containerRegister"
            style={{ boxShadow: "2px 2px 3px 2px rgba(0,0,0,0.2)" }}
          >
            <input type="radio" name="tab" id="menteeRegister" defaultChecked />
            <input type="radio" name="tab" id="mentorRegister" />
            <div className="tabs">
              <label className="tab text" htmlFor="menteeRegister">
                Mentee Register
              </label>
              <label className="tab text" htmlFor="mentorRegister">
                Mentor Register
              </label>
            </div>
            <div className="container card-body pages">
              <form
                className="page"
                onSubmit={handleSubmit}
                id="mentee"
                style={{ display: "block" }}
              >
                <div className="mb-3 row input">
                  <label
                    htmlFor="firstName"
                    style={{ color: "#764288" }}
                    className="col-sm-3 col-form-label"
                  >
                    First Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control text"
                      value={menteeForm.firstName}
                      onChange={handleMentee}
                      type="firstName"
                      name="firstName"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row input">
                  <label htmlFor="lastName" className="col-sm-3 col-form-label">
                    Last Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control text"
                      value={menteeForm.lastName}
                      onChange={handleMentee}
                      type="lastName"
                      name="lastName"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row input">
                  <label htmlFor="email" className="col-sm-3 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control text"
                      value={menteeForm.email}
                      onChange={handleMentee}
                      type="email"
                      name="email"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row input">
                  <label htmlFor="password" className="col-sm-3 col-form-label">
                    Password
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control text"
                      value={menteeForm.password}
                      onChange={handleMentee}
                      type="password"
                      name="password"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row input">
                  <label htmlFor="photoUrl" className="col-sm-3 col-form-label">
                    Upload an image{" "}
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control text"
                      ref={fileSelect}
                      onChange={uploadFile}
                      type="file"
                      name="photoUrl"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row input">
                  <label
                    htmlFor="parentName"
                    className="col-sm-3 col-form-label"
                  >
                    Parent Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control text"
                      value={menteeForm.parentName}
                      onChange={handleMentee}
                      type="text"
                      name="parentName"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row input">
                  <label
                    htmlFor="parentEmail"
                    className="col-sm-3 col-form-label"
                  >
                    Parent Email
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control text"
                      value={menteeForm.parentEmail}
                      onChange={handleMentee}
                      type="email"
                      name="parentEmail"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row input">
                  <label
                    htmlFor="careerField"
                    className="col-sm-3 col-form-label"
                  >
                    Career Field Interest{" "}
                  </label>
                  <div className="col-sm-8 text">
                    <Multiselect
                      className="form-control text"
                      ref={menteeCareer}
                      onChange={menteeInterests}
                      options={careers}
                      displayValue="key"
                      selectionLimit="3"
                      style={{
                        chips: { background: "black" },
                        searchBox: {
                          background: "#F6F7F9",
                          border: "1px solid #ced4da",
                          borderRadius: "5px",
                        },
                      }}
                      required
                    />
                  </div>
                </div>
                <Button className="input" name="Register" />
              </form>
              <form
                className="page"
                onSubmit={handleSubmit}
                id="mentor"
                style={{ display: "block" }}
              >
                <div className="mb-3 row input">
                  <label
                    htmlFor="firstName"
                    className="col-sm-3 col-form-label"
                  >
                    First Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control text"
                      value={form.firstName}
                      onChange={handleChange}
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row input">
                  <label htmlFor="lastName" className="col-sm-3 col-form-label">
                    Last Name
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control text"
                      value={form.lastName}
                      onChange={handleChange}
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row input ">
                  <label htmlFor="email" className="col-sm-3 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control text"
                      value={form.email}
                      onChange={handleChange}
                      type="email"
                      id="email"
                      name="email"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row input">
                  <label htmlFor="password" className="col-sm-3 col-form-label">
                    Password
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control text"
                      value={form.password}
                      onChange={handleChange}
                      type="password"
                      id="password"
                      name="password"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row input">
                  <label htmlFor="company" className="col-sm-3 col-form-label">
                    Company
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control text"
                      value={form.company}
                      onChange={handleChange}
                      type="text"
                      id="company"
                      name="company"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row input">
                  <label htmlFor="linkedin" className="col-sm-3 col-form-label">
                    LinkedIn
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control text"
                      value={form.linkedin}
                      onChange={handleChange}
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row input">
                  <label htmlFor="bio" className="col-sm-3 col-form-label">
                    Bio
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control text"
                      value={form.bio}
                      onChange={handleChange}
                      type="text"
                      id="bio"
                      name="bio"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row input">
                  <label htmlFor="photoUrl" className="col-sm-3 col-form-label">
                    Upload an image
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control text"
                      ref={fileSelect}
                      onChange={uploadFile}
                      type="file"
                      id="photoUrl"
                      name="photoUrl"
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 row input">
                  <label
                    htmlFor="careerField"
                    className="col-sm-3 col-form-label"
                  >
                    Career Field Interest{" "}
                  </label>
                  <div className="col-sm-8 text">
                    <Multiselect
                      id="careers"
                      className="text"
                      ref={careerChoice}
                      onChange={getAllVals}
                      options={careers}
                      displayValue="key"
                      selectionLimit="1"
                      style={{
                        chips: { background: "black" },
                        searchBox: {
                          background: "#F6F7F9",
                          border: "1px solid #ced4da",
                          bordeRadius: "5px",
                        },
                      }}
                      required
                    />
                  </div>
                </div>

                <Button className="input" name="Register" />
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Register;
