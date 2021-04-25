import React from "react";
import Button from "../Components/Button";
const FETCH_URL =
  process.env.NODE_ENV === "production"
    ? "https://alt-lane.herokuapp.com/"
    : "http://localhost:9000/";

function MentorCard(props) {
  const handleClick = () => {
    const connectMentorship = async (currentMentor, currentMentee) => {
      try {
        await fetch(`${FETCH_URL}mentorship`, {
          method: "POST",
          headers: {
            "Access-Control-Allow-Origin": "*",
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify({
            mentee_id: currentMentee,
            mentor_id: currentMentor,
          }),
        });
      } catch (err) {
        console.log(err);
      }
    };
    connectMentorship(props.mentor_id, props.mentee_id);
  };

  return (
    <div className="d-flex justify-content-center">
      <div
        className="card"
        style={{
          width: "25rem",
          height: "auto",
          background: "linear-gradient(360deg, #B2C3EE 20%, #D6C5F9 90%)",
        }}
      >
        <div className="text-center" style={{ paddingTop: "20px" }}>
          <img
            className="rounded-circle z-depth-2"
            style={{ width: "10rem", height: "10rem" }}
            src={props.photo}
            alt="profile img"
          />
        </div>
        <div className="card-body" style={{ padding: "20px" }}>
          <h2 className="card-title fw-normal" style={{ color: "#764288" }}>
            {props.name}
          </h2>
          <h3
            className="card-subtitle  fw-light"
            style={{ fontFamily: "'Chivo', sans-serif", color: "#764288" }}
          >
            {props.company}
          </h3>
          <div className="d-flex justify-content-center">
            <hr style={{ align: "center", width: "60%", height: "2px" }} />
          </div>
          <div className="d-flex flex-column">
            <p
              className=""
              style={{
                fontFamily: "'Sarala', sans-serif",
                color: "#3c3b3d",
                fontSize: "16px",
              }}
            >
              {props.bio}
            </p>
            <div
              className="d-flex justify-content-end"
              style={{ padding: "10px" }}
            >
              <Button
                className="btn btn-dark"
                onClick={handleClick}
                name="Connect"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MentorCard;
