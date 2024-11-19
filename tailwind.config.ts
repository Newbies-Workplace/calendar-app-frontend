import { Config } from "tailwindcss/types";

const config: Config = {
	content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				statusAvailable: "#10B981",
				statusNotAvailable: "#EF4444",
				statusMixed: "#F59E0B",
			},
		},
	},
	plugins: [],
};
export default config;
