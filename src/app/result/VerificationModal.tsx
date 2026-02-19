"use client";

import React, { useState } from "react";

interface VerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (nidNumber: string, nidFile: File | null) => void;
}

export default function VerificationModal({ isOpen, onClose, onSubmit }: VerificationModalProps) {
    const [nidNumber, setNidNumber] = useState("");
    const [nidFile, setNidFile] = useState<File | null>(null);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!nidNumber.trim()) {
            setError("Please enter your NID number");
            return;
        }

        if (!nidFile) {
            setError("Please upload a photo of your NID");
            return;
        }

        setError("");
        onSubmit(nidNumber, nidFile);
        // Reset form
        setNidNumber("");
        setNidFile(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNidFile(e.target.files[0]);
            setError("");
        }
    };

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            animation: "fadeIn 0.2s ease-out",
            padding: "1rem"
        }}>
            <div className="glass-panel" style={{
                width: "100%",
                maxWidth: "500px",
                padding: "1.5rem",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                background: "#18181b", // Solid background as requested
                border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#fff" }}>
                        Identity Verification
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "#a1a1aa",
                            cursor: "pointer",
                            fontSize: "1.5rem",
                            padding: "0.5rem"
                        }}
                    >
                        &times;
                    </button>
                </div>

                <p style={{ color: "#d4d4d8", fontSize: "0.95rem", lineHeight: "1.5" }}>
                    To process your withdrawal securely, please provide your National ID details.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

                    {/* NID Number Input */}
                    <div>
                        <label htmlFor="nidNumber" style={{ display: "block", marginBottom: "0.5rem", color: "#e4e4e7", fontSize: "0.9rem" }}>
                            NID Number
                        </label>
                        <input
                            id="nidNumber"
                            type="text"
                            value={nidNumber}
                            onChange={(e) => {
                                setNidNumber(e.target.value);
                                setError("");
                            }}
                            placeholder="Enter 10 or 13 digit NID number"
                            className="glass-input"
                            style={{ width: "100%" }}
                        />
                    </div>

                    {/* File Upload */}
                    <div>
                        <label htmlFor="nidFile" style={{ display: "block", marginBottom: "0.5rem", color: "#e4e4e7", fontSize: "0.9rem" }}>
                            Upload NID Document
                        </label>
                        <div style={{
                            border: "2px dashed rgba(255,255,255,0.2)",
                            borderRadius: "12px",
                            padding: "1.5rem",
                            textAlign: "center",
                            background: "rgba(255,255,255,0.02)",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}
                            onClick={() => document.getElementById("nidFile")?.click()}
                        >
                            <input
                                id="nidFile"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                            />
                            {nidFile ? (
                                <div style={{ color: "#4ade80", fontWeight: "500" }}>
                                    ✓ {nidFile.name}
                                </div>
                            ) : (
                                <div style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
                                    <span style={{ color: "#8b5cf6", fontWeight: "600" }}>Click to upload</span> or drag and drop
                                    <br />
                                    PNG, JPG up to 5MB
                                </div>
                            )}
                        </div>
                    </div>

                    {error && (
                        <div style={{
                            color: "#f87171",
                            fontSize: "0.9rem",
                            background: "rgba(239, 68, 68, 0.1)",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem"
                        }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: "0.875rem",
                                borderRadius: "12px",
                                border: "1px solid rgba(255,255,255,0.1)",
                                background: "rgba(255,255,255,0.05)",
                                color: "#e4e4e7",
                                cursor: "pointer",
                                fontSize: "1rem",
                                fontWeight: "500",
                                transition: "background 0.2s"
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="glass-button"
                            style={{ flex: 1, padding: "0.875rem" }}
                        >
                            Submit Verification
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
