import { graphql, print } from "graphql";
import { ApolloLink, Observable } from "apollo-link";

import { schema } from "./schema";

export const link = new ApolloLink(operation => {
  return new Observable(observer => {
    const { query, operationName, variables } = operation;
    delay(300)
      .then(() =>
        graphql(schema, print(query), null, null, variables, operationName)
      )
      .then(result => {
        console.log('triggering error');
        observer.error(new Error('error'));
        // observer.next(result);
        // observer.complete();
      })
      .catch(observer.error.bind(observer));
  });
});

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
