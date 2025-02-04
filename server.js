const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env' });
// const Recipe = require('./models/Recipe.js');
const User = require('./models/User.js');
const Location = require('./models/Location.js')

// Bring in Graphql-express middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});


// connects to database
mongoose
    .connect('mongodb+srv://ant:ant123@cluster0-bse6j.mongodb.net/howsthewater?retryWrites=true&w=majority')
    .then(() => console.log('DB connected'))
    .catch(err => console.error(err));


// Initializes application
const app = express();

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }
))

// conect schemas with graphql
app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema,
    context: {
        // Recipe,
        User,
        Location
    }

}));


const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);

});

//    .connect(process.env.MONGO_URI)
