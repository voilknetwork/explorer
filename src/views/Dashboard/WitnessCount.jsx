import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import InfoItem from "../../components/InfoPanel/InfoItem";

class WitnessCount extends Component {
  render() {
    return (
      <Query
        query={gql`
          {
            witness_count {
              count
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <InfoItem
                info={{
                  icon_color: "icon icon-warning",
                  icon: "fas fa-user-secret",
                  value: "Loading...",
                  fname: "Witnesses"
                }}
              />
            );
          if (error) return <p>Error :(</p>;

          return (
            <InfoItem
              info={{
                icon_color: "icon icon-warning",
                icon: "fas fa-user-secret",
                value: data.witness_count.count,
                fname: "Witnesses"
              }}
            />
          );
        }}
      </Query>
    );
  }
}

export default WitnessCount;
