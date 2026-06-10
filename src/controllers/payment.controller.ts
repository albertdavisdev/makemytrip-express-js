import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

export const payBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { bookingId } = req.params;

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

    const payment = await prisma.payment.create({
      data: {
        bookingId: booking.id,
        amount: booking.totalAmount,
        status: "SUCCESS",
        transactionId: crypto.randomUUID(),
      },
    });

    await prisma.booking.update({
      where: {
        id: booking.id,
      },
      data: {
        status: "CONFIRMED",
      },
    });

    res.json({
      success: true,
      message: "Payment successful",
      data: payment,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
