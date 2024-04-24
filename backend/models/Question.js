import mongoose from "mongoose";

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
		// required: function() {
		// 		return this.type !== 'multichoice';
		// }
	},
	options: {
		id: [{
				text: String,
				isCorrect: Boolean
		}],
		// required: function() {
		// 		return this.type === 'multichoice';
		// }
	},
})

export default mongoose.model('Question', QuestionSchema);