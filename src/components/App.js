import React from "react";
import Header from "./common/Header";

import HomePage from "./pages/Home/HomePage";

import AboutPage from "./pages/About/AboutPage";

import CoursesPage from "./pages/Course/CoursesPage";
import ManageCoursePage from "./pages/Course/ManageCoursePage";

import AuthorsPage from "./pages/Author/AuthorsPage";
import ManageAuthorPage from "./pages/Author/ManageAuthorPage";

import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import {Redirect, Route, Switch} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div className="container-fluid">
            <ToastContainer autoClose={3000} hideProgressBar/>
            <Header/>
            <Switch>
                <Route path="/" exact component={HomePage}/>
                
                <Route path="/courses" exact component={CoursesPage}/>
                <Route path="/course" exact component={ManageCoursePage}/>
                <Route path="/course/:slug" exact component={ManageCoursePage}/>
                
                <Route path="/authors" exact component={AuthorsPage}/>
                <Route path="/author" exact component={ManageAuthorPage}/>
                <Route path="/author/:id" exact component={ManageAuthorPage}/>
                
                <Route path="/about" exact component={AboutPage}/>
                <Redirect from="/about-page" to="about"/>
                <Route component={NotFoundPage}/>
            </Switch>
    </div>
  );
}

export default App;
