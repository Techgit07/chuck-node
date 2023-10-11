import { Request, Response } from "express";
import { userModel } from "../../database";
import config from 'config'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
const axios = require('axios');

const ObjectId = require('mongoose').Types.ObjectId;
const jwt_token_secret = config.get('jwt_token_secret')

export const signUp = async (req: Request, res: Response) => {
    let body = req.body
    try {
        let existingMail = await userModel.findOne({ email: body.email, isActive: true });
        if (!existingMail) {
            const salt = await bcryptjs.genSaltSync(8);
            const hashPassword = await bcryptjs.hash(body.password, salt);
            body.password = hashPassword
            let response = await userModel.create(body);
            if (response) {
                const token = jwt.sign({
                    _id: response._id,
                    status: "Login",
                    generatedOn: (new Date().getTime())
                }, jwt_token_secret)
                return res.status(200).send({ "message": "userData add successfully", body, token })
            } else { return res.status(403).send({ "message": "bad request" }) }
        } else { return res.status(409).send({ "message": "email already register" }) }
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json({ "error": "internal server error" })
    }
}

export const login = async (req: Request, res: Response) => {
    let body = await req.body,
        { user }: any = req.headers
    try {
        let response: any = await userModel.findOne({ email: body.email, isActive: true });
        console.log("----loginRes", response);
        if (!response) {
            return res.status(403).json({ "message": "invalid mail" });
        }
        const passwordMatch = await bcryptjs.compare(body.password, response.password);
        if (!passwordMatch) {
            return res.status(403).json({ "message": "invalid email or Password" });
        }
        const token = jwt.sign({
            _id: response._id,
            status: "Login",
            generatedOn: (new Date().getTime())
        }, jwt_token_secret)
        await response.save();
        response = { response, token };
        return res.status(200).json({ "message": "login success", response, token });
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json({ "message": 'internal server error' });
    }
}

export const getProfile = async (req: Request, res: Response) => {
    let { user }: any = req.headers,
        body = req.body
    try {
        let response = await userModel.findOne({ _id: new ObjectId(user?._id), isActive: true })
        if (response) {
            return res.status(200).json({ "message": 'profile get success!', response })
        } else { return res.status(404).json({ "message": 'profile not found' }) }
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json({ "message": 'internal server error' })
    }
}

export const chuckJoke = async (req: Request, res: Response) => {
    let { user }: any = req.headers
    try {
        let response = await userModel.findOne({ _id: new ObjectId(user?._id), isActive: true })
        if (response) {
            const chuckNorrisApiResponse = await axios.get('https://api.chucknorris.io/jokes/random');
            const joke = chuckNorrisApiResponse.data.value;
            res.json({ joke });
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch Chuck Norris joke' });
    }
};

export const logOut = async (req: Request, res: Response) => {
    let { user }: any = req.headers
    try {
        let response: any = await userModel.updateOne({ _id: new ObjectId(user?._id), isActive: true }, { $pull: { deviceToken: { $in: [req.body?.deviceToken] } } });
        console.log(response)
        if (response) { return res.status(200).send({ error: 'logout success!', response }) }
    } catch (error) { return res.status(500).send({ error: 'internal server error' }) }
}

