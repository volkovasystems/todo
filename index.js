"use strict";

const mongoose = require( "mongoose" );

mongoose.Promise = global.Promise;

const parameter = require( "yargs" ).argv;

let DATABASE_URI = "mongodb://127.0.0.1:8001/todo-database";
if( parameter.production || process.env.NODE_ENV == "production" ){
	DATABASE_URI = "mongodb://todouser:todouser12345@ds141264.mlab.com:41264/todo-database"
}

mongoose.connect( DATABASE_URI, {
	"keepAlive": 1,
	"connectTimeoutMS": 90000,
	"useMongoClient": true

}, ( ) => {
	require( "./todo-schema.js" );
	require( "./todo-server.js" );
	require( "./todo-api.js" );

	SERVICE.listen( 8000, "0.0.0.0", ( error ) => {
		if( error ){
			console.error( "error loading todo server", error );

		}else{
			console.log( "todo server started" );
		}
	} );
} );
