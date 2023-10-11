import { Request, Response } from "express"
import Joi from "joi"

export const signUp = async (req: Request, res: Response, next: Function) => {
    const schema = Joi.object({
        name: Joi.string().required().error(new Error('name is required!')),
        email: Joi.string().lowercase().required().error(new Error('email is required!')),
        password: Joi.string().trim().required().error(new Error('password is required!')),
        address: Joi.string().required().error(new Error('address is required!')),
        gender: Joi.number().required().error(new Error('gender is required!')),
        businessName: Joi.string().required().error(new Error("businessName is Required!")),
        postCode: Joi.string().required().error(new Error("postCode is Required!")),
        city: Joi.string().required().error(new Error("city isRequired!")),
        phoneNumber: Joi.string().required().error(new Error("phoneNumber is Required!")),
        deviceToken: Joi.array().allow(null, "").error(new Error("Enter your deviceToken!")),
    })
    schema.validateAsync(req.body).then(() => {
        return next()
    }).catch(error => {
        res.status(400).json({ "message": "error", error })
    })
}

export const login = async (req: Request, res: Response, next: Function) => {
    const schema = Joi.object({
        email: Joi.string().lowercase().required().error(new Error('email is required!')),
        password: Joi.string().required().error(new Error('password is required!')),
        deviceToken: Joi.array().allow(null, "").error(new Error("Enter your deviceToken!")),
    })
    schema.validateAsync(req.body).then(() => {
        return next()
    }).catch(error => {
        res.status(400).json({ "message": "error", error })
    })
}

export const logout = async (req: Request, res: Response, next: any) => {
    const schema = Joi.object({
        deviceToken: Joi.string().error(new Error('deviceToken is string!')),
    })
    schema.validateAsync(req.body).then(() => {
        return next()
    }).catch(error => {
        res.status(400).json({ "message": "error", error })
    })
}