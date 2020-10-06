import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import courseStore from "../../../stores/courseStore";
import { toast } from "react-toastify";
import * as courseActions from "../../../actions/Course/courseActions";
import authorStore from "../../../stores/authorStore";
import {loadAuthors} from "../../../actions/Author/authorActions";

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  
  useEffect(() => {
    courseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; // from the path `/Course/:slug`
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses());
  }
  
  
  useEffect(() => {
    authorStore.addChangeListener(onChangeAuthor);
    if (authors.length === 0) loadAuthors();
    return () => authorStore.removeChangeListener(onChangeAuthor); // limpiar al desmontar
  }, [authors.length]);
  
  function onChangeAuthor() {
    setAuthors(authorStore.getAuthors());
  }
  
  function handleChange({ target }) {
    setCourse({
      ...course,
      [target.name]: target.value
    });
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author ID is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);
    // Form is valid if the errors object has no properties
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("Course saved.");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        authors={authors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
