import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['student', 'teacher', 'admin'], 
		required: true
	},
	organisation: String,
	avatarUrl: String,
	specPasscode: {
		type: String,
		required: true,
	},
	groupNumber: Number,
	groupName: String,
},
	{
		timestamps: true,
	},
);

export default mongoose.model('User', UserSchema);