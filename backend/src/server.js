import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";  

import notesRoutes from "./routes/noteRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const _dirname = path.resolve();


//Middleware
//function allows us to get access to the request.body value like {title, content} that we send as a json
//Middleware will parse json bodies: req.body
if (process.env.NODE_ENV !== "development") {
  app.use(
    cors({
    origin: "http://localhost:5173",
  })
); 
}

app.use(express.json())
app.use(rateLimiter);
//simple custon middleware
// app.use((req, use, next) =>{
  //   console.log(`Req method is ${req.method} & Req is ${reSq.url}`);
  //   next();
  // });
  
  app.use("/api/notes", notesRoutes);
  //app.use("/api/product", productRoutes);


  if (process.env.NODE_ENV === "development") {
  const distDir = path.join(_dirname, "../frontend/dist");
  app.use(express.static(distDir));

  // ✅ FINAL FALLBACK with no route pattern (avoids path-to-regexp)
  app.use((req, res, next) => {
    // Let API requests pass through
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(distDir, "index.html"));
  });
}

  connectDB().then(() => {
    
    app.listen(PORT, () => {
      console.log("Server is started on PORT:", PORT);
    });
  });



