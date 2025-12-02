const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const{generateAccessToken,generateRefreshToken}=require('../middlewares/jwt')
const jwt=require('jsonwebtoken')
const sendMail=require('../ultils/sendMail')
const crypto=require('crypto')
const Order = require('../models/order');
const bcrypt = require('bcrypt');

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname, mobile } = req.body;

    if (!email || !password || !lastname || !firstname || !mobile) {
        return res.status(400).json({ success: false, mes: 'Thiếu thông tin đăng ký' });
    }

    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ success: false, mes: 'Người dùng đã tồn tại' });
    }

    // Tạo token xác thực
    const token = Math.random().toString(36).substring(2, 10).toUpperCase();

    // Lưu user vào database
    const newUser = await User.create({
        email, // Giữ nguyên email
        password,
        firstname,
        lastname,
        mobile,
        verificationToken: token, // Lưu token vào cột riêng
        isActivated: false // Chưa kích hoạt
    });

    if (newUser) {
        // Gửi email xác nhận
        const html = `<h2>Mã xác thực:</h2><br/>${token}`;
        await sendMail({
            email,
            html,
            subject: 'Xác nhận tài khoản - SHOPPHONE',
        });

        return res.json({
            success: true,
            mes: 'Mã xác thực đã được gửi tới email của bạn. Hãy nhập mã để kích hoạt tài khoản.',
        });
    }

    return res.status(500).json({ success: false, mes: 'Đăng ký thất bại' });
});

    const finalRegister = asyncHandler(async (req, res) => {
        const { token } = req.params; // Sửa lại lấy từ req.params
        console.log("Token nhận được:", token);

        if (!token) {
            return res.status(400).json({ success: false, mes: "Mã xác thực không hợp lệ" });
        }

        const user = await User.findOne({ verificationToken: token, isActivated: false });
        console.log("User tìm được:", user);

        if (!user) {
            return res.status(400).json({ success: false, mes: "Mã xác thực không đúng hoặc tài khoản đã được kích hoạt" });
        }

        user.isActivated = true;
        user.verificationToken = null;
        await user.save();
console.log("Thành công");

        return res.json({ success: true, mes: "Tài khoản đã được kích hoạt thành công!" });
    });

//refresh token=> cap nhat mowi access token
// access token=> xac thuc nguoi dung,phan quen nguoi dung
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email ||!password) {
        return res.status(400).json({
            sucess: false,
            mes: 'Missing inputs'
        });
    }

    const response = await User.findOne({ email });

    if (response && await response.isCorrectPassword(password)) {
        //tach password vaf role ra khoi response
        const{password,role,refreshToken,...userData}=response.toObject()
        //tao accsess token
        const accessToken=generateAccessToken(response._id,role)
        //tao refresh token
        const  newrefreshToken=generateRefreshToken(response._id)
        // luu refresh token vafo database
        await User.findByIdAndUpdate(response._id,{refreshToken:newrefreshToken},{new:true})
        // luu refresh token vao cookie
        res.cookie('refreshToken',newrefreshToken,{httpOnly: true,maxAge:7*24*60*60*1000})
        return res.status(200).json({
            success: true,
            accessToken,
       
            userData: {
                ...userData,
                role
    }});
    } else {
        throw new Error('Invalid credentials');
    }
});

const getCurrent = asyncHandler(async (req, res) => {
    const{_id}=req.user
    const user = await User.findById(_id).select('-refreshToken-password-role');
    return res.status(200).json({
        success:user?true:false,
        rs:user?user:'user not found'
    })
   
});
const getProfile = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    const user = await User.findById(_id).select('-password -refreshToken -role');
    if (!user) throw new Error('User not found');

    const orders = await Order.find({ orderBy: _id })
        .populate('products.product', 'title price images')
        .sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        user,
        orders,
    });
});
const refreshAccessToken=asyncHandler(async(req,res)=>{
    //laasy token tu cookie
  
    const cookie = req.cookies
    //check xem cos token hay khong
    if (!cookie&&cookie.refreshToken) throw new Error('no refesh token in cookie')
    //check token co hop le hay khong
    const  rs=await jwt.verify(cookie.refreshToken,process.env.JWT_SECERT)
    const  response=await  User.findOne({_id:rs.id,refreshToken:cookie.refreshToken})
    return res.status(200).json({
        success:response?true:false,
        newAccessToken:response?generateAccessToken(response._id,response.role):'refresh token not matched'
    })
})
const logout=asyncHandler(async(req,res)=>{
   const cookie=req.cookies
   if(!cookie||!cookie.refreshToken)  throw new Error('no refresh token in cookies')
    //xoas refresh token ow db
    await User.findOneAndUpdate({refreshToken:cookie.refreshToken},{refreshToken:''},{new:true})
    // xoa refresh token o cookies trinhf duyet
    res.clearCookie('refreshtoken',{
        httpOnly:true,
        secure:true
    })
    return res.status(200).json({
        success:true,
        mes:'logout is done'
    })
})
// client gửi email
//server check email có hợp lệ hay không -> gửi mail ->kèm theo link (password chane token)
// client check mail ->click vào link mình đã gửi 
// client đã gửi api kèm theo token 
// check xom token có giống token sever gửi gmail hay không 
//nếu giống thì cho người ta thay đổi
const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) throw new Error('Missing email');

    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const resetToken = user.createPasswordChangedToken();
    await user.save()

    //ddieu kien de gui duoc mail
    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. 
    Link này sẽ hết hạn sau ít phút kể từ bây giờ. 
    <a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">Click here</a>`;
    

    const data={
        email,
        html,
        subject:'Forgot password'
    }
    const rs = await sendMail({ email, html, subject: "Forgot password" });

    return res.status(200).json({
        success:true,
        rs
    })
    
    
});

