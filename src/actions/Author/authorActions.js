import dispatcher from "../../appDispatcher";
import * as authorApi from "../../api/authorApi";
import actionTypes from "./actionTypes";

export function saveAuthor(author) {
	return authorApi.saveAuthor(author).then(savedAuthor => {
		// Hey dispatcher, go tell all the stores that a Author was just created.
		// Hola despachador, ve a decirle a todas las tiendas que se acaba de crear un curso.
		dispatcher.dispatch({
			actionType: author.id ? actionTypes.UPDATE_AUTHOR : actionTypes.CREATE_AUTHOR,
			author: savedAuthor
		});
	})
}

export function loadAuthors() {
	return authorApi.getAuthors().then(authors => {
		dispatcher.dispatch({
			actionType: actionTypes.LOAD_AUTHORS,
			authors: authors
		});
	})
}

export function deleteAuthor(id) {
	return authorApi.deleteAuthor(id).then(() => {
		dispatcher.dispatch({
			actionType: actionTypes.DELETE_AUTHOR,
			id: id
		});
	})
}
