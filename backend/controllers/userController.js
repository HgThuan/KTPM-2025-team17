const bcrypt = require('bcryptjs');
const userModel = require('../models/userModels');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Kiểm tra user tồn tại
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: 'Người dùng đã tồn tại',
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Đếm số lượng user đã có
    const userCount = await userModel.countDocuments();
    const newUserId = `BN${userCount + 1}`;

    // Tạo user mới
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      userId: newUserId,
    });

    await newUser.save();

    res.status(201).send({
      success: true,
      message: 'Đăng ký thành công',
      userId: newUserId
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Lỗi đăng ký: ${error.message}`,
    });
  }
};

const loginController = async (req, res) =>{
  try {
    const user = await userModel.findOne({email:req.body.email})
    if(!user){
      return res.status(200).send({message:'Không tìm thấy người dùng', success:false})
    }
    const isMatch = await bcrypt.compare(req.body.password,user.password)
    if(!isMatch){
      return res.status(200).send({message:`Không đúng email or password ${error.message}`})
    }
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
      expiresIn: "1d",
    });
    res.status(200).send({message:"Đăng nhập thành công", success:true,token});
  } catch (error) {
    console.log(error)
    res.status(500).send({message:`Lỗi đăng nhập ${error.message}`})
  }
};
module.exports = { loginController, registerController };
