/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#57B8FF",
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
