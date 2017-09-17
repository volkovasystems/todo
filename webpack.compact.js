require( "graceful-fs" ).gracefulify( require( "fs" ) );

const nchunk = require( "nchunk" );
const path = require( "path" );
const plough = require( "plough" );
const webpack = require( "webpack" );

const BowerResolvePlugin = require( "bower-resolve-webpack-plugin" );
const DefinePlugin = webpack.DefinePlugin;
const ModuleConcatenationPlugin = webpack.optimize.ModuleConcatenationPlugin;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = function build( parameter ){
	parameter = parameter || { };

	return {
		"entry": "./todo.jsx",

		"resolve": {
			"descriptionFiles": [
				"package.json",
				"bower.json"
			],
			"modules": [
				"node_modules",
				"bower_components"
			],
			"mainFields": [
				"support",
				"browser",
				"module",
				"main"
			],
			"plugins": [ new BowerResolvePlugin( ) ]
		},

		"output": {
			"library": "todo",
			"libraryTarget": "umd",
			"filename": "todo.deploy.js"
		},

		"module": {
			"rules": [
				{
					"test": /\.jsx$/,
					"use": [ "babel-loader" ]
				},

				{
					"test": /\.(scss|sass)$/,
					"use": [
						{
							"loader": "style-loader",
							"options": { "singleton": true }
						},
						{
							"loader": "css-loader",
							"options": { "sourceMap": true }
						},
						{
							"loader": "resolve-url-loader",
							"options": { "sourceMap": true }
						},
						{
							"loader": "sass-loader",
							"options": { "sourceMap": true }
						}
					]
				},

				{
					"test": /\.css$/,
					"use": [
						{
							"loader": "style-loader",
							"options": { "singleton": true }
						},
						{
							"loader": "css-loader",
							"options": { "sourceMap": true }
						},
						{
							"loader": "resolve-url-loader",
							"options": { "sourceMap": true }
						}
					]
				},

				{
					"test": /\.(ttf|svg|eot|woff2?)$/,
					"use": [ "url-loader" ]
				}
			]
		},

		"externals": {
			"React": "react",
			"ReactDOM": "react-dom",
			"$": "jquery",
			"jQuery": "jquery"
		},

		"plugins": plough( [
			new DefinePlugin( {
				"process.env.NODE_ENV": '"production"'
			} ),

			new ModuleConcatenationPlugin( ),

			nchunk(
				"lodash",
				"jquery",
				"bootstrap",
				"react",
				{ "extension": "deploy.js" }
			),

			new UglifyJsPlugin( {
				"compress": {
					"keep_fargs": true,
					"keep_fnames": true,
					"keep_infinity": true,
					"warnings": false,
					"passes": 3
				},
				"mangle": {
					"keep_fnames": true
				},
				"comments": false,
				"sourceMap": true
			} )
		] ),

		"devtool": "#source-map",

		"stats": { "warnings": true }
	}
};
