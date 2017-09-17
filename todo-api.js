"use strict";

const _ = require( "lodash" );
const express = require( "express" );
const mongoose = require( "mongoose" );

const Todo = mongoose.model( "Todo" );

const TODO = express.Router( );

TODO.all( "*", ( request, response, next ) => {
	response.setHeader( "Cache-Control", [
		"no-cache",
		"private",
		"no-store",
		"must-revalidate",
		"proxy-revalidate",
		"max-stale=0",
		"post-check=0",
		"pre-check=0"
	] );

	response.setHeader( "Expires", "0" );

	response.setHeader( "Pragma", "no-cache" );

	next( );
} );

TODO.get( "/all", ( request, response ) => {
	Todo
		.find( { } )
		.sort( "timestamp" )
		.lean( )
		.exec( ( error, todoList ) => {
			if( error ){
				response
					.status( 500 )
					.json( {
						"status": "error",
						"data": error.message
					} );

			}else if( !_.isEmpty( todoList ) ){
				response
					.status( 200 )
					.json( {
						"status": "success",
						"data": todoList
					} );

			}else{
				response
					.status( 200 )
					.json( {
						"status": "success",
						"data": [ ]
					} );
			}
		} );
} );

TODO.post( "/add", ( request, response ) => {
	let { title, value } = request.body;

	if(
		!title
		|| !value
	){
		response
			.status( 403 )
			.json( {
				"status": "failed",
				"data": "incomplete parameter"
			} );

		return;
	}

	( new Todo( {
		"title": title,
		"value": value
	} ) )
	.save( ( error ) => {
		if( error ){
			response
				.status( 500 )
				.json( {
					"status": "error",
					"data": error.message
				} );

		}else{
			response
				.status( 200 )
				.json( {
					"status": "success",
					"data": true
				} );
		}
	} );
} );

TODO.put( "/:reference/edit", ( request, response ) => {
	let reference = request.params.reference;
	let { title, value } = request.body;

	Todo
		.update( {
			"reference": reference
		}, {
			$set: {
				"title": title,
				"value": value
			}
		} )
		.exec( ( error, count ) => {
			if( error ){
				response
					.status( 500 )
					.json( {
						"status": "error",
						"data": error.message
					} );

			}else if( count === 1 ){
				response
					.status( 200 )
					.json( {
						"status": "success",
						"data": true
					} );

			}else{
				response
					.status( 200 )
					.json( {
						"status": "failed",
						"data": false
					} );
			}
		} );
} );

TODO.delete( "/:reference/remove", ( request, response ) => {
	let reference = request.params.reference;

	Todo
		.remove( {
			"reference": reference
		} )
		.exec( ( error ) => {
			if( error ){
				response
					.status( 500 )
					.json( {
						"status": "error",
						"data": error.message
					} );

			}else{
				response
					.status( 200 )
					.json( {
						"status": "success",
						"data": true
					} );
			}
		} );
} );

TODO.use( ( request, response ) => {
	response
		.status( 404 )
		.json( {
			"status": "undefined",
			"data": "no operation"
		} );
} );

SERVICE.use( "/api/todo", TODO );
