"use client";

import { useRouter } from "next/navigation";

export default function PendingPage() {
    const router = useRouter();

    return (
        <main className="container" style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="glass-panel fade-in-up" style={{
                padding: "3rem",
                maxWidth: "600px",
                width: "100%",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "1.5rem"
            }}>
                <div style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    background: "rgba(234, 179, 8, 0.1)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "1rem",
                    border: "1px solid rgba(234, 179, 8, 0.2)"
                }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                </div>

                <h1 style={{ fontSize: "2rem", fontWeight: "700", color: "#fbbf24" }}>
                    Application Pending
                </h1>

                <p style={{ color: "#d4d4d8", fontSize: "1.1rem", lineHeight: "1.6" }}>
                    Your withdrawal application has been submitted successfully and is currently under review.
                </p>

                <div style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    padding: "1rem",
                    borderRadius: "12px",
                    width: "100%",
                    marginTop: "1rem"
                }}>
                    <p style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
                        Please allow 24-48 hours for the verification process to complete. You will be notified once the status changes.
                    </p>
                </div>

                <div style={{ display: "flex", gap: "1rem", width: "100%", maxWidth: "300px", marginTop: "1.5rem", flexDirection: "column" }}>
                    <button
                        onClick={() => router.push("/")}
                        className="glass-button"
                        style={{ width: "100%" }}
                    >
                        Back to Home
                    </button>

                    <a
                        href="https://t.me/redghostsp"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "block",
                            textAlign: "center",
                            width: "100%",
                            padding: "1rem",
                            borderRadius: "12px",
                            border: "1px solid rgba(34, 158, 217, 0.3)",
                            background: "rgba(34, 158, 217, 0.1)",
                            color: "#229ED9",
                            textDecoration: "none",
                            fontWeight: "600",
                            transition: "all 0.3s ease"
                        }}
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </main>
    );
}
