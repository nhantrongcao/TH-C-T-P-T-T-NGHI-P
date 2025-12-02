const userRouter=require('./user')
const productRouter=require('./product')
const productCategoryRouter=require('./productCategory')
const brandRouter = require('./brand');
const blogRouter = require('./blog');
const couponRouter=require('./coupon')
const insert = require('./insert')
const chatbotRoutes = require('./chatbot'); // Import chatbot router
const orderRouter=require('./order')
const blogCategoryRouter=require('./blogCategory')

const {notFound,errHandler}=require('../middlewares/errHandler')
const initRouter=(app)=>{
    app.use('/api/user',userRouter)
    app.use('/api/chatbot', chatbotRoutes); 
    app.use('/api/product',productRouter)
    app.use('/api/productcategory',productCategoryRouter)
    app.use('/api/blogcategory',blogCategoryRouter)
    app.use('/api/brand', brandRouter);
    app.use('/api/blog',blogRouter)
    app.use('/api/coupon',couponRouter)
  
    app.use('/api/order',orderRouter)
    app.use('/api/insert', insert)
    app.use(notFound)
    

    app.use(errHandler)
}

module.exports=initRouter
