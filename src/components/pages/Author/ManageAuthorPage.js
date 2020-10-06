import React, { useState, useEffect } from "react";
import AuthorForm from "./AuthorForm";
import authorStore from "../../../stores/authorStore";
import { toast } from "react-toastify";
import * as authorActions from "../../../actions/Author/authorActions";

const ManageAuthorPage = props => {
  const [errors, setErrors] = useState({});
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [author, setAuthor] = useState({
    id: null,
    name: ""
  });

  useEffect(() => {
    authorStore.addChangeListener(onChange);
    const id = parseInt(props.match.params.id, 10); // from the path `/author/:id`
    if (authors.length === 0) {
      authorActions.loadAuthors();
    } else if (id) {
      setAuthor(authorStore.getAuthorById(id));
    }
    return () => authorStore.removeChangeListener(onChange);
  }, [authors.length, parseInt(props.match.params.id, 10)]);

  function onChange() {
    setAuthors(authorStore.getAuthors());
  }

  function handleChange({ target }) {
    setAuthor({
      ...author,
      [target.name]: target.value
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!author.name) _errors.name = "Name is required";
    
    setErrors(_errors);
    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    authorActions.saveAuthor(author).then(() => {
      props.history.push("/authors");
      toast.success("Author saved.");
    });
  }

  return (
    <>
      <h2>Manage Author</h2>
      <AuthorForm
        errors={errors}
        author={author}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageAuthorPage;
