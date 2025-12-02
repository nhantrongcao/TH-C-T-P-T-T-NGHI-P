const Product=require('../models/product')
const mongoose = require('mongoose')
const asyncHandler=require('express-async-handler')
const slugify=require('slugify')



const createProduct=asyncHandler(async(req,res)=>{
    if(Object.keys(req.body).length===0) throw new Error('missing inputs')
    if(req.body&&req.body.title) req.body.slug=slugify(req.body.title)
    const newProduct =await Product.create(req.body)
    return res.status(200).json({
        success:newProduct?true:false,
        createProduct:newProduct?newProduct:'Cannot create new product'

    })
})
const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const product = await Product.findById(pid.trim());

    return res.status(200).json({
        success: product ? true : false,
        productData: product || 'Cannot get product',
    });
});

const getProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query };

    // Tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields'];
    excludeFields.forEach(el => delete queries[el]);

    // Format lại các operators cho đúng cú pháp Mongoose
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/(gte|gt|lt|lte)\b/g, match => `$${match}`);
    const formattedQueries = JSON.parse(queryString);

    // Lọc sản phẩm theo tiêu đề (tìm kiếm chứa chữ bất kỳ)
    if (queries?.title) {
        formattedQueries.title = { $regex: queries.title, $options: 'i' };
    }

    // ✅ Khởi tạo queryCommand trước khi dùng .sort()
    let queryCommand = Product.find(formattedQueries);

    // Sắp xếp sản phẩm
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ').trim();
        console.log(`Sorting by: ${sortBy}`);
        queryCommand = queryCommand.sort(sortBy);
    } else {
        queryCommand = queryCommand.sort('-createdAt'); // Mặc định sắp xếp theo ngày tạo mới nhất
    }
    
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        queryCommand = queryCommand.select(fields);
    }
 
    // limit: số object lấy về 1 gọi api
    // skip: ví dụ 2
    // 1.2.3...10 (limit lấy 2 số đầu, skip bỏ qua 2 số đầu )
    const page = +req.query.page|| 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page - 1) * limit
     queryCommand.skip(skip).limit(limit);
    try {
        // Thực thi truy vấn
        const response = await queryCommand.exec();
        const counts = await Product.countDocuments(formattedQueries);

        return res.status(200).json({
            success: response ? true : false,
            counts,
            products: response || 'Cannot get products',
        });
    } catch (error) {
        throw new Error(error.message);
    }


});

const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;

    // Kiểm tra xem pid có hợp lệ không
    if (!pid || !mongoose.Types.ObjectId.isValid(pid.trim())) {
        return res.status(400).json({
            success: false,
            message: 'Invalid product ID'
        });
    }

    // Nếu có `title`, tạo slug mới
    if (req.body && req.body.title) {
        req.body.slug = slugify(req.body.title);
    }

    // Cập nhật sản phẩm
    const updatedProduct = await Product.findByIdAndUpdate(pid.trim(), req.body, { new: true });

    return res.status(200).json({
        success: updatedProduct ? true : false,
        productData: updatedProduct ? updatedProduct : 'Cannot update product'
    });
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params;

    // Kiểm tra pid hợp lệ
    if (!pid || !mongoose.Types.ObjectId.isValid(pid.trim())) {
        return res.status(400).json({
            success: false,
            message: 'Invalid product ID'
        });
    }

    // Xóa sản phẩm
    const deletedProduct = await Product.findByIdAndDelete(pid.trim());

    return res.status(200).json({
        success: deletedProduct ? true : false,
        message: deletedProduct ? `Product ${deletedProduct.title} deleted successfully` : 'Cannot delete product'
    });
});
const ratings=asyncHandler(async(req, res) =>{
    const {_id}=req.user
    const{star,comment,pid}=req.body;
    if(!star||!pid) throw new Error ('Missing inputs')
    const ratingProduct= await Product.findById(pid)
    const alreadyRating = ratingProduct.ratings?.find(el => el.postedBy?.toString() === _id);
    //console.log(alreadyRating);
    //console.log(alreadyRating);
    if(alreadyRating){
        await Product.updateOne({
            ratings:{$elemMatch:alreadyRating}
        },{
            $set:{ "ratings.$.star":star,"ratings.$.comment":comment}
        },{new:true})
// update  start and comment
    }else{
//add start and comment
         await Product.findByIdAndUpdate(pid,{
            $push:{ratings:{star,comment,postedBy:_id}}    
        }, {new: true})

    }
    // sum rating 
    const updatedProduct=await Product.findById(pid)
    const ratingCount = updatedProduct.ratings.length
    const sumRatings = updatedProduct.ratings.reduce((sum,el)=>sum+el.star,0)
    updatedProduct.totalRating=Math.round(sumRatings *10/ratingCount)/10

    await updatedProduct.save()


    return res.status(200).json({
        status: true,   
        updateProduct
    })
})
const uploadImagesProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params; // Lấy id sản phẩm từ params
    if (!req.files || req.files.length === 0) throw new Error("Missing input");

    const response = await Product.findByIdAndUpdate(
        pid,
        { $push: { images: { $each: req.files.map((el) => el.path) } } },
        { new: true } // Trả về dữ liệu sau khi cập nhật
    );

    return res.json({
        success: response ? true : false,
        updatedProduct: response || "Cannot upload images",
    });
});

module.exports={
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct ,
    ratings,
    uploadImagesProduct

}