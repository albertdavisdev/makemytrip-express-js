import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getFlights = async (req: Request, res: Response) => {
  const flights = await prisma.flight.findMany({
    include: {
      airline: true,
      fromAirport: true,
      toAirport: true,
    },
  });

  res.json({
    success: true,
    data: flights,
  });
};

export const searchFlights = async (req: Request, res: Response) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({
      success: false,
      message: "from and to are required",
    });
  }

  const flights = await prisma.flight.findMany({
    where: {
      fromAirport: {
        code: String(from),
      },
      toAirport: {
        code: String(to),
      },
    },
    include: {
      airline: true,
      fromAirport: true,
      toAirport: true,
    },
  });

  res.json({
    success: true,
    count: flights.length,
    data: flights,
  });
};
