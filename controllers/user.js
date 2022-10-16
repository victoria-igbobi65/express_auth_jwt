const User = require('../models/users')

exports.getAllUser = async(req, res, next) =>{
    const users = await User
                            .find()
                            .populate('posts')

    res
        .status(200)
        .json({
            users
        })
}