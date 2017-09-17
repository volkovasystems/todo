"use strict";

const mongoose = require( "mongoose" );

const parameter = require( "yargs" ).argv;

let DATABASE_URI = "mongodb://0.0.0.0:8001/todo-database";
if( parameter.production || process.env.NODE_ENV = "production" ){
	DATABASE_URI = "mongodb://todouser:todouser12345@ds141264.mlab.com:41264/todo-database"
}

mongoose.connect( DATABASE_URI, {
	"server": {
		"socketOptions": {
			"keepAlive": 1,
			"connectTimeoutMS": 90000
		}
	},

	"replset": {
		"socketOptions": {
			"keepAlive": 1,
			"connectTimeoutMS" : 90000
		}
	}
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
