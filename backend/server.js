
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema.js'; 
import resolvers from './resolvers.js'; 
import mysql from 'mysql2/promise'; // Using promise-based MySQL client
import cors from 'cors';

const app = express();

// CORS configuration to allow all origins
app.use(cors());

const startServer = async () => {
  try {
    const pool = mysql.createPool({
      host: 'localhost',
      user: 'web_app',
      password: 'test123',
      database: 'web_app',
     
    });
  
    await pool.getConnection();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: { pool } 
    });

    await server.start();

    server.applyMiddleware({ app });


    app.listen({ port: 4000 }, () =>
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  } catch (err) {
    console.error('Unable to connect to the database:', err.message);
  }
};

startServer();
