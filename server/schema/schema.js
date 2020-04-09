const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

// dummy data
var books = [
	{ name: 'sample book 1', genre: 'sample genre 1', id: '1' },
	{ name: 'sample book 2', genre: 'sample genre 2', id: '2' },
	{ name: 'sample book 3', genre: 'sample genre 3', id: '3' },
];
// dummy data
var authors = [
	{ name: 'sample author 1', age: '41', id: '1' },
	{ name: 'sample author 2', age: '42', id: '2' },
	{ name: 'sample author 3', age: '43', id: '3' },
];

// define a new object type "BookType"
const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
	}),
});
// define a new object type "AuthorType"
const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		age: { type: GraphQLInt },
		name: { type: GraphQLString },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		// it is going to be name of a query which we use in the client side
		book: {
			type: BookType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parents, args) {
				// code to get data from db / other sources. How gets data while someone is making a request
				return books.find(({ id }) => id === args.id);
			},
		},
		author: {
			type: AuthorType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parents, args) {
				return authors.find(({ id }) => id === args.id);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
