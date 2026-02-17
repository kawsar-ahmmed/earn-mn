"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    setLoading(true);
    // Simulate a small delay for better UX feel
    setTimeout(() => {
      router.push(`/result?phone=${encodeURIComponent(phone)}`);
    }, 600);
  };

  return (
    <main className="container">
      <div className="glass-panel fade-in-up" style={{ padding: "4rem", maxWidth: "600px", width: "100%", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", fontWeight: "700", background: "linear-gradient(to right, #fff, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Search Profile
        </h1>
        <p style={{ color: "#a1a1aa", marginBottom: "3rem", fontSize: "1.1rem" }}>
          Enter a phone number to retrieve details instantaneously.
        </p>

        <form onSubmit={handleSearch} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ textAlign: "left" }}>
            <label htmlFor="phone" style={{ display: "block", marginBottom: "0.5rem", color: "#d4d4d8", fontSize: "0.9rem", marginLeft: "4px" }}>
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01712345678"
              className="glass-input"
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            className="glass-button"
            disabled={loading}
            style={{ opacity: loading ? 0.8 : 1 }}
          >
            {loading ? "Searching..." : "Search Profile"}
          </button>
        </form>
      </div>
    </main>
  );
}
