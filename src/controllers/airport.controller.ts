import { Request, Response } from "express";
import prisma from "../config/prisma";
import redisClient from "../config/redis";

export const getAirports = async (req: Request, res: Response) => {
  const airports = await prisma.airport.findMany({
    orderBy: {
      city: "asc",
    },
  });

  res.json({
    success: true,
    data: airports,
  });
};
