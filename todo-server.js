"use strict";

const _ = require( "lodash" );
const express = require( "express" );
const bodyParser = require( "body-parser" );
const compression = require( "compression" );
const methodOverride = require( "method-override" );
const cookieParser = require( "cookie-parser" );

global.SERVICE = express( );

SERVICE.use( bodyParser.urlencoded( {
	"extended": false,
	"limit": "50mb"
} ) );

SERVICE.use( bodyParser.json( {
	"limit": "50mb"
} ) );

SERVICE.use( cookieParser( ) );

SERVICE.use( methodOverride( ) );

SERVICE.use( compression( {
	"level": 9
} ) );

SERVICE.use( ( request, response, next ) => {
	let cleanUp = _.once( ( ) => {
		process.nextTick( ( ) => {
			request.removeAllListeners( );

			response.removeAllListeners( );
		} );
	} );

	request.once( "error",
		function onError( ){
			console.error( "error on request", arguments );

			cleanUp( );
		} );

	response.once( "error",
		function onError( ){
			console.error( "error on response", arguments );

			cleanUp( );
		} );

	response.once( "close", cleanUp );

	response.once( "finish", cleanUp );

	next( );
} );

SERVICE.on( "error", ( ) => {
	console.error( "error on middleware", arguments );
} );

SERVICE.use( express.static( __dirname ) );

process.nextTick( ( ) => {
	SERVICE.use( ( request, response ) => {
		response
			.status( 404 )
			.json( {
				"status": "undefined",
				"data": "no operation"
			} );
	} );
} );
