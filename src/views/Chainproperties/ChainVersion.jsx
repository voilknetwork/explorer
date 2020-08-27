import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table
} from "reactstrap";
import { CardCategory } from "components";
import Loading from "../../components/Loading/Loading";

const query = gql`
  {
    version {
      blockchain_version
      voilk_revision
      fc_revision
    }
  }
`;

class ChainVersion extends Component {
  getVersion() {
    let data = this.props.data;
    if (data.loading) {
      return <Loading color={"white"} message={"Loading Chain Version... "} />;
    } else {
      return (
        <Card>
          <CardHeader>
            <CardCategory>{data.version.__typename}</CardCategory>
            <CardTitle tag="h4">{data.version.__typename}</CardTitle>
          </CardHeader>
          <CardBody>
            <Table responsive>
              <thead className=" text-primary">
                <tr>
                  <th>Property Name</th>
                  <th className="text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data.version).map((prop, key) => {
                  return (
                    <tr key={key}>
                      <td>{prop}</td>
                      <td className="text-right">
                        <Badge color="warning">{data.version[prop]}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      );
    }
  }
  render() {
    return <div>{this.getVersion()}</div>;
  }
}

export default graphql(query)(ChainVersion);
