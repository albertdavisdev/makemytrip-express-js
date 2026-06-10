import prisma from "../src/config/prisma";

async function main() {
  await prisma.airport.createMany({
    data: [
      {
        code: "DXB",
        name: "Dubai International Airport",
        city: "Dubai",
        country: "United Arab Emirates",
      },
      {
        code: "COK",
        name: "Cochin International Airport",
        city: "Kochi",
        country: "India",
      },
      {
        code: "DEL",
        name: "Indira Gandhi International Airport",
        city: "Delhi",
        country: "India",
      },
    ],
    skipDuplicates: true,
  });

  console.log("Airport seed completed");

  await prisma.airline.createMany({
    data: [
      {
        code: "EK",
        name: "Emirates",
      },
      {
        code: "AI",
        name: "Air India",
      },
      {
        code: "QR",
        name: "Qatar Airways",
      },
      {
        code: "EY",
        name: "Etihad Airways",
      },
      {
        code: "6E",
        name: "IndiGo",
      },
    ],
    skipDuplicates: true,
  });

  const dxb = await prisma.airport.findUnique({ where: { code: "DXB" } });
  const cok = await prisma.airport.findUnique({ where: { code: "COK" } });
  const del = await prisma.airport.findUnique({ where: { code: "DEL" } });

  const emirates = await prisma.airline.findUnique({ where: { code: "EK" } });
  const airIndia = await prisma.airline.findUnique({ where: { code: "AI" } });
  const qatar = await prisma.airline.findUnique({ where: { code: "QR" } });

  if (!dxb || !cok || !del || !emirates || !airIndia || !qatar) {
    throw new Error("Required seed data missing");
  }

  await prisma.flight.createMany({
    data: [
      {
        flightNumber: "EK501",
        airlineId: emirates.id,
        fromAirportId: dxb.id,
        toAirportId: cok.id,
        departureTime: new Date("2026-07-10T10:30:00Z"),
        arrivalTime: new Date("2026-07-10T16:00:00Z"),
        durationMinutes: 240,
        price: 950,
        availableSeats: 80,
        stops: 0,
      },
      {
        flightNumber: "AI934",
        airlineId: airIndia.id,
        fromAirportId: dxb.id,
        toAirportId: cok.id,
        departureTime: new Date("2026-07-10T13:20:00Z"),
        arrivalTime: new Date("2026-07-10T18:50:00Z"),
        durationMinutes: 240,
        price: 760,
        availableSeats: 60,
        stops: 0,
      },
      {
        flightNumber: "QR1001",
        airlineId: qatar.id,
        fromAirportId: dxb.id,
        toAirportId: cok.id,
        departureTime: new Date("2026-07-10T18:00:00Z"),
        arrivalTime: new Date("2026-07-11T02:00:00Z"),
        durationMinutes: 480,
        price: 690,
        availableSeats: 50,
        stops: 1,
      },
    ],
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
