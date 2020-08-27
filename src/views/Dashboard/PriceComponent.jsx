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
            median_price {
              base
              quote
            }
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
                value:
                  parseFloat(data.median_price.base) /
                  parseFloat(data.median_price.quote) /
                  10,
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
