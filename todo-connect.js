"use strict"

import _ from "lodash";

class Todo {
	constructor( ){

	}

	getTodoList( callback ){
		callback = _.once( callback );

		fetch( "/api/todo/all", {
			"method": "GET",
			"headers": {
				"Content-Type": "application/json"
			}
		} )
		.then( ( response ) => {
			callback( null, response.json( ).data );

		}, ( error ) => {
			callback( error, [ ] );
		} );
	}

	addTodo( title, value, callback ){
		callback = _.once( callback );

		fetch( "/api/todo/add", {
			"method": "POST",
			"headers": {
				"Content-Type": "application/json"
			},
			"body": {
				"title": title,
				"value": value
			}
		} )
		.then( ( response ) => {
			callback( null, response.json( ).data );

		}, ( error ) => {
			callback( error, false );
		} );
	}

	removeTodo( reference, callback ){
		callback = _.once( callback );
	}

	editTodo( reference, title, value, callback ){
		callback = _.once( callback );
	}
}
