import React from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

function InfoCard(props) {
  const info = props.info; 

  return (
    <div>
    <Card style={{ color: "#ffffff", width: '15rem', background:"linear-gradient(45deg, #A0AAE7 40%, #BA92F3 90%)"}}>
      <CardImg className="rounded-circle z-depth-2" top width="100%" style={{ paddingTop: '1em', width: '10rem' , alignSelf: 'center'}}  src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">{info.title}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2">{info.subTitle}</CardSubtitle>
        <CardText style={{color: "#000000"}}>{info.bio}</CardText>
        <CardText>
          <span>
              <a style={{color: "#ffffff", textDecoration: "none"}} href={info.github}>GitHub</a> | <a style={{color: "#ffffff", textDecoration: "none"}} href={info.linkedIn}>LinkedIn</a>
          </span>
        </CardText>
      </CardBody>
    </Card>
  </div>
  )
}
 
export default InfoCard; 