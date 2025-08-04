import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js"; 

dotenv.config({
    path: './.env'  // Note the dot before 'env'
})
// const PORT = process.env.PORT
// app.listen(PORT, ()=>{
//     console.log(`server is running on ${PORT}`);
// })

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!", err);
})

