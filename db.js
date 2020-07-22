const connectDB = async () => {
  const mongoose = require("mongoose");
  try {
    await mongoose.connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
