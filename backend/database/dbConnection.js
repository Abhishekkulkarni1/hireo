import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Herio_Job_seeking_website"
    }).then(() => {
        console.log("Connected to Database successfully")
    }).catch((err)=>{
        console.log(`There was some error occured while connecting to database: ${err}`)
    })
}