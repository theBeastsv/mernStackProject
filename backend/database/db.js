import mongoose from "mongoose";
// console.log(process.env.DATABASE_URL);
// console.log("checking the vlaues", process.env.PORT);
export const dbConnection = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      dbName: "Mernapp",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};
