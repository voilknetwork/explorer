import React from "react";
import { Row, Col } from "reactstrap";
import { PanelHeader } from "components";
import ChainProps from "./ChainProps";
import DynamicProps from "./DynamicProps";
import InfoPanel from "../../components/InfoPanel/InfoPanel";
import ChainVersion from "./ChainVersion";

class ChainProperties extends React.Component {
  render() {
    return (
      <React.Fragment>
        <PanelHeader size="sm" />
        <div className="content">
          <InfoPanel />
          <Row>
            <Col xs={12} md={6}>
              <DynamicProps />
            </Col>
            <Col xs={12} md={6}>
              <ChainVersion />
              <ChainProps />
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default ChainProperties;
