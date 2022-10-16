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


exports.getUserById = async (req, res, next) =>{
    const {id} = req.params
    try{

        const user = await User
                            .findById(id)
                            .populate('posts')

        return res
                .status(200)
                .json({
                    status: true,
                    user
                })
    }
    catch(err){
        return next(`This error occured while handling that \n${err}`)
    }
}


exports.deleteUserById = async(req, res, next) =>{
    const {id} = req.params

    try{
        const user = await User.findById(id)
        if (!user){
            return res
                    .status(404)
                    .json({
                        status: false,
                        msg: "user with id doesn't exist!"
                    })
        }

        await User.deleteOne({id: id})

        return res
                .status(200)
                .json({
                    status: true,
                    msg: null
                })
   }
    catch(err){
        res
            .status(400)
            .json({
                status: false,
                err
            })
    }
}
