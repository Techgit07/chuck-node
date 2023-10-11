import jwt from 'jsonwebtoken'
import config from 'config'
import { userModel } from '../database'
import mongoose from 'mongoose'
import { Request, response, Response } from 'express'
const ObjectId = mongoose.Types.ObjectId
const jwt_token_secret = config.get('jwt_token_secret')

export const userJwt = async (req: Request, res: Response, next) => {
    let { authorization } = req.headers,
        result: any
    if (authorization) {
        try {
            let isVerifyToken = jwt.verify(authorization, jwt_token_secret)
            result = await userModel.findOne({ _id: new ObjectId(isVerifyToken._id), isActive: true })
            if (result?.isActive == true) {
                req.headers.user = result
                return next()
            } else { return res.status(401).json({ "message": 'invalid token' }) }
        } catch (err) {
            if (err.message == "invalid signature") return res.status(403).json({ "message": 'different token' })
            console.log(err)
            return res.status(401).json({ "message": 'invalid token' })
        }
    } else { return res.status(404).json({ "message": 'token not found' }) }
}

