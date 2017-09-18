"use strict";

import _ from "lodash";
import jquery from "jquery";

import React from "react";

import Todo from "./todo-connect.js";
import TodoComponent from "./todo-component.jsx";

class TodoPage extends React.PureComponent {
	constructor( ){
		super( );

		this.todo = new Todo( );
	}

	getTodoList( callback ){
		callback = _.once( callback || _.noop );

		this.todo
			.getTodoList( ( error, list ) => {
				if( error ){
					this.setState( {
						"mode": "error",
						"prompt": error.message
					}, callback );

				}else if( !_.isEmpty( list ) ){
					this.setState( {
						"mode": "idle",
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
		callback = _.once( callback || _.noop );

		this.todo
			.addTodo(
				title, value,
				( error, status ) => {
					if( error ){
						this.setState( {
							"mode": "error",
							"prompt": error.message
						}, callback );

					}else if( status ){
						this.setState( {
							"mode": "idle"
						}, callback );

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
		callback = _.once( callback || _.noop );

		this.todo
			.removeTodo(
				reference,
				( error, status ) => {
					if( error ){
						this.setState( {
							"mode": "error",
							"prompt": error.message
						}, callback );

					}else if( status ){
						this.setState( {
							"mode": "idle"
						}, callback );

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
		callback = _.once( callback || _.noop );

		this.todo
			.editTodo(
				reference, title, value,
				( error, status ) => {
					if( error ){
						this.setState( {
							"mode": "error",
							"prompt": error.message
						}, callback );

					}else if( status ){
						this.setState( {
							"mode": "idle"
						}, callback );

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
		callback = _.once( callback || _.noop );

		this.getTodoList( ( ) => {
			this.setState( {
				"title": "",
				"value": "",
				"reference": ""
			}, callback );
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

		const mode = this.state.mode;

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

	componentWillMount( ){
		this.setState( {
			"mode": "idle",
			"prompt": "",
			"title": "",
			"value": "",
			"reference": "",
			"list": [ ]
		} );
	}

	render( ){
		const mode = this.state.mode;

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
								defaultValue={ this.state.title }
							/>
							<textarea
								ref={ ( inputValue ) => { this.inputValue = inputValue; } }
								defaultValue={ this.state.value }
							/>
						</div>
					)
					: undefined
				}
				{
					( mode !== "add" && mode !== "edit" )
					? <TodoComponent
						list={ this.state.list }
						onEditTodo={ ( event, reference, title, value ) => {
							this.onEditTodo( event, reference, title, value );
						} }
						onRemoveTodo={ ( event, reference ) => {
							this.onRemoveTodo( event, reference );
						} }
					>
					</TodoComponent>
					: undefined
				}
				<div
					className="todo-control"
				>
					{
						( mode === "add" || mode === "edit" )
						? [
							<button
								onClick={ ( event ) => {
									this.onSaveTodo( event );
								} }
							>
								Save
							</button>,
							<button
								onClick={ ( event ) => {
									this.onCancelTodo( event );
								} }
							>
								Cancel
							</button>
						]
						: [
							<button
								onClick={ ( event ) => {
									this.onAddTodo( event );
								} }
							>
								Add
							</button>,
							<button
								onClick={ ( event ) => {
									this.onRefreshTodo( event );
								} }
							>
								Refresh
							</button>
						]
					}
				</div>
			</div>
		);
	}

	componentDidMount( ){
		this.refresh( );
	}
}

export default TodoPage;
