
const { verifyToken } = require('../helpers/generateToken')
const userModel = require('../models/users')
const checkAuth = async (req, res, next) => {
    try {
        //TODO: authorization: Bearer 1010101010101001010100 
        const token = req.headers.authorization.split(' ').pop()  //TODO:123123213
        const tokenData = await verifyToken(token)
        if (!tokenData) {
            res.status(409)
            return res.send({ error: 'Tu por aqui no pasas!' })
        }
        const userData = await userModel.findById(tokenData._id) //TODO: 696966
        req.user = userData
        if (tokenData._id) {
            next()
        } else {
            res.status(409)
            return res.send({ error: 'Tu por aqui no pasas!' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'Tu por aqui no pasas!' })
    }

}

module.exports = checkAuth