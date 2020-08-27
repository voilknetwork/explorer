import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import indexRoute from "routes/index.jsx";

const hist = createBrowserHistory();
const client = new ApolloClient({
  uri: "https://graphql.voilk.com/graphql"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={hist}>
      <Switch>
        {indexRoute.map((prop, key) => {
          return (
            <Route path={prop.path} key={key} component={prop.component} />
          );
        })}
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
