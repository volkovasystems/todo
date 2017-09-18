"use strict";

import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./todo.scss";

import React from "react";
import ReactDOM from "react-dom";

import TodoPage from "./todo-page.jsx";

ReactDOM.render(
	<TodoPage>
	</TodoPage>,

	document.getElementById( "todo-page" )
);
