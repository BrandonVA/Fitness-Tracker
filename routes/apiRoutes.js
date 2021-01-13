const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout_db", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.set('useFindAndModify', false);

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
        const id = req.params.id
        db.Exercise.create(req.body)
            .then(({ _id }) => db.Workout.findOneAndUpdate({ _id: id }, { $push: { exercises: _id } }, { new: true }))
            .then(dbWorkout => {
                res.json(dbWorkout);
            })
            .catch(err => {
                res.json(err);
            });
    });



    app.post("/api/workouts", (req, res) => {
        db.Workout.create(req.body)
            .then(Workout => {
                res.json(Workout);
            })
            .catch(err => {
                res.json(err);
            });
    });


    app.get("/api/workouts/range", (req, res) => {

        db.Workout.aggregate([

            // Sorting and limiting to last 7 entered
            { $sort: { _id: -1 } },
            { $limit: 7 },
            {
                // Populating the aggregate results with exercises collection.
                $lookup: {
                    from: "exercises",    // From the exercises collection
                    localField: "exercises", // Local field to make the connection
                    foreignField: "_id",    // using _id to connect the two
                    as: "exercises"         // setting the value of the populated collections as the same name so it overwrites the previous one.
                }
            },
            {
                // Adding new fields for the total of weights and duration.
                $addFields: {
                    totalWeight: { $sum: "$exercises.weight" },
                    totalDuration: { $sum: "$exercises.duration" }
                }
            }
        ])
            .then(Workouts => {
                res.json(Workouts);
            })
            .catch(err => {
                res.json(err);
            });
    })

}