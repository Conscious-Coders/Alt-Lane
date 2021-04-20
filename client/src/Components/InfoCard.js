import React from 'react'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

function InfoCard(props) {
  return (
    <div>
    <Card style={{ color: "#ffffff", width: '15rem', background:"#A0AAE7"}}>
      <CardImg className="rounded-circle z-depth-2" top width="100%" style={{ paddingTop: '1em', width: '10rem' , alignSelf: 'center'}}  src="https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="Card image cap" />
      <CardBody>
        <CardTitle tag="h5">{props.name}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2">{props.subTitle}</CardSubtitle>
        <CardText style={{color: "#000000"}}>{props.bio}</CardText>
      </CardBody>
    </Card>
  </div>
    
    // <div className="d-flex justify-content-center">
    //   <div className="card" style={{ width: '18rem'}}>
    //     <div className="text-center">
    //       <img className="rounded-circle z-depth-2" style={{ width: '10rem'}} src= "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="profile img"/>
    //      </div>
    //      <div className="card-body">
    //       <h5 className="card-title">{props.name}</h5>
    //         <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //     </div>
    //   </div>
    // </div>
  )
}
 
export default InfoCard; 