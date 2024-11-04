// app.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import router from "./routers/api.js"
import mongoose from "mongoose";
import { DATABASE,PORT,WEB_CASH,} from "./app/config/config.js";

const app = express();



app.set("etag",WEB_CASH)

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json()); // To handle JSON payloads


app.use(express.urlencoded({ extended: true }));

// Use the router
app.use("/api", router);

//connect momgodb
mongoose.connect(DATABASE,{autoIndex:true}).then(()=>{
    console.log("mongodb connceted")
}).catch(()=>{
    console.log("mongodb disconnected")
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
