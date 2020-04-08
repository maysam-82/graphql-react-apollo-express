const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const app = express();

// create a middleware as a single route. and this route will be like an end point to interact with endpoint data . graphqlHTTP will be called as soon as getting a request to /graphql route
app.use(
	'/graphql',
	graphqlHTTP({
		// shcema should be passed here
		schema,
	})
);

app.listen(4000, () => {
	console.log('Listening for requests on port 4000');
});
