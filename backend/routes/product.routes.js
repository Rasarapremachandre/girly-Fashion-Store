import express from 'express';
import { addProduct, getProductsByCategory,getProductById, getProducts, deleteProduct,updateProduct } from '../controllers/product.controller.js';
import Product from '../models/product.model.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(path.resolve(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// ✅ COUNT ROUTE (VERY IMPORTANT)
router.get("/count", async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product count" });
  }
});

// POST /backend/addproducts
router.post(
  '/',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'images', maxCount: 10 },
  ]),
  addProduct
);




// ✅ Get ALL products
router.get("/", getProducts);

// ✅ Get Products by Category (GET)
router.get('/:category', getProductsByCategory);

// ✅ Get single product by ID
router.get("/details/:id", getProductById);

router.delete("/:id", deleteProduct);

// ✅ UPDATE product
router.put("/:id", updateProduct);








export default router;
