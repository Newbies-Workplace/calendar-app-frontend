import { Participant } from "@/types/responses";
import Cookies from "js-cookie";

interface UseParticipantCookie {
  getParticipantFromCookie: (eventId: string) => Participant | undefined;
  saveParticipantToCookie: (eventId: string, participant: Participant) => void;
}

export const useParticipantCookie = (): UseParticipantCookie => {
  const getParticipantFromCookie = (eventId: string) => {
    return Cookies.get(eventId)
      ? (JSON.parse(Cookies.get(eventId) as string) as Participant)
      : undefined;
  };

  const saveParticipantToCookie = (
    eventId: string,
    participant: Participant,
  ) => {
    Cookies.set(eventId, JSON.stringify(participant));
  };

  return {
    getParticipantFromCookie,
    saveParticipantToCookie,
  };
};
