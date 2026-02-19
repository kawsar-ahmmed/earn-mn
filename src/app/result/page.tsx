"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import VerificationModal from "./VerificationModal";

// Dummy Data Configuration
const DUMMY_PROFILES: Record<string, {
    name: string;
    status: string;
    balance: string; // Varies
    role: string;
    withdrawalAmount: string; // Varies
    badge: string;
    subscriptionAmount: string;
    tasks: { pending: number; active: number; completed: number; }
}> = {
    // Naeem Islam
    "01875331445": {
        name: "Naeem Islam",
        status: "Verified",
        balance: "3,800 BDT",
        role: "Premium Member",
        withdrawalAmount: "3,400 BDT",
        badge: "Gold",
        subscriptionAmount: "3,500 BDT",
        tasks: { pending: 250, active: 220, completed: 45 }
    },
    // Aysha akter bristy
    "01609806767": {
        name: "Aysha akter bristy",
        status: "Verified", // Assuming verified for demo
        balance: "2,800 BDT",
        role: "Premium Member",
        withdrawalAmount: "2,340 BDT",
        badge: "Gold",
        subscriptionAmount: "3,500 BDT",
        tasks: { pending: 150, active: 135, completed: 25 } // Updated as per request
    }
};

const Icons = {
    Nagad: () => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="url(#paint0_linear_nagad)" />
            <path d="M9 10C9 10 12.5 10 14 13C15.5 16 12 22 16 22C20 22 21 16 19 13C17 10 23 10 23 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <defs>
                <linearGradient id="paint0_linear_nagad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F7941D" />
                    <stop offset="1" stopColor="#ED1C24" />
                </linearGradient>
            </defs>
        </svg>
    ),
    Bkash: () => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#E2136E" />
            <path d="M10 16L18 8L16 16L24 14L14 24L16 16L10 16Z" fill="white" />
        </svg>
    ),
    Bank: () => (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#2563EB" />
            <path d="M8 12L16 6L24 12V14H8V12ZM10 16H13V22H10V16ZM14.5 16H17.5V22H14.5V16ZM19 16H22V22H19V16ZM8 24H24V26H8V24Z" fill="white" />
        </svg>
    ),
    UserAvatar: () => (
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="40" fill="url(#paint0_linear_avatar)" />
            <path d="M40 20C46.6274 20 52 25.3726 52 32C52 38.6274 46.6274 44 40 44C33.3726 44 28 38.6274 28 32C28 25.3726 33.3726 20 40 20ZM40 48C53.3333 48 64 53.3333 64 60V64H16V60C16 53.3333 26.6667 48 40 48Z" fill="white" fillOpacity="0.8" />
            <defs>
                <linearGradient id="paint0_linear_avatar" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#94A3B8" />
                    <stop offset="1" stopColor="#475569" />
                </linearGradient>
            </defs>
        </svg>
    )
};

