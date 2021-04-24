import React from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

function InfoCard(props) {
  const info = props.info; 

  return (
    <div>
    <Card className="shadow p-3 mb-5 bg-body rounded" style={{ color: "black", width: '18rem', height:'28rem', background:"linear-gradient(345deg, #B2C3EE 20%, #D6C5F9 90%"}}>
      <CardImg className="rounded-circle z-depth-2" top width="100%" style={{ paddingTop: '1rem', width: '10rem' , alignSelf: 'center'}}  src={info.img} alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h3" style={{fontFamily: "'Chivo', sans-serif"}}>{info.title}</CardTitle>
        <CardSubtitle tag="h6" style={{fontFamily: "'Chivo', sans-serif"}}>{info.subTitle}</CardSubtitle>
        <CardText style={{fontFamily: "'Sarala', sans-serif",marginTop:"1rem", color:"#3c3b3d"}}>{info.bio}</CardText>
        <CardText className="infoCardBody" style={{fontFamily: "'Sarala', sans-serif"}}>
          <span>
              <a style={{color: "black", textDecoration: "none"}} href={info.github}>GitHub</a> | <a style={{color: "black", textDecoration: "none"}} href={info.linkedIn}>LinkedIn</a>
          </span>
        </CardText>
      </CardBody>
    </Card>
  </div>
  )
}
 
export default InfoCard; 