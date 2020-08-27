import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import InfoItem from "../../components/InfoPanel/InfoItem";

class UserCount extends Component {
  render() {
    return (
      <Query
        query={gql`
          {
            accounts_count {
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
                  icon_color: "icon icon-primary",
                  icon: "fa fa-users",
                  value: "Loading...",
                  fname: "Members"
                }}
              />
            );
          if (error) return <p>Error :(</p>;

          return (
            <InfoItem
              info={{
                icon_color: "icon icon-primary",
                icon: "fa fa-users",
                value: data.accounts_count.count,
                fname: "Members"
              }}
            />
          );
        }}
      </Query>
    );
  }
}

UserCount.propTypes = {};

export default UserCount;
