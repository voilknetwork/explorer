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
    chain_properties {
      account_creation_fee
      maximum_block_size
      vsd_interest_rate
      account_subsidy_budget
      account_subsidy_decay
    }
  }
`;

class ChainProps extends Component {
  getChainProperties() {
    let data = this.props.data;
    if (data.loading) {
      return <Loading color={"white"} message={"Getting Chain Properties..."}/>;
    } else {
      return (
        <Card>
          <CardHeader>
            <CardCategory>{data.chain_properties.__typename}</CardCategory>
            <CardTitle tag="h4">{data.chain_properties.__typename}</CardTitle>
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
                {Object.keys(data.chain_properties).map((prop, key) => {
                  return (
                    <tr key={key}>
                      <td>{prop}</td>
                      <td className="text-right">
                        <Badge color="primary">
                          {data.chain_properties[prop]}
                        </Badge>
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
    return <div>{this.getChainProperties()}</div>;
  }
}
export default graphql(query)(ChainProps);
