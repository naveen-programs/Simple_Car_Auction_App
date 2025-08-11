import React, { useState, useEffect, useRef } from "react";
import mercedesImg from './assets/1955 Mercedes-Benz 300SL.webp';
import jaguarImg from './assets/1961 Jaguar E-Type.jpeg';
import DodgeImg from './assets/1970 Dodge Charger.webp';
import FordImg from './assets/1967 Ford Mustang.webp';


export default function App() {
  const [cars, setCars] = useState([
    {
      id: 1,
      name: "1967 Ford Mustang",
      highestBid: 2500000,
      currency: "INR",
      image:
        FordImg,
    },
    {
      id: 2,
      name: "1955 Mercedes-Benz 300SL",
      highestBid: 7500000,
      currency: "INR",
      image:
        mercedesImg,
    },
    {
      id: 3,
      name: "1961 Jaguar E-Type",
      highestBid: 3500000,
      currency: "INR",
      image:
        jaguarImg,
    },
    {
      id: 4,
      name: "1970 Dodge Charger",
      highestBid: 2800000,
      currency: "INR",
      image:
        DodgeImg,
    },
  ]);

  const [selectedCar, setSelectedCar] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [bidderName, setBidderName] = useState("You");
  const timerRef = useRef(null);

  // Simulate random bids every 10 seconds
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCars((prev) =>
        prev.map((car) => {
          if (Math.random() < 0.3) {
            const increase = Math.floor(Math.random() * 100000) + 50000;
            return { ...car, highestBid: car.highestBid + increase };
          }
          return car;
        })
      );
    }, 10000);

    return () => clearInterval(timerRef.current);
  }, []);

  function openBid(car) {
    setSelectedCar(car);
    setBidAmount((car.highestBid + 50000).toString());
  }

  function placeBid(e) {
    e.preventDefault();
    if (!selectedCar) return;

    const amount = Number(bidAmount);
    if (isNaN(amount) || amount <= selectedCar.highestBid) {
      alert(
        `Bid must be higher than current highest bid (${selectedCar.highestBid})`
      );
      return;
    }

    setCars((prev) =>
      prev.map((c) =>
        c.id === selectedCar.id ? { ...c, highestBid: amount } : c
      )
    );

    setSelectedCar(null);
    setBidAmount("");
  }

  const leaderboard = [...cars].sort((a, b) => b.highestBid - a.highestBid);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>Vintage Car Auction — Live Leaderboard</h1>
      <p style={{ color: "#555" }}>
        Simulated updates every 10 seconds. Place your bids!
      </p>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        {/* Car List */}
        <div style={{ flex: 2 }}>
          <h2>Cars</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            {cars.map((car) => (
              <div
                key={car.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  padding: 12,
                  background: "#fff",
                }}
              >
                <img
                  src={car.image}
                  alt={car.name}
                  style={{
                    width: "100%",
                    height: 150,
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />
                <h3 style={{ marginTop: 8 }}>{car.name}</h3>
                <div>
                  Highest Bid:{" "}
                  <strong>
                    {car.currency} {car.highestBid.toLocaleString()}
                  </strong>
                </div>
                <button
                  onClick={() => openBid(car)}
                  style={{
                    marginTop: 10,
                    padding: "6px 10px",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Place Bid
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div style={{ flex: 1 }}>
          <h2>Leaderboard</h2>
          <ol style={{ paddingLeft: 20 }}>
            {leaderboard.map((car) => (
              <li key={car.id}>
                <div>
                  <strong>{car.name}</strong>
                </div>
                <div>
                  {car.currency} {car.highestBid.toLocaleString()}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Bid Popup */}
      {selectedCar && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setSelectedCar(null)}
        >
          <form
            onSubmit={placeBid}
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 8,
              minWidth: 320,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Place bid on: {selectedCar.name}</h3>

            <label style={{ display: "block", marginTop: 8 }}>Your Name</label>
            <input
              value={bidderName}
              onChange={(e) => setBidderName(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />

            <label style={{ display: "block", marginTop: 8 }}>
              Amount ({selectedCar.currency})
            </label>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />

            <div
              style={{
                marginTop: 12,
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
              }}
            >
              <button type="button" onClick={() => setSelectedCar(null)}>
                Cancel
              </button>
              <button type="submit">Submit Bid</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
