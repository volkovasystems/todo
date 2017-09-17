"use strict";

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
