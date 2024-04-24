import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import Test from "./models/Test.js";
import Question from "./models/Question.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5087;
const MONGO_URL = "mongodb://localhost:27017/ExamAcademy";

app.use(express.json());

app.use(cors({ origin: "*" }));
mongoose
  .connect(MONGO_URL, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.get("/check-email", async (req, res) => {
  const { email } = req.query;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/save-student", async (req, res) => {
  const studentInfo = req.body;
  try {
    const newUser = new User(studentInfo);
    await newUser.save();
    res.status(200).json({ message: "StudentInfo saved successfully" });
  } catch (error) {
    console.error("Error saving studentInfo:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/check-loginInfo", async (req, res) => {
  const { email, password, specPasscode } = req.body;

  try {
    const existingUser = await User.findOne({ email, password, specPasscode });

    if (existingUser) {
      res.status(200).json({ exist: true, message: "Login successful" });
    } else {
      res.status(401).json({
        exist: false,
        message: "Invalid email, password, or special passcode",
      });
    }
  } catch (error) {
    console.error("Error checking login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post("/save-test", async (req, res) => {
  try {
    const {
      name,
      subject,
      numberOfQuestions,
      point,
      duration,
      date,
      teacherId,
      questions,
    } = req.body;
    const newTest = new Test({
      name,
      subject,
      numberOfQuestions,
      point,
      duration,
      date,
      teacherId,
      questions,
    });
    await newTest.save();

    res.status(200).json({ message: "Test data saved successfully" });
  } catch (error) {
    console.error("Error saving test data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/save-question", async (req, res) => {
  try {
    const { question, type, correctAnswer, options } = req.body;
    const newQuestion = new Question({
      question,
      type,
      correctAnswer,
      options,
    });
    await newQuestion.save();

    res.status(200).json({ message: "Question data saved successfully" });
  } catch (error) {
    console.error("Error saving question data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/questions/count", async (req, res) => {
  try {
    const totalCount = await Question.countDocuments();
    res.status(200).json({ totalCount });
  } catch (error) {
    console.error("Error fetching total count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/questions/random/", async (req, res) => {
  try {
    const count = parseInt(req.query.count);
    if (!count || count <= 0) {
      return res.status(400).json({ error: "Invalid count" });
    }
    const randomQuestions = await Question.aggregate([
      { $match: { subject: req.query.subject } },
      { $sample: { size: count } },
    ]);
    res.status(200).json({ randomQuestions });
  } catch (error) {
    console.error("Error fetching random questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/api/users/:userId', async (req, res) => {
  const userId = req.params.userId; 
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/tests', async (req, res) => {
  const { teacherId } = req.query;
  try {
    const tests = await Test.find({ teacherId });
    res.json(tests); 
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/testById/:testId', async (req, res) => {
  try {
    const testId = req.params.testId;
    const test = await TestModel.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.json(test);
  } catch (error) {
    console.error('Error fetching test:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
