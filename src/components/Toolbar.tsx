import Button from "@/components/Button";
import { EndVoteModal } from "@/components/EndVoteModal";
import { HelpModal } from "@/components/HelpModal";
import { CircleHelp, Share2Icon, XIcon } from "lucide-react";
import React, { useState } from "react";

export const Toolbar: React.FC = () => {
	const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
	const [isEndModalOpen, setIsEndModalOpen] = useState(false);
	const [copySuccess, setCopySuccess] = useState("");

	const openHelpModal = () => setIsHelpModalOpen(true);
	const closeHelpModal = () => setIsHelpModalOpen(false);

	const openEndModal = () => setIsEndModalOpen(true);
	const closeEndModal = () => setIsEndModalOpen(false);

	const copyEventLink = () => {
		const eventLink = window.location.href;
		navigator.clipboard
			.writeText(eventLink)
			.then(() => {
				setCopySuccess("Link skopiowany!");
				setTimeout(() => setCopySuccess(""), 2000);
			})
			.catch((err) => {
				console.error("Nie udało się skopiować linku: ", err);
				setCopySuccess("Błąd przy kopiowaniu linku.");
			});
	};

	return (
		<div className="w-full flex justify-between items-center h-12 px-3 bg-[#f5f7fa] shadow-md z-50">
			{/* Przycisk pomocy */}
			<Button
				onClick={openHelpModal}
				className="flex items-center justify-center size-9 bg-white border border-gray-300 hover:bg-gray-200 rounded-md"
			>
				<CircleHelp width={24} height={24} className="text-gray-700" />
			</Button>
			{/* Przycisk zakończenia wydarzenia */}
			<Button
				onClick={openEndModal}
				className="flex items-center justify-center size-9 bg-white border border-gray-300 hover:bg-gray-200 rounded-md"
			>
				<XIcon width={24} height={24} className="text-gray-700" />
			</Button>

			{/* Przycisk kopiowania */}
			<div className="flex items-center space-x-2">
				{copySuccess && (
					<span className="text-green-600 font-medium">{copySuccess}</span>
				)}
				<Button
					onClick={copyEventLink}
					className="flex items-center justify-center size-9 bg-white border border-gray-300 hover:bg-gray-200 rounded-md"
				>
					<Share2Icon width={24} height={24} className="text-gray-700" />
				</Button>
			</div>

			{/* Modal pomocy */}
			{isHelpModalOpen && (
				<div className="flex flex-col">
					<HelpModal onDismiss={closeHelpModal} />
				</div>
			)}

			{/* Modal zakończenia wydarzenia */}
			{isEndModalOpen && (
				<div className="flex flex-col">
					<EndVoteModal onDismiss={closeEndModal} onFinish={() => {}} />
				</div>
			)}
		</div>
	);
};
