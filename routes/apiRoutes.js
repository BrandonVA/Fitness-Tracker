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
        const id = req.params.id
        db.Exercise.create(req.body)
        .then(({_id}) => db.Workout.findOneAndUpdate({_id: id}, { $push: { exercises: _id } }, { new: true }))
        .then(dbWorkout => {
          res.json(dbWorkout);
        })
        .catch(err => {
          res.json(err);
        });
    });
    


    app.post("/api/workouts", (req, res) => {
        // console.log(req.params.id)
        db.Workout.create(req.body)
            .then(Workout => {
                // console.log(Workout)
                res.json(Workout);
            })
            .catch(err => {
                res.json(err);
            });
    });


    app.get("/api/workouts/range", (req, res) => {
        const weekAgo = new Date(new Date() - 7 * 60 * 60 * 24 * 1000);
        // working query ---> db.workouts.aggregate( [ {$match: { day: { $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) }  } }])
        
        
        /*


        
        db.Workout.aggregate( [ 
            { $match: 
                { day: { $gte: weekAgo }  } 
            },
            { 
                $addFields: {
                  totalWeight: { $sum: "$weight" } ,
                  totalDuration: { $sum: "$duration" }
                }
            }
        ]).then(Workouts => {
            console.log(Workouts)
            res.json(Workouts);
        })
        .catch(err => {
            res.json(err);
        });
        
        
        */

            // db.Workout.aggregate( [
            //     { $match: { $or: [ { day: { $gt: weekAgo, $lt: Date() } } ] } },
            //     // { $group: { _id: null, count: { $sum: 1 } } }
            //   ] );
    })

}


// db.workouts.aggregate( [ 
//     {
//         $match: {
//             day: { $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000) }  
//          }
//      }, 
     

         
//     { 
//         $addFields: {
//              totalWeight: { $sum: "$exercises.weight" } ,
//              totalDuration: { $sum: "$exercises.duration" }
//         }
//      },
//      {$lookup:
//      {
//        from: "exersices",
//        localField: "exersices",
//        foreignField: "_id",
//        as: "weight"
//      }
//  }
       
//  ])

