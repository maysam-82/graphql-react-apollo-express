import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright';
import { getAuthors, addBook, getBookList } from '../../queries/queries';

class AddBook extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			genre: '',
			authorId: '',
		};
	}

	fetchAuthors = () => {
		// since we are using compose, we have to use a name we assigned while exporting default component
		const {
			getAuthors: { loading, authors },
		} = this.props;
		if (loading) {
			return (
				<option className="option" disabled>
					Loading Data ...{' '}
				</option>
			);
		} else {
			return authors.map(({ name, id }) => (
				<option className="option" key={id} value={id}>
					{name}
				</option>
			));
		}
	};
	onChangeHandler = (event) => {
		const {
			target: { name, value },
		} = event;
		this.setState({ [name]: value });
	};
	onFormSubmitHandler = (event) => {
		event.preventDefault();
		const { name, genre, authorId } = this.state;
		// passing variables to mutation
		name &&
			genre &&
			authorId &&
			this.props.addBook({
				variables: {
					name,
					genre,
					authorId,
				},
				// tell apollo to go an refetch a particular query. we specify which query we want to be refetched after addBook mutation execution.
				refetchQueries: [{ query: getBookList }],
			});
	};
	render() {
		const { name, genre } = this.state;
		return (
			<form className="add-book-form" onSubmit={this.onFormSubmitHandler}>
				<div className="form-control-container">
					<label className="label-control">Book Name:</label>
					<input type="text" className="input" onChange={this.onChangeHandler} name="name" value={name} />
				</div>
				<div className="form-control-container">
					<label className="label-control">Genre:</label>
					<input type="text" className="input" name="genre" onChange={this.onChangeHandler} value={genre} />
				</div>
				<div className="form-control-container">
					<label className="label-control">Author:</label>
					<select className="input-select" onChange={this.onChangeHandler} name="authorId">
						<option>Select Author</option>
						{this.fetchAuthors()}
					</select>
				</div>
				<button className="button-add">Add Book</button>
			</form>
		);
	}
}
// use compose method to bind multiple queries
export default compose(graphql(getAuthors, { name: 'getAuthors' }), graphql(addBook, { name: 'addBook' }))(AddBook);