function ResultContent() {
    const searchParams = useSearchParams();
    const phone = searchParams.get("phone");
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const profile = phone ? DUMMY_PROFILES[phone] : null;

    const showWarnings = phone !== "01875331445";

    if (!mounted) return null;

    const handleWithdraw = () => {
        // Check if already pending for this phone number
        const isPending = localStorage.getItem(`withdrawal_pending_${phone}`);
        if (isPending === "true") {
            router.push("/pending");
            return;
        }
        setIsVerificationModalOpen(true);
    };

    const handleVerificationSubmit = (nidNumber: string, nidFile: File | null) => {
        setIsVerificationModalOpen(false);
        // Simulate API call success
        // Save pending status to localStorage
        if (phone) {
            localStorage.setItem(`withdrawal_pending_${phone}`, "true");
        }
        router.push("/pending");
        // alert(`Verification Submitted!\nName: ${profile?.name}\nNID: ${nidNumber}\nFile: ${nidFile?.name}\n\nInitiating withdrawal for ${profile?.withdrawalAmount}...`);
    };

    return (
        <main className="container">
            {/* Government Notice */}
            {showWarnings && (
                <div className="fade-in-up" style={{
                    background: "rgba(220, 38, 38, 0.15)",
                    border: "1px solid rgba(220, 38, 38, 0.4)",
                    color: "#fca5a5",
                    padding: "1.5rem",
                    borderRadius: "16px",
                    marginBottom: "2rem",
                    maxWidth: "800px",
                    width: "100%",
                    textAlign: "center",
                    fontSize: "1.1rem",
                    lineHeight: "1.6"
                }}>
                    ⚠️ বাংলাদেশ নির্বাচন আইন অনুসারে , সরকার গঠন এর আগে পর্যন্ত , বৌদেশিক লেনদেন ১৮ তারিখ পর্যন্ত নিষ্ক্রিয় থাকবে।
                </div>
            )}

            <div className="glass-panel fade-in-up" style={{ padding: "3rem", maxWidth: "800px", width: "100%", animationDelay: "0.1s" }}>
                <button
                    onClick={() => router.back()}
                    style={{
                        background: "none",
                        border: "none",
                        color: "#a1a1aa",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        marginBottom: "2rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem"
                    }}
                >
                    ← Back to Search
                </button>

                <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                    User Details
                </h1>
                <p style={{ color: "#a1a1aa", marginBottom: "2rem" }}>
                    Showing data for: <span style={{ color: "#fff", fontWeight: "bold" }}>{phone || "Unknown"}</span>
                </p>

                {profile ? (
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5rem",
                        animation: "fadeInUp 0.5s ease-out"
                    }}>
                        {/* Profile Header Card */}
                        <div className="profile-header" style={{
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "16px",
                            padding: "2rem",
                            border: "1px solid rgba(255,255,255,0.1)"
                        }}>
                            {/* Avatar */}
                            <div className="avatar" style={{ flexShrink: 0 }}>
                                <Icons.UserAvatar />
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                                    <h2 style={{ fontSize: "1.5rem", margin: 0 }}>{profile.name}</h2>
                                    {/* Badge */}
                                    <span style={{
                                        background: profile.badge === "Gold"
                                            ? "linear-gradient(135deg, #fbbf24, #d97706)"
                                            : "linear-gradient(135deg, #94a3b8, #475569)",
                                        color: "#fff",
                                        padding: "0.25rem 0.75rem",
                                        borderRadius: "8px",
                                        fontSize: "0.8rem",
                                        fontWeight: "600",
                                        boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
                                    }}>
                                        {profile.badge}
                                    </span>
                                </div>
                                <div className="badges" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                                    <span style={{
                                        padding: "0.25rem 0.75rem",
                                        borderRadius: "99px",
                                        fontSize: "0.8rem",
                                        background: profile.status === "Verified" ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)",
                                        color: profile.status === "Verified" ? "#4ade80" : "#f87171",
                                        border: profile.status === "Verified" ? "1px solid rgba(34, 197, 94, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)"
                                    }}>
                                        {profile.status}
                                    </span>
                                    <span style={{
                                        padding: "0.25rem 0.75rem",
                                        borderRadius: "99px",
                                        fontSize: "0.8rem",
                                        background: "rgba(255, 255, 255, 0.1)",
                                        color: "#e4e4e7"
                                    }}>
                                        {profile.role}
                                    </span>
                                </div>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "flex-end", minWidth: "200px" }}>
                                <button
                                    onClick={handleWithdraw}
                                    className="glass-button"
                                    style={{
                                        background: "linear-gradient(135deg, #059669, #047857)",
                                        fontSize: "0.9rem",
                                        padding: "0.75rem 1.5rem",
                                        boxShadow: "0 4px 15px rgba(5, 150, 105, 0.4)",
                                        width: "100%"
                                    }}
                                >
                                    Withdraw Funds
                                </button>
                                {/* Payment Methods Text Badges */}
                                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                                    <span style={{ fontSize: "0.8rem", color: "#a1a1aa" }}>Via:</span>
                                    <span style={{ background: "#e11c38", color: "white", padding: "2px 6px", borderRadius: "4px", fontSize: "0.7rem", fontWeight: "bold" }}>Nagad</span>
                                    <span style={{ background: "#e2136e", color: "white", padding: "2px 6px", borderRadius: "4px", fontSize: "0.7rem", fontWeight: "bold" }}>Bkash</span>
                                    <span style={{ background: "#2563eb", color: "white", padding: "2px 6px", borderRadius: "4px", fontSize: "0.7rem", fontWeight: "bold" }}>Bank</span>
                                </div>
                            </div>
                        </div>

                        {/* Withdrawal Notice */}
                        {showWarnings && (
                            <div style={{
                                background: "rgba(234, 179, 8, 0.1)",
                                border: "1px solid rgba(234, 179, 8, 0.3)",
                                color: "#fde047",
                                padding: "1rem",
                                borderRadius: "12px",
                                fontSize: "0.95rem",
                                textAlign: "center",
                                lineHeight: "1.5"
                            }}>
                                আমরা শুধু মাত্র Gold User প্রোফাইল এর জন্য ইনস্টান উইথড্র অপশন Active। আপনি ৬৫০ BDT Pay করলে ইনস্ট্যান্ট Withdraw Option, Active হয়ে যাবে।
                            </div>
                        )}

                        {/* Financial Stats Grid */}
                        <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                            <div style={{
                                background: "rgba(255,255,255,0.03)",
                                padding: "1.5rem",
                                borderRadius: "12px",
                                border: "1px solid rgba(255,255,255,0.05)"
                            }}>
                                <p style={{ color: "#a1a1aa", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Total Balance</p>
                                <p style={{ fontSize: "1.5rem", fontWeight: "600", color: "#fff" }}>{profile.balance}</p>
                            </div>
                            <div style={{
                                background: "rgba(255,255,255,0.03)",
                                padding: "1.5rem",
                                borderRadius: "12px",
                                border: "1px solid rgba(255,255,255,0.05)"
                            }}>
                                <p style={{ color: "#a1a1aa", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Withdrawal Amount</p>
                                <p style={{ fontSize: "1.5rem", fontWeight: "600", color: "#fbbf24" }}>{profile.withdrawalAmount}</p>
                            </div>
                            <div style={{
                                background: "rgba(255,255,255,0.03)",
                                padding: "1.5rem",
                                borderRadius: "12px",
                                border: "1px solid rgba(255,255,255,0.05)"
                            }}>
                                <p style={{ color: "#a1a1aa", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Subscription</p>
                                <p style={{ fontSize: "1.5rem", fontWeight: "600", color: "#38bdf8" }}>{profile.subscriptionAmount}</p>
                            </div>
                        </div>

                        {/* Task Statistics Section */}
                        <div style={{
                            background: "rgba(255,255,255,0.03)",
                            borderRadius: "16px",
                            padding: "1.5rem",
                            border: "1px solid rgba(255,255,255,0.05)"
                        }}>
                            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#d4d4d8" }}>Task Overview</h3>
                            <div className="task-grid">

                                {/* Pending */}
                                <div style={{
                                    background: "rgba(245, 158, 11, 0.1)",
                                    borderRadius: "12px",
                                    padding: "1rem",
                                    border: "1px solid rgba(245, 158, 11, 0.2)",
                                    textAlign: "center"
                                }}>
                                    <p style={{ color: "#fbbf24", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.25rem" }}>Pending</p>
                                    <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#fbbf24" }}>{profile.tasks.pending}</p>
                                </div>

                                {/* Active */}
                                <div style={{
                                    background: "rgba(59, 130, 246, 0.1)",
                                    borderRadius: "12px",
                                    padding: "1rem",
                                    border: "1px solid rgba(59, 130, 246, 0.2)",
                                    textAlign: "center"
                                }}>
                                    <p style={{ color: "#60a5fa", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.25rem" }}>Active</p>
                                    <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#60a5fa" }}>{profile.tasks.active}</p>
                                </div>

                                {/* Completed */}
                                <div style={{
                                    background: "rgba(168, 85, 247, 0.1)",
                                    borderRadius: "12px",
                                    padding: "1rem",
                                    border: "1px solid rgba(168, 85, 247, 0.2)",
                                    textAlign: "center"
                                }}>
                                    <p style={{ color: "#c084fc", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.25rem" }}>Completed</p>
                                    <p style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#c084fc" }}>{profile.tasks.completed}</p>
                                </div>

                            </div>
                        </div>

                    </div>
                ) : (
                    <div style={{
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "16px",
                        padding: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        minHeight: "300px",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px dashed rgba(255,255,255,0.1)"
                    }}>
                        <h3 style={{ color: "#d4d4d8" }}>No specific data found.</h3>
                        <p style={{ color: "#71717a", maxWidth: "400px", textAlign: "center" }}>
                            Try searching for <code style={{ color: "#a78bfa", background: "rgba(167, 139, 250, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>01875331445</code> or <code style={{ color: "#a78bfa", background: "rgba(167, 139, 250, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>01609806767</code> to see a demo profile.
                        </p>
                    </div>
                )}
                <VerificationModal
                    isOpen={isVerificationModalOpen}
                    onClose={() => setIsVerificationModalOpen(false)}
                    onSubmit={handleVerificationSubmit}
                />
            </div>
        </main>
    );
}

export default function ResultPage() {
    return (
        <Suspense fallback={<div className="container"><p>Loading...</p></div>}>
            <ResultContent />
        </Suspense>
    );
}
