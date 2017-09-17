"use strict";

const _ = require( "lodash" );
const express = require( "express" );

const parameter = require( "yargs" ).argv;

const TODO = express.Router( );

TODO.get( "/all", ( request, response ) => {

} );

TODO.post( "/add", ( request, response ) => {

} );

TODO.post( "/:reference/edit", ( request, response ) => {

} );


SERVICE.use( "/api/todo", TODO );
