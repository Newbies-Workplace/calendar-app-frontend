import React from "react";

type RightPanelProps = {
	title: string;
	description: string;
};

export const RightPanel: React.FC<RightPanelProps> = ({
	title,
	description,
}) => {
	return (
		<div className="p-4">
			<div className="border-2 border-black bg-gray-100 p-4 rounded-md shadow-md">
				<h2 className="text-xl font-bold mb-2">{title}</h2>
				<p className="text-md text-gray-700">{description}</p>
			</div>
		</div>
	);
};
