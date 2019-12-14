import React from 'react';
import {
  Card,  
  CardText, 
  CardBody, 
  CardTitle, 
  CardSubtitle
} from 'reactstrap';

export const LandingCardView = () => (
  <div>
    <Card className="customCard">
      <CardBody className="customCardBody">
        <CardTitle className="txtSmall">
          YOUR LOCATION
        </CardTitle>
        <CardTitle  className="txtBig">
          Santa Monica
        </CardTitle>
        <CardSubtitle className="text-muted txtMedium"> JANUARY 1, 2018 </CardSubtitle>
      </CardBody>

      <CardBody>
        <CardTitle className="txtSmall">
          YOUR DESTINATION
        </CardTitle>
        <CardTitle className="txtBig">
          SAN FRANCISCO
        </CardTitle>
        <CardSubtitle className="text-muted txtMedium"> JANUARY 1, 2018 </CardSubtitle>
      </CardBody>
      <img 
        src="https://academytravel.com.au/wp-content/uploads/2016/09/7-Top-Destinations-For-Off-Season-Travel-From-November-March.jpg" 
        alt="landing" 
      />
      <CardBody>
        <CardText className="customCardText">
          You are now listening to the powell street cable car. Recorded on Juanuary 1, 2018 by Garett Martocello.
        </CardText>
      </CardBody>
    </Card>
  </div>
)
