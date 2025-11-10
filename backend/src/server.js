import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


//middleware
//function allows us to get access to the request.body value like {title, content} that we send as a json
//,iddleware will parse json bodies: req.body
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json())
app.use(rateLimiter);
//simple custon middleware
// app.use((req, use, next) =>{
  //   console.log(`Req method is ${req.method} & Req is ${reSq.url}`);
  //   next();
  // });
  
  app.use("/api/notes", notesRoutes);
  //app.use("/api/product", productRoutes);


  connectDB().then(() => {
    
    app.listen(PORT, () => {
      console.log("Server is started on PORT:", PORT);
    });
  });



