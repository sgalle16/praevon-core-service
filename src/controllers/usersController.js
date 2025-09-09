import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const getMe = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({ 
            where: { id:req.userId},
            select: { password: false, rentals: true, properties: true, username: true, email: true, phone: true, createdAt: true, identified: true }
            });
        res.json(user)
    } catch (err) {
        next(err)
    }
};

const getUserById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, username: true, createdAt: true, properties: true }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
};

export {getMe, getUserById};

