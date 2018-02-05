import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    console.log('componentDidCatch');
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      console.log('rendering error page');
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

class FailingComponent extends Component {
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  render() {
    const { data: { loading, error, people } } = this.props;

    if (error) {
      throw new Error('error');
    }

    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in
            Apollo Client. Edit the source code and watch your browser window
            reload with the changes.
          </p>
          <p>
            The code which renders this component lives in{" "}
            <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and
            ids.
          </p>
        </header>
        {loading ? (
          <p>Loading…</p>
        ) : (
          <ul>
            {people.map(person => <li key={person.id}>{person.name}</li>)}
          </ul>
        )}
      </main>
    );
  }
}

const FailingComponentWithApollo = graphql(
  gql`
    query ErrorTemplate {
      people {
        id
        name
      }
    }
  `
)(FailingComponent);

export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <FailingComponentWithApollo/>
      </ErrorBoundary>
    );
  }
}

