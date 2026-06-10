import express from "express";
import airportRoutes from "./routes/airport.routes";
import airlineRoutes from "./routes/airline.routes";
import flightRoutes from "./routes/flight.routes";
import authRoutes from "./routes/auth.routes";
import bookingRoutes from "./routes/booking.routes";
import passengerRoutes from "./routes/passenger.routes";
import paymentRoutes from "./routes/payment.routes";

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
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/bookings", passengerRoutes);
app.use("/api/payments", paymentRoutes);

export default app;
