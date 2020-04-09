const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

// Every book has an Author and every Author has a collection of books.
// dummy data
var books = [
	{ name: 'sample book 1', genre: 'sample genre 1', id: '1', authorId: '100' },
	{ name: 'sample book 2', genre: 'sample genre 2', id: '2', authorId: '110' },
	{ name: 'sample book 3', genre: 'sample genre 3', id: '3', authorId: '120' },
	{ name: 'sample book 4', genre: 'sample genre 4', id: '4', authorId: '110' },
	{ name: 'sample book 5', genre: 'sample genre 5', id: '5', authorId: '120' },
	{ name: 'sample book 6', genre: 'sample genre 6', id: '6', authorId: '110' },
	{ name: 'sample book 7', genre: 'sample genre 7', id: '7', authorId: '100' },
];
// dummy data
var authors = [
	{ name: 'sample author 1', age: '41', id: '100' },
	{ name: 'sample author 2', age: '42', id: '110' },
	{ name: 'sample author 3', age: '43', id: '120' },
];

// define a new object type "BookType"
const BookType = new GraphQLObjectType({
	name: 'Book',
	// if we wrap items inside this function, still runnig the code from top to bottom but we are not executing this function until the whole file is run.
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		// sending back the author associated with relevant book
		author: {
			type: AuthorType,
			// resolve function is for grabbing data
			resolve(parents, args) {
				// parent here is books object which contains authorId
				return authors.find(({ id }) => id === parents.authorId);
			},
		},
	}),
});
// define a new object type "AuthorType"
const AuthorType = new GraphQLObjectType({
	name: 'Author',
	// if we wrap items inside this function, still runnig the code from top to bottom but we are not executing this function until the whole file is run.
	fields: () => ({
		id: { type: GraphQLID },
		age: { type: GraphQLInt },
		name: { type: GraphQLString },
		books: {
			// It is going to be a list of BookTypes
			type: new GraphQLList(BookType),
			resolve(parents, args) {
				return books.filter(({ authorId }) => authorId === parents.id);
			},
		},
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
