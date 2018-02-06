import "./index.css";

import React from "react";
import { render } from "react-dom";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { link } from "./graphql/link";
import App from "./App";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

render(
  <Router>
    <div>
      <Link to="/error" >Error page</Link>
      <ApolloProvider client={client}>
        <div>
          <Route path="/error" component={App} />
          <Route path="/clean" component={() => <div>Clean</div>} />
        </div>
      </ApolloProvider>

    </div>
  </Router>,
  document.getElementById("root")
);
