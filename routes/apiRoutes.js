const mongoose = require("mongoose");
const db = require("../models");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout_db", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });


module.exports = (app) => {
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
        .populate("exercises")
            .then(Workout => {
                res.json(Workout);
            })
            .catch(err => {
                res.json(err);
            });
    });



    app.put("/api/workouts/:id", (req, res) => {
        db.Exercise.create(req.body)
        .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
        .then(dbWorkout => {
          res.json(dbWorkout);
        })
        .catch(err => {
          res.json(err);
        });
    });
    


    app.post("/api/workouts", (req, res) => {
        console.log(req.params.id)
        db.Workout.create(req.body)
            .then(Workout => {
                console.log(Workout)
                res.json(Workout);
            })
            .catch(err => {
                res.json(err);
            });
    });

}

