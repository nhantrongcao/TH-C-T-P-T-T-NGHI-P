const  express=require('express')
require('dotenv').config()
const dbConnect=require('./config/dbconnect')
const initRouter=require('./routes')
const cookieParser=require('cookie-parser')

const cors=require('cors')
const app=express()
app.use(cors({
   origin:process.env.CLIENT_URL,
   methods:['POST','PUT','GET','DELETE'],
   credentials: true 
}))
app.use(cookieParser())
const port=process.env.PORT || 8888
app.use(express.json())
app.use(express.urlencoded({extended:true}))//ddocj data
dbConnect()

 
initRouter(app)
app.use('/',(req,res)=>{res.send('SERVER ON')})


app.listen(port,()=>{
   console.log('sever running on the port'+port);
})
