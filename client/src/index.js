import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  createHttpLink,
  gql
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: process.env.REACT_APP_StrapiBearerToken,
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

client
  .query({
    query: gql`
      # query GetRates {
      #   rates(currency: "USD") {
      #     currency
      #   }
      # }
      query planets {
        planets(page: 1, pageSize: 2) {
          pagination {
            page
            pageSize
            total
          }
          nodes {
            id
            name
            description
            code
            pictureUrl
            population
            characters(limit: 3) {
              id
            }
          }
        }
      }
    `
  })
  .then(result => console.log(result));

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();