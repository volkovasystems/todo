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
			return response.json( );
		} )
		.then( ( result ) => {
			callback( null, result.data );
		} )
		.catch( ( error ) => {
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
			"body": JSON.stringify( {
				"title": title,
				"value": value
			} )
		} )
		.then( ( response ) => {
			return response.json( );
		} )
		.then( ( result ) => {
			callback( null, result.data );
		} )
		.catch( ( error ) => {
			callback( error, false );
		} );
	}

	removeTodo( reference, callback ){
		callback = _.once( callback );

		fetch( `/api/todo/${ reference }/remove`, {
			"method": "DELETE",
			"headers": {
				"Content-Type": "application/json"
			}
		} )
		.then( ( response ) => {
			return response.json( );
		} )
		.then( ( result ) => {
			callback( null, result.data );
		} )
		.catch( ( error ) => {
			callback( error, false );
		} );
	}

	editTodo( reference, title, value, callback ){
		callback = _.once( callback );

		fetch( `/api/todo/${ reference }/edit`, {
			"method": "PUT",
			"headers": {
				"Content-Type": "application/json"
			},
			"body": JSON.stringify( {
				"title": title,
				"value": value
			} )
		} )
		.then( ( response ) => {
			return response.json( );
		} )
		.then( ( result ) => {
			callback( null, result.data );
		} )
		.catch( ( error ) => {
			callback( error, false );
		} );
	}
}

export default Todo;
