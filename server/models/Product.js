const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
	{
		writer: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		title: {
			type: String,
			maxlength: 50,
		},
		description: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = { Product };
