const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var books = [
	{ name: 'sample book 1', genre: 'sample genre 1', id: '1' },
	{ name: 'sample book 2', genre: 'sample genre 2', id: '2' },
	{ name: 'sample book 3', genre: 'sample genre 3', id: '3' },
];

// define a new object type "BookType"
const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		// it is going to be name of a query which we use in the client side
		book: {
			type: BookType,
			args: {
				id: { type: GraphQLString },
			},
			resolve(parents, args) {
				// code to get data from db / other sources. How gets data while someone is making a request
				return books.find(({ id }) => id === args.id);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
