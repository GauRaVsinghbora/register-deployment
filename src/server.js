import connectDB from "./db/index.js";
import {app} from "./app.js"

connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("server connection error",error);
    })
    app.listen(process.env.PORT,()=>{
        console.log(`📡 local server is listing at ${process.env.PORT}`)
    })
})
.catch((error)=>{
    console.log(`there is some error in listing the server`,error);
    process.exit(1)   //immediately ends the current process.
})