import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bycrypt from 'bcryptjs';
import Session from '../models/session.js';
import { randomBytes } from 'crypto';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};


const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_REFRESH, { expiresIn: '7d' });
};

const generateSessionId = () => {
    return randomBytes(16).toString('hex'); 
};

export const register = async (req, res) => {
    const { institution, grade, age, name, password } = req.body;
    console.log(institution, grade, age, name, password);
    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
        }

        // Crear y guardar el nuevo usuario
        const user = new User({ institution, grade, age, name, password });
        console.log(user);
        await user.save();

        // enviar respuesta
        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: user._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { name, password } = req.body;
    console.log(name, password);
    try {
        const user = await User.findOne({ name });
        if (!user) { 
            return res.json({ error: 'Usuario no encontrado' });
        }

        const passwordDb = user.password;
        const passwordReq = password;

        if (passwordDb !== passwordReq) {
            return res.json({ error: 'Contraseña incorrecta' });
        }
        // const hashedPassword = user.password;
        // const isMatch = await bycrypt.compare(password, hashedPassword);
        // if (!isMatch) {
        //     return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        // }
        const token = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);
        const sessionId = generateSessionId();

        const session = new Session({
            sessionId,
            token,
            refreshToken,
        });
        await session.save();

        // Establece la cookie HTTP-Only con el token
        res.cookie('sessionId', sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict', // Protege la cookie de ataques CSRF
            maxAge: 1000 * 60 * 60, // Expira en 1 dia
        });
        res.json({ userId: user._id, message: 'Sesión iniciada correctamente'});


    } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
    }
};


export const logout = async (req, res) => {
    console.log(req.cookies);
    const sessionId = req.cookies.sessionId;
    console.log(sessionId);
    const session = await Session.findOne( { sessionId } );
    if (!session) {
        return res.status(401).json({ message: 'Not authorized, no session' });
    }
    console.log(session);
    await session.deleteOne();
    res.status(200).json({ message: 'Sesión cerrada correctamente'});
};