import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes.js'
import authRouter from './routes/auth.routes.js'
import productRoutes from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import cookieParser from "cookie-parser";

import cors from "cors";

import { fileURLToPath } from 'url';



const app=express();
import path from 'path';

app.use(cors());
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB!');
    }).catch((err)=>{
        console.log(err);
    }
)



app.use(express.json());
app.use(cookieParser());

// Serve uploaded images statically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));




// Start server
const PORT = 3000;

app.listen(3000,()=>{
    console.log('Server is runing on port 3000!!!');
    }
);

app.use('/backend/products', productRoutes);
app.use('/backend/user',userRouter);
app.use('/backend/auth',authRouter);
app.use('/backend/addproducts', productRoutes);
app.use("/backend/cart", cartRouter);







// Error handling middleware
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
