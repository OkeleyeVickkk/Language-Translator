/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#2F52E0",
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
