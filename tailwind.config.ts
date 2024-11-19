import { Config } from "tailwindcss/types";

const config: Config = {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				"status-available": "#67DF52",
				"status-not-available": "#F05555",
				"status-mixed": "#e3a33c",
			},
		},
	},
	plugins: [],
};
export default config;
