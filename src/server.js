import connectDB from "./db/index.js";
import {app} from "./app.js"
import axios from 'axios'

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

const url ="https://register-deployment.onrender.com/";
const interval = 30000;
function reloadWebsite(){
    axios
    .get(url)
    .then((response)=>{
        console.log("website reloaded");
    })
    .catch((error)=>{
        console.error('error',error.message);
    });
}
setInterval(reloadWebsite,interval);