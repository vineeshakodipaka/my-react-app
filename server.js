const express = require("express");
const mongoose = require("mongoose");
const Product = require("./model");
const app = express();
const cors = require("cors");

mongoose
  .connect(
    "mongodb+srv://vineesha123:vineesha123@cluster0.pqlb9th.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
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
  const { name, image, price, description } = req.body;
  try {
    let newProduct = new Product({
      name,
      image,
      price,
      description,
    });

    await newProduct.save();
    return res.send(await Product.find());
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/getdata", async (req, res) => {
  try {
    const allData = await Product.find();
    return res.json(allData);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.patch("/updatedata/:id", async (req, res) => {
  const { name, image, price, description } = req.body;

  if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, image, price, description },
      { new: true }
    );
    return res.json(updatedProduct);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/data/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/deletedata/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.json(await Product.find());
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => console.log("server running"));
