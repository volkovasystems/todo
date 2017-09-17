"use strict";

import _ from "lodash";
import jquery from "jquery";

import React from "react";
import ReactDOM from "react-dom";

import Todo from "todo-connect.js";
import TodoComponent from "todo-component.jsx";

class TodoPage extends React.PureComponent {
	constructor( ){
		this.todo = new Todo( );

		this.setState( {
			"mode": "idle",
			"prompt": "",
			"title": "",
			"value": "",
			"reference": "",
			"list": [ ]
		} );
	}

	getTodoList( callback ){
		callback = _.once( callback );

		todo.getTodoList( ( error, list ) => {
			if( error ){
				this.setState( {
					"mode": "error",
					"prompt": error.message
				}, callback );

			}else if( !_.isEmpty( list ) ){
				this.setState( {
					"list": list
				}, callback );

			}else{
				this.setState( {
					"mode": "notify",
					"prompt": "todo list is empty",
					"list": [ ]
				}, callback );
			}
		} );
	}

	addTodo( title, value, callback ){
		callback = _.once( callback );

		todo.addTodo(
			title, value,
			( error, status ) => {
				if( error ){
					this.setState( {
						"mode": "error",
						"prompt": error.message
					}, callback );

				}else if( status ){
					callback( );

				}else{
					this.setState( {
						"mode": "notify",
						"prompt": "cannot add todo"
					}, callback );
				}
			}
		);
	}

	removeTodo( reference, callback ){
		callback = _.once( callback );

		todo.editTodo(
			reference,
			( error, status ) => {
				if( error ){
					this.setState( {
						"mode": "error",
						"prompt": error.message
					}, callback );

				}else if( status ){
					callback( );

				}else{
					this.setState( {
						"mode": "notify",
						"prompt": "cannot remove todo"
					}, callback );
				}
			}
		);
	}

	editTodo( reference, title, value, callback ){
		callback = _.once( callback );

		todo.editTodo(
			reference, title, value,
			( error, status ) => {
				if( error ){
					this.setState( {
						"mode": "error",
						"prompt": error.message
					}, callback );

				}else if( status ){
					callback( );

				}else{
					this.setState( {
						"mode": "notify",
						"prompt": "cannot edit todo"
					}, callback );
				}
			}
		);
	}

	refresh( callback ){
		this.getTodoList( ( ) => {
			this.setState( {
				"title": "",
				"value": "",
				"reference": ""
			}, _.once( callback ) );
		} );
	}

	onRefreshTodo( event ){
		event.preventDefault( );

		this.refresh( );
	}

	onAddTodo( event ){
		event.preventDefault( );

		this.setState( {
			"mode": "add",
			"prompt": "",
			"title": "",
			"value": "",
			"reference": "",
		} );
	}

	onRemoveTodo( event, reference ){
		event.preventDefault( );

		this.removeTodo( reference, ( ) => {
			this.refresh( );
		} );
	}

	onEditTodo( event, reference, title, value ){
		event.preventDefault( );

		this.setState( {
			"mode": "edit",
			"reference": reference,
			"title": title,
			"value": value
		} );
	}

	onSaveTodo( event ){
		event.preventDefault( );

		let mode = this.state.mode;

		if( mode === "add" ){
			this.addTodo(
				this.inputTitle.value,
				this.inputValue.value,
				( ) => {
					this.refresh( );
				}
			);

		}else if( mode === "edit" ){
			this.editTodo(
				this.state.reference,
				this.inputTitle.value,
				this.inputValue.value,
				( ) => {
					this.refresh( );
				}
			);
		}
	}

	onCancelTodo( event ){
		event.preventDefault( );

		this.refresh( );
	}

	render( ){
		return (
			<div
				className="todo-page"
			>
				<h1>
					Todo
				</h1>
				{
					( mode === "add" )
					? (
						<div
							className="add-todo"
						>
							<h2>
								Add Todo
							</h2>
							<input
								type="text"
								ref={ ( inputTitle ) => { this.inputTitle = inputTitle; } }
							/>
							<textarea
								ref={ ( inputValue ) => { this.inputValue = inputValue; } }
							>
							</textarea>
						</div>
					)
					: ( mode === "edit" )
					? (
						<div
							className="edit-todo"
						>
							<h2>
								Edit Todo
							</h2>
							<input
								type="text"
								ref={ ( inputTitle ) => { this.inputTitle = inputTitle; } }
							/>
							<textarea
								ref={ ( inputValue ) => { this.inputValue = inputValue; } }
							>
							</textarea>
						</div>
					)
					: undefined
				}
				<TodoComponent
					list={ this.state.list }
					onEditTodo={ this.onEditTodo }
					onRemoveTodo={ this.onRemoveTodo }
				>
				</TodoComponent>
				<div
					className="todo-control"
				>
					{
						(
							mode === "add"
							|| mode === "edit"
						)
						? (
							<button
								onClick={ this.onSaveTodo }
							>
								Save
							</button>
							<button
								onClick={ this.onCancelTodo }
							>
								Cancel
							</button>
						)
						: (
							<button
								onClick={ this.onAddTodo }
							>
								Add
							</button>
							<button
								onClick={ this.onRefreshTodo }
							>
								Refresh
							</button>
						)
					}
				</div>
			</div>
		);
	}
}
