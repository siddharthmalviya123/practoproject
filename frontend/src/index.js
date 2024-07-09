import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App'; // Replace with the path to your App component
import './index.css'
import { Provider } from "react-redux";
import store from './redux/store';



const client = new ApolloClient({
  uri: 'https://practoproject-1.onrender.com/graphql', // Replace with your GraphQL server endpoint
  cache: new InMemoryCache(),
});



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
      </ApolloProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
