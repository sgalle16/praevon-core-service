import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

const createRental = async (req, res, next) => {
  try {
    const { propertyId } = req.body;
    const pid = parseInt(propertyId);

    const property = await prisma.property.findUnique({ where: { id: pid }});
    if (!property) return res.status(404).json({ error: 'The property you are trying to rent does not exist.' });
    if (property.ownerId === req.userId) return res.status(400).json({ error: 'You cannot rent your own property.' });

    const existing = await prisma.rental.findFirst({
      where: { propertyId: pid, renterId: req.userId, status: 'pending' }
    });
    if (existing) return res.status(400).json({ error: 'You already have a pending rental request for this property.' });

    const rental = await prisma.rental.create({
      data: {
        property: { connect: { id: pid }},
        renter: { connect: { id: req.userId }},
        status: 'pending'
      }
    });
    res.status(201).json(rental);
  } catch (err) { next(err); }
};

const listRentalsForUser = async (req, res, next) => {
  try {
    const rentals = await prisma.rental.findMany({
      where: { renterId: req.userId },
      include: { property: true }
    });
    res.json(rentals);
  } catch (err) { next(err); }
};

const listRentalsForOwner = async (req, res, next) => {
  try {
    const rentals = await prisma.rental.findMany({
      where: {
        property: {
          ownerId: req.userId
        }
      },
      include: {
        property: true,
        renter: {
          select: { id: true, username: true, email: true }
        }
      }
    });
    res.json(rentals);
  } catch (err) {
    next(err);
  }
};

const updateRentalStatus = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;
    const rental = await prisma.rental.findUnique({ where: { id }, include: { property: true }});
    if (!rental) return res.status(404).json({ error: 'Rental not found' });

    if (rental.property.ownerId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });

    const updated = await prisma.rental.update({
      where: { id },
      data: { status }
    });

    if (status === 'accepted') {
      await prisma.property.update({ where: { id: rental.propertyId }, data: { status: 'rented' }});
    }

    res.json(updated);
  } catch (err) { next(err); }
};

export {createRental, listRentalsForUser, listRentalsForOwner, updateRentalStatus};