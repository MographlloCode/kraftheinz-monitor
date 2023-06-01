import mongoose from "mongoose";

export const databaseConnection = async () => {
  console.log("Wait, connecting to the database...");
  await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB - Atlas Connected"))
    .catch((error) => console.log(error));
};
