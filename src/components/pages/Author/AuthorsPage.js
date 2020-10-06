import React, {useEffect, useState} from "react";
import authorStore from "../../../stores/authorStore";
import AuthorList from "./AuthorList";
import {Link} from "react-router-dom";
import {deleteAuthor, loadAuthors} from "../../../actions/Author/authorActions";

function AuthorsPage() {
	const [authors, setAuthors] = useState(authorStore.getAuthors());
	
	useEffect(() => {
		authorStore.addChangeListener(onChange);
		if (authors.length === 0) loadAuthors();
		return () => authorStore.removeChangeListener(onChange); // limpiar al desmontar
	}, [authors.length]);
	
	function onChange() {
		setAuthors(authorStore.getAuthors());
	}
	
	return (
		<>
			<h2>Authors</h2>
			<Link className="btn btn-primary " to="/author">
				Add Author
			</Link>
			<AuthorList authors={authors} deleteAuthor={deleteAuthor}/>
		</>
	);
}

export default AuthorsPage;
