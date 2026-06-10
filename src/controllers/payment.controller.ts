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

    const existingPayment = await prisma.payment.findUnique({
      where: {
        bookingId: booking.id,
      },
    });

    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: "Payment already completed for this booking",
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          bookingId: booking.id,
          amount: booking.totalAmount,
          status: "SUCCESS",
          transactionId: crypto.randomUUID(),
        },
      });

      const updatedBooking = await tx.booking.update({
        where: {
          id: booking.id,
        },
        data: {
          status: "CONFIRMED",
        },
      });

      return {
        payment,
        booking: updatedBooking,
      };
    });

    res.json({
      success: true,
      message: "Payment successful",
      data: result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
