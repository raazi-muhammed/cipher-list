/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#000000",
                "background-accent": "#151515",
                foreground: "#FFFFFF",
                "foreground-accent": "#585858",
                primary: "#0E8CE9",
                "primary-accent": "#41A8F4",
            },
            borderRadius: {
                none: "0",
                sm: ".25rem",
                m: ".5rem",
                DEFAULT: "1rem",
                full: "9999px",
            },
        },
    },
    plugins: [],
};
