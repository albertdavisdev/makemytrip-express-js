import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { flightId } = req.body;

    const flight = await prisma.flight.findUnique({
      where: {
        id: Number(flightId),
      },
    });

    if (!flight) {
      return res.status(404).json({
        success: false,
        message: "Flight not found",
      });
    }

    const booking = await prisma.booking.create({
      data: {
        bookingCode: "BK" + Date.now().toString().slice(-8),
        userId: req.userId!,
        flightId: flight.id,
        totalAmount: flight.price,
      },
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getMyBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: req.userId,
      },
      include: {
        flight: {
          include: {
            airline: true,
            fromAirport: true,
            toAirport: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
