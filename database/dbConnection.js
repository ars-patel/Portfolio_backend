import mongoose from "mongoose";

const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "PORTFOLIO",
    }).then(()=>{
        console.log("Connect to Database.");
    }).catch((error)=>{
        console.log(`Some error Ocuured while Connecting To Database: ${error}`);
    });
};

export default dbConnection;