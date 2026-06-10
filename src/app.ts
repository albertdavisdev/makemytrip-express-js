import express from "express";
import airportRoutes from "./routes/airport.routes";
import airlineRoutes from "./routes/airline.routes";
import flightRoutes from "./routes/flight.routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "MakemyTrip API Running",
  });
});

app.use("/api/airports", airportRoutes);
app.use("/api/airlines", airlineRoutes);
app.use("/api/flights", flightRoutes);

export default app;
