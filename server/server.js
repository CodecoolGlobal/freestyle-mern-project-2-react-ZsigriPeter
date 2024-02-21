import mongoose from "mongoose";
import express from "express";
import BlackHole from "./model/BlackHole.js";
import User from "./model/User.js";
import QuizQuestions from "./model/QuizQuestions.js";
import QuizResults from "./model/QuizResults.js";

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://CosmicCrew:s0vumwVjyDW4g9tN@cluster0.ebdwomi.mongodb.net/");

app.get("/api/blackholes", async (req, res) => {
  try {
    const { kind } = req.query;
    let query = {};
    if (kind) {
      query = { kind: { $regex: new RegExp(kind, "i") } };
    }
    const blackHoles = await BlackHole.find(query).limit(15);
    return res.json(blackHoles);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/leaderboard", (req,res,next)=> {
  try {
    QuizResults.find().sort({ result: "desc" })
    .then((qRes)=> {
      res.json(qRes);
    })
  } catch (error) {
    res.send(next);
  }
})

app.get("/api/user/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/api/quizresults/:userid", (req, res) => {
  QuizResults.find({ userId: req.params.userid })
    .then((quizRes) => {
      res.json(quizRes);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get("/api/username/:username", (req, res) => {
    User.findOne({ userName: req.params.username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
      });
  });

app.patch("/api/user/:id", (req, res) => {
  console.log(req.body);
  User.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      birthDate: req.body.birthDate,
      studies: req.body.studies,
      phoneNumber: req.body.phoneNumber,
      hobbies: req.body.hobbies,
    },
    { new: true }
  )
    .then((originData) => {
      console.log("Data: ", originData);
    })
    .catch((error) => {
      console.log(error);
    });
  return res.send({ state: "Userdata Update Succesfull" });
});

app.get("/api/quiz", async (req, res) => {
  try {
    const quiz = await QuizQuestions.find();
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/quiz", (req, res) => {
  const quizData = req.body;
  const createdAt = Date.now();

  const quizResult = new QuizResults({
    quizId: quizData.quizId,
    userId: quizData.userId,
    userName: quizData.userName,
    result: quizData.result,
    percentage: quizData.percentage,
    createdAt: createdAt,
  });

  quizResult
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((err) =>
      res.status(400).json({ success: false, error: err.message })
    );
});

app.post("/api/registration", (req, res) => {
  console.log(req.body);
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const userEmail = req.body.userEmail;
  const birthDate = req.body.birthDate;
  const studies = req.body.studies;
  const phoneNumber = req.body.phoneNumber;
  const hobbies = req.body.hobbies;
  const user = new User({
    firstName,
    lastName,
    userName,
    userEmail,
    birthDate,
    studies,
    phoneNumber,
    hobbies,
  });
  user
    .save()
    .then((user) => res.json(user))
    .catch((error) => res.status(400).json({ success: false }));
});

app.patch("/api/registration/:id", async (req, res) => {
    console.log(req.params.id);
  const user = await User.updateOne(
    { _id: req.params.id },
    { $set: { ...req.body } },
    { new: true }
  );
  return res.json(user);
});

app.get("/api/users", (req, res) => {
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  

app.listen(6000, () => console.log("Port:6000"));
