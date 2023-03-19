import React, { Component } from "react";
import AuthService from "../services/auth.service";
import {
  Card, CardBody, CardTitle, CardSubtitle,
  CardText
} from "reactstrap";
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }
  render() {
    const { currentUser } = this.state;
    return (
      <Card>
            <CardBody className="text-center">
                <CardTitle className="font-weight-bold"><h3>Profile:</h3></CardTitle>
                <CardText>{currentUser.User.email}</CardText>
                <CardSubtitle className="font-weight-bold"><h3>Token:</h3></CardSubtitle>
                <CardText>{currentUser.Token.substring(0, 20)} ...{" "}</CardText>
                <CardText>{currentUser.Token.substr(currentUser.Token.length - 20)}</CardText>
                <CardSubtitle className="font-weight-bold"><h3>ID:</h3></CardSubtitle>
                <CardText>{currentUser.User.id}</CardText>
                <CardSubtitle className="font-weight-bold"><h3>Email:</h3></CardSubtitle>
                <CardText>{currentUser.User.email}</CardText>
                <CardSubtitle className="font-weight-bold"><h3>Name:</h3></CardSubtitle>
                <CardText>{currentUser.User.firstname}</CardText>
                <CardText>{currentUser.User.lastname}</CardText>
            </CardBody>
        </Card>
    );
  }
}