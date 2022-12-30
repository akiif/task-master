const mongoose = require('mongoose');
const Tasks = require('./Task');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
	},
	username: {
		type: String,
	},
	password: {
		type: String
	},
	userId: {
		type: String,
	},
	googleId: {
		type: String,
	},
	facebookId: {
		type: String
	},
	twitterId: {
		type: String
	},
	githubId: {
		type: String
	},
	tasks: [Tasks.TasksSchema]
});

// UserSchema.pre('save', async (next) => {
// 	let ID = this._id;
// 	this.userID = ID;
// 	next();
// });

module.exports = User = mongoose.model('User', UserSchema);
