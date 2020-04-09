const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

// Every book has an Author and every Author has a collection of books.
// dummy data
var books = [
	{ name: 'Learning Graphql', genre: 'Education', id: '1', authorId: '100' },
	{ name: 'Learning  React', genre: 'Technology', id: '2', authorId: '110' },
	{ name: 'Learning  Apollo', genre: 'Technology', id: '3', authorId: '120' },
	{ name: 'Learning  Redux', genre: 'Education', id: '4', authorId: '110' },
	{ name: 'Learning  HTML', genre: 'Internet', id: '5', authorId: '120' },
	{ name: 'Learning  CSS', genre: 'Internet', id: '6', authorId: '110' },
	{ name: 'Learning  JavaScript', genre: 'Computer programming', id: '7', authorId: '100' },
];
// dummy data
var authors = [
	{ name: 'Maysam', age: '41', id: '100' },
	{ name: 'Maysam-82', age: '42', id: '110' },
	{ name: 'Sample Instructor', age: '43', id: '120' },
];

const setRandomId = () => {
	const now = new Date();
	return (
		now.getFullYear() +
		now.getMonth() +
		now.getDate() +
		now.getHours() +
		now.getMinutes() +
		now.getSeconds() +
		now.getMilliseconds()
	);
};

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
			resolve(parent, args) {
				// parent here is books object which contains authorId
				return authors.find(({ id }) => id === parent.authorId);
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
			resolve(parent, args) {
				return books.filter(({ authorId }) => authorId === parent.id);
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
			resolve(parent, args) {
				// code to get data from db / other sources. How gets data while someone is making a request
				return books.find(({ id }) => id === args.id);
			},
		},
		author: {
			type: AuthorType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, args) {
				return authors.find(({ id }) => id === args.id);
			},
		},
		// it will return list of books and their authors since they connected to their relevant authors
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return books;
			},
		},
		// it will return list of authors and their books since they connected to their relevant books
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return authors;
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		// adding new author to the dummy authors data
		addAuthor: {
			type: AuthorType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				age: { type: new GraphQLNonNull(GraphQLInt) },
			},
			resolve(parent, args) {
				const { name, age } = args;
				const id = setRandomId();
				const author = { name, age, id };
				authors = [...authors, author];
				return author;
			},
		},
		addBook: {
			type: BookType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				genre: { type: new GraphQLNonNull(GraphQLString) },
				authorId: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				const { name, genre, authorId } = args;
				const id = setRandomId();
				const book = { name, genre, authorId, id };
				books = [...books, book];
				return book;
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
