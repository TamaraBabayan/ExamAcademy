import mongoose from "mongoose";

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
		// required: function() {
		// 		return this.type !== 'multichoice';
		// }
	},
	options: [{OptionSchema}],
		// required: function() {
		// 		return this.type === 'multichoice';
		// }
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
  questions: [{type: QuestionSchema}]
  //   {
  //   question: {
  //     type: String,
  //   },
  //   type: {
  //     type: String,
  //     enum: ['short_answer', 'paragraph', 'multichoice'],
  //   },
  //   subject: {
  //     type: String,
  //     enum: ['C', 'Math', 'English'],
  //   },
  //   correctAnswer: {
  //     type: String,
  //   },
  //   options: {
  //     id: [{
  //         text: String,
  //         isCorrect: Boolean
  //     }],
  //   },
  // }]
  
});


export default mongoose.model('Test', TestSchema);