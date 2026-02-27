import React from "react";

export default function MaintenancePage() {
    return (
        <main className="container">
            <div
                className="glass-panel fade-in-up"
                style={{
                    padding: "4rem",
                    maxWidth: "700px",
                    width: "100%",
                    textAlign: "center"
                }}
            >
                <h1
                    style={{
                        fontSize: "2.5rem",
                        marginBottom: "1.5rem",
                        fontWeight: "700",
                        background: "linear-gradient(to right, #fff, #a78bfa)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                >
                    Under Maintenance
                </h1>

                <div style={{ color: "#a1a1aa", fontSize: "1.2rem", lineHeight: "1.6", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <p>
                        We apologize for the temporary problem.
                    </p>
                    <p>
                        The server for payment api interrogation is undergoing maintenance.
                    </p>
                    <p style={{ color: "#d4d4d8", fontWeight: "500" }}>
                        Thank you for your patience.
                    </p>
                </div>
            </div>
        </main>
    );
}
