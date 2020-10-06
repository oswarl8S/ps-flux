import React, {useEffect, useState} from "react";
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import {Link} from "react-router-dom";
import {deleteCourse, loadCourses} from "../actions/courseActions";

function CoursesPage() {
	const [courses, setCourses] = useState(courseStore.getCourses());
	
	useEffect(() => {
		courseStore.addChangeListener(onChange);
		if (courses.length === 0) loadCourses();
		return () => courseStore.removeChangeListener(onChange); // limpiar al desmontar
	}, [courses.length]);
	
	function onChange() {
		setCourses(courseStore.getCourses());
	}
	
	return (
		<>
			<h2>Courses</h2>
			<Link className="btn btn-primary " to="/course">
				Add Course
			</Link>
			<CourseList courses={courses} deleteCourse={deleteCourse}/>
		</>
	);
}

export default CoursesPage;