const resetPassword = asyncHandler(async (req, res) => {
   
    const {password,token}=req.body;
    if (!password || !token) throw new Error('Missing inputs');

  
    const passwordResetToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
        passwordResetToken,
        passwordResetExpires: { $gt: Date.now() } // Token phải còn hạn
    });
    if (!user) throw new Error('invalid reset tokken')
        user.password=password
        user.passwordResetToken=undefined
        user.passwordChangedAt=Date.now()
        user.passwordResetExpires=undefined
        await user.save()
        return res.status(200).json({
            success:user?true:false,
            mes:user?'update password':'something went wrong'
        })
    
});

const getUsers = asyncHandler(async (req, res) => {
    const response = await User.find()
        .select('-refreshToken -password -role')
        .populate({
            path: 'cart.product',
            select: 'title price'
        });

    return res.status(200).json({
        success: response ? true : false,
        users: response
    });
});

const deleteUser =asyncHandler(async(req,res)=>{
    const {_id}=req.query
    if(!_id) throw new Error('Missing inputs')
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success:response?true:false,
        deletedUser:response?`User with email ${response.email}deleted`:'no user delete'
    })
})
const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user; // <-- Sử dụng _id từ middleware xác thực
    if (!_id || Object.keys(req.body).length === 0) throw new Error('Missing inputs');

    const response = await User.findByIdAndUpdate(
        _id,
        req.body,
        { new: true }
    ).select('-password -role -refreshToken');

    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response || 'Something went wrong',
    });
});
const createUserByAdmin = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname, mobile } = req.body;
    if (!email || !password || !firstname || !lastname || !mobile) {
      return res.status(400).json({ success: false, message: 'Thiếu thông tin người dùng!' });
    }
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email đã tồn tại!' });
    }
  
   
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      mobile,
      isActivated: true,
    });
  
    res.status(201).json({ success: true, user: newUser });
  });

const updateUserByAdmin =asyncHandler(async(req,res)=>{
    const {uid}=req.params
    if( Object.keys(req.body).length===0) throw new Error('Missing inputs')
    const response = await User.findByIdAndUpdate(uid,req.body,{new:true}).select('-password-role-refreshToken')
    return res.status(200).json({
        success:response?true:false,
        updatedUser:response?response:'some thing went wrong'
    })
})
const updateUserAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user; // Lấy _id từ req.user
    if (!_id) throw new Error('User ID missing from token');
    if (!req.body.address) throw new Error('Missing inputs');

    const response = await User.findByIdAndUpdate(
        _id, // Sử dụng _id thay vì uid
        { $push: { address: req.body.address } },
        { new: true }
    ).select('-password -role -refreshToken');

    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response || 'Something went wrong',
    });
});
const updateCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { pid, quantity, color } = req.body; 

    if (!pid || !quantity || !color) throw new Error('Missing inputs');

    // Tìm user và lấy giỏ hàng
    const user = await User.findById(_id).select('cart');
    if (!user) throw new Error('User not found');

    let alreadyProduct = user.cart.find(el => el.product.toString() === pid && el.color === color);

    if (alreadyProduct) {
        // Nếu sản phẩm đã tồn tại với cùng màu => Cập nhật số lượng
        const response = await User.findOneAndUpdate(
            { _id, "cart.product": pid, "cart.color": color },
            { $set: { "cart.$.quantity": quantity } },
            { new: true }
        ).select('-password -refreshToken -role'); // Ẩn trường nhạy cảm

        return res.status(200).json({
            success: response ? true : false,
            updatedUser: response || 'Something went wrong',
        });
    } else {
        // Nếu sản phẩm chưa có trong giỏ hàng => Thêm mới
        const response = await User.findByIdAndUpdate(
            _id,
            { $push: { cart: { product: pid, quantity, color } } },
            { new: true }
        ).select('-password -refreshToken -role'); // Ẩn trường nhạy cảm

        return res.status(200).json({
            success: response ? true : false,
            updatedUser: response || 'Something went wrong',
        });
    }
});



module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    updateUserAddress,
    updateCart,
    finalRegister,
    getProfile,
    createUserByAdmin 
};

