"use strict";

const mongoose = require( "mongoose" );
const shortID = require( "shortid" );

const Schema = mongoose.Schema;

const Todo = new Schema( {
	"reference": {
		"type": String,
		"unique": true,
		"default": shortID.generate
	},
	"title": {
		"type": String,
		"default": ""
	},
	"value": {
		"type": String,
		"default": ""
	},
	"timestamp": {
		"type": Date,
		"default": Date.now
	}
} );

mongoose.model( "Todo", Todo );
