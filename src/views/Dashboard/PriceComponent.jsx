import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import InfoItem from "../../components/InfoPanel/InfoItem";

class PriceComponent extends Component {
  render() {
    return (
      <Query
        query={gql`
          {
            get_current_value
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <InfoItem
                info={{
                  icon_color: "icon icon-success",
                  icon: "now-ui-icons business_money-coins",
                  value: "Loading ...",
                  fname: "Price Per Unit"
                }}
              />
            );
          if (error) return <p>Error :(</p>;

          return (
            <InfoItem
              info={{
                icon_color: "icon icon-success",
                icon: "now-ui-icons business_money-coins",
                value: data.get_current_value,
                symbol: "$",
                fname: "Price Per Unit"
              }}
            />
          );
        }}
      </Query>
    );
  }
}

export default PriceComponent;
