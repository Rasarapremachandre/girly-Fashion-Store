import Product from "../models/product.model.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    const sizes = req.body.sizes ? JSON.parse(req.body.sizes) : [];
    const colors = req.body.colors ? JSON.parse(req.body.colors) : [];

    const mainImage = req.files?.mainImage
      ? req.files.mainImage[0].filename
      : null;

    const images = req.files?.images
      ? req.files.images.map((file) => file.filename)
      : [];

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      sizes,
      colors,
      mainImage,
      images,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get ALL products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find product
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔥 Delete image from uploads folder
    if (product.mainImage) {
      const imagePath = path.join("uploads", product.mainImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // 🔥 Delete product from DB
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};

// UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

