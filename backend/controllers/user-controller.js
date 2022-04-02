const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const HttpError = require("../models/http-error");
const User = require('../models/user')
const jwt = require('jsonwebtoken')



const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        next(new HttpError(`Invalid inputs `, 422))
    }

    const {name, email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email})
    }catch (e) {
        const error = new HttpError(
            "Could not find existing user", 500
        )
        return next(error)
    }
    if(existingUser) {
        const error = new HttpError(
            "User exist already", 422
        )
        return next(error)
    }

    let hashPassword;
    try {
        hashPassword = await bcrypt.hash(password, 12);
    }catch (e) {
        const error = new HttpError(
            "Could not create user", 500
        )
        return next(error)
    }


    const createdUser = new User({
        name,
        email,
        isAdmin : false,
        password : hashPassword,
        image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/City_Lights_%2833522578970%29.jpg/1024px-City_Lights_%2833522578970%29.jpg?1646766503738',
        places: []
    })


    try{
        await createdUser.save()
    }catch (e) {
        const error = new HttpError(
            'SIGNUP failed',
            500
        );
        return next(error);
    }

    let token;
    try {
        token = jwt.sign(
            {userId: createdUser.id, email: createdUser.email},
            'best_key',
            {expiresIn: '1h'})
    }catch (e) {
        const error = new HttpError(
            'SIGNUP failed',
            500
        );
        return next(error);
    }


    res.status(201).json(
        {   userId: createdUser.id,
            userName :createdUser.name,
            userImg: createdUser.image,
            email: createdUser.email,
            token: token,
            isAdmin: createdUser.isAdmin
        }
    )

}

exports.signup = signup;

