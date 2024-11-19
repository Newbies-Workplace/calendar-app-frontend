export type Vote = {
	termin_status_id: string;
	participant_id: string;
	status: "AVAILABLE" | "NOT_AVAILABLE";
	day: string;
};

export type Event = {
	name: string;
	description?: string;
	start: string;
	end: string;
	voting_end: string;
};

export type Participant = {
	participant_id: string;
	name: string;
};
