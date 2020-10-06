import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function AuthorList(props) {
	return (
		<table className="table">
			<thead>
			<tr>
				<th>Author ID</th>
				<th>Name</th>
				<th>Delete</th>
			</tr>
			</thead>
			<tbody>
			{props.authors.map(author => {
				return (
					<tr key={author.id}>
						<td>{author.id}</td>
						<td>
							<Link to={"/author/" + author.id}>{author.name}</Link>
						</td>
						<td>
							<button onClick={() => props.deleteAuthor(author.id)} className={'btn btn-outline-danger'}>
								Delete
							</button>
						</td>
					</tr>
				);
			})}
			</tbody>
		</table>
	);
}

AuthorList.propTypes = {
	deleteAuthor: PropTypes.func.isRequired,
	authors: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			authorId: PropTypes.number.isRequired,
			category: PropTypes.string.isRequired
		})
	).isRequired
};

export default AuthorList;
