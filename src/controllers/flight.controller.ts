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
  const { from, to, minPrice, maxPrice, stops, sort } = req.query;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {};

  if (from) {
    where.fromAirport = {
      code: String(from).toUpperCase(),
    };
  }

  if (to) {
    where.toAirport = {
      code: String(to).toUpperCase(),
    };
  }

  if (minPrice || maxPrice) {
    where.price = {};

    if (minPrice) {
      where.price.gte = Number(minPrice);
    }

    if (maxPrice) {
      where.price.lte = Number(maxPrice);
    }
  }

  if (stops !== undefined) {
    where.stops = Number(stops);
  }

  const flights = await prisma.flight.findMany({
    skip,
    take: limit,
    where,
    include: {
      airline: true,
      fromAirport: true,
      toAirport: true,
    },
    orderBy: sort === "price" ? { price: "asc" } : { departureTime: "asc" },
  });

  res.json({
    success: true,
    count: flights.length,
    data: flights,
  });
};
