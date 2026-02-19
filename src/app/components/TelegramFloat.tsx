"use client";

import React from "react";

export default function TelegramFloat() {
    return (
        <a
            href="https://t.me/redghostsp"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: "fixed",
                bottom: "2rem",
                right: "2rem",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #229ED9, #0088cc)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                boxShadow: "0 4px 15px rgba(0, 136, 204, 0.4)",
                zIndex: 9999,
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                cursor: "pointer",
                textDecoration: "none"
            }}
            className="telegram-float"
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1) translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 136, 204, 0.6)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 136, 204, 0.4)";
            }}
        >
            <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M20.665 3.717L2.333 10.785C1.081 11.286 1.084 11.983 2.100 12.294L6.805 13.763L17.697 6.892C18.213 6.579 18.683 6.756 18.297 7.098L9.482 15.060L9.489 15.060C9.489 15.060 9.482 15.060 9.482 15.060V15.061L9.155 19.539C9.634 19.539 9.845 19.319 10.114 19.051L12.448 16.784L17.299 20.368C18.194 20.862 18.837 20.609 19.060 19.540L22.242 4.549C22.569 3.239 21.739 2.646 20.665 3.717Z"
                    fill="white"
                />
            </svg>
        </a>
    );
}
