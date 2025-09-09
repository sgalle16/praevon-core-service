import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const register = async (req, res, next) => {
    try {
        const { username, email, password, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                    username,
                    email, 
                    password: hashedPassword, 
                    phone
                }
        });

        const { password: _, ...safeUser } = newUser;
        res.status(201).json(safeUser);

    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email }});
        if(!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRES_IN || '7d' });

        const { password: _, ...safeUser } = user;
        res.json({ message: 'Succesful login', token, user: safeUser })
    } catch (err) {
        next(err);
    }
};

export { register, login };