import { Request, Response } from "express";
import prisma from "../config/prisma";

export const getAirlines = async (req: Request, res: Response) => {
  const airlines = await prisma.airline.findMany({
    orderBy: {
      name: "asc",
    },
  });

  res.json({
    success: true,
    data: airlines,
  });
};
