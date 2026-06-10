import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

export const addPassenger = async (req: AuthRequest, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { firstName, lastName, gender, passportNumber, nationality } =
      req.body;

    const booking = await prisma.booking.findFirst({
      where: {
        id: Number(bookingId),
        userId: req.userId,
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const passenger = await prisma.passenger.create({
      data: {
        bookingId: booking.id,
        firstName,
        lastName,
        gender,
        passportNumber,
        nationality,
      },
    });

    res.status(201).json({
      success: true,
      message: "Passenger added successfully",
      data: passenger,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getPassengers = async (req: AuthRequest, res: Response) => {
  try {
    const { bookingId } = req.params;

    const booking = await prisma.booking.findFirst({
      where: {
        id: Number(bookingId),
        userId: req.userId,
      },
      include: {
        passengers: true,
      },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      count: booking.passengers.length,
      data: booking.passengers,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
