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

const GroupSchema = mongoose.Schema({
  name: String,
  students: [{type: UserSchema}]
})

const OptionSchema = mongoose.Schema({
  text: String,
  isCorrect: Boolean,
})

const QuestionSchema = mongoose.Schema({
	question: {
		type: String,
	},
	type: {
		type: String,
		enum: ['short_answer', 'paragraph', 'multichoice'],
	},
	subject: {
		type: String,
		enum: ['C', 'Math', 'English'],
	},
	correctAnswer: {
		type: String,
	},
	options: [{OptionSchema}],
})

const TestSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  ownerId: Number,
  subject: {
    type: String,
  },
  numberOfQuestions: {
    type: Number,
  },
  point: Number,
  duration: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now
  },
  teacherId: String,
  groups: [{type: GroupSchema}],
  questions: [{type: QuestionSchema}]
});


export default mongoose.model('Test', TestSchema);