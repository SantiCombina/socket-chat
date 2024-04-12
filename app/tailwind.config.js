/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        screens: {
            notebook: "1440px",
        },
        extend: {
            container: {
                center: true,
            },
        },
    },
    plugins: [],
};
