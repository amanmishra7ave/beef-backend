const authSchema = require('../models/auth.models');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match',
    }),
});

const loginSchema = Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
});

exports.validateUser = (data) => userSchema.validate(data);

exports.validateLogin = (data) => loginSchema.validate(data);

exports.register = async (req, res) => {
    const { error, value } = exports.validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { name, password } = value;

    try {
        const existingUser = await authSchema.findOne({ name });
        if (existingUser) {
            return res.status(400).send('User with this name already exists. Please choose a different name.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new authSchema({ name, password: hashedPassword });
        await user.save();

        return res.status(201).json({ id: user._id, name: user.name });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    const { error, value } = exports.validateLogin(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const { name, password } = value;

    try {
        const user = await authSchema.findOne({ name });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send('Invalid username or password');
        }

        res.status(200).json({ id: user._id, name: user.name });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};