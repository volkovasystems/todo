"use strict";

import _ from "lodash";

import React from "react";

class TodoComponent extends React.PureComponent {
	render( ){
		return (
			<div
				className="todo-component"
			>
				<ul
					className="todo-list"
				>
					{
						this.props.list.map( ( item ) => {
							<li
								key={ item.reference }
								className="todo-item"
							>
								<div
									className="todo-item-body"
								>
									<h4>
										{ item.title }
									</h4>
									<p>
										{ item.value }
									</p>
								</div>
								<div
									className="todo-item-control"
								>
									<button
										className="remove-todo-item material-icons"
										title="Remove"
										onClick={ ( event ) => {
											this.props.onRemoveTodo( event, item.reference );
										} }
									>
										remove
									</button>
									<button
										className="edit-todo-item material-icons"
										title="Edit"
										onClick={ ( event ) => {
											this.props.onEditTodo(
												event,
												item.reference,
												item.title,
												item.value
											);
										} }
									>
										edit
									</button>
								</div>
							</li>
						} )
					}
				</ul>
			</div>
		);
	}
}
