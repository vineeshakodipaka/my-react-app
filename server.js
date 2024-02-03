//crud

const express = require("express");
const mongoose = require("mongoose");
const Stddata = require("./model");
const app = express();
const cors = require("cors");
mongoose
  .connect(
    "mongodb+srv://vineesha123:vineesha123@cluster0.pqlb9th.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true, // Add this option
      useUnifiedTopology: true, // Add this option to fix warning message
    }
  )
  .then(() => console.log("connected db..."))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(cors({ origin: "*" }));
app.get("/", (req, res) => {
  return res.send("Hello World");
});
app.post("/adddata", async (req, res) => {
  const { name, age, perc } = req.body;
  try {
    let newData = new Stddata({
      name,
      age,
      perc,
    });

    await newData.save();
    return res.send(await Stddata.find());
  } catch (err) {
    console.log(err.message);
  }
});

// app.get("/", (req, res) => {
//   res.send("hello world...!");
// });
app.get("/getdata", async (req, res) => {
  try {
    const allData = await Stddata.find();
    return res.json(allData);
  } catch (err) {
    console.log(err.message);
  }
});

app.patch("/updatedata/:id", async (req, res) => {
  const { name, age, perc } = req.body;

  // Check if id is valid
  if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    const updatedData = await Stddata.findByIdAndUpdate(
      req.params.id,
      { name, age, perc },
      { new: true }
    );
    return res.json(updatedData);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/data/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const datastd = await Stddata.findById(id);
    if (!datastd) {
      return res.status(404).json({ message: "data not found" });
    }
    return res.json(datastd);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.delete("/deletedata/:id", async (req, res) => {
  try {
    await Stddata.findByIdAndDelete(req.params.id);
    return res.json(await Stddata.find());
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => console.log("server running"));
