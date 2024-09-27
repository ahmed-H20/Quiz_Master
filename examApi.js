const { app } = require("./App");
const { connectdb }  = require("./DB");
const port = 8080;

//start server
app.listen(port, ()=>{
    connectdb();
    console.log(`Server is running on  http://localhost:${port}`);
});