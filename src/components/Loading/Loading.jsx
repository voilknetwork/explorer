import React, { Component } from "react";
import { Badge, Card, CardBody, CardHeader } from "reactstrap";
import { PanelHeader, CardCategory } from "../../components";
import PropTypes from "prop-types";
import LoadingGif from "../../assets/img/loading.gif";

class Loading extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.header ? <PanelHeader size={"sm"} /> : null}
        <div
          className={"content text-center"}
          style={{ backgroundColor: this.props.color }}
        >
          <Card>
            <CardHeader>
              <CardCategory>Kindly Wait while it is loading!</CardCategory>
            </CardHeader>
            <CardBody>
              <img
                height={"100px"}
                src={LoadingGif}
                alt={"Loading..."}
              />
              <br />
              <Badge color={"warning"}>
                <i className="fas fa-bell" /> {this.props.message}
              </Badge>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

Loading.propTypes = {
  // Where the user to be redirected on clicking the avatar
  color: PropTypes.string,
  message: PropTypes.string,
  header: PropTypes.bool
};

export default Loading;
