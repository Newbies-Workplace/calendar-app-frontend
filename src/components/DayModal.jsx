import React, { useState } from "react";
import dayjs from "dayjs";
export default function DayModal(props) {
  let currentVote = props.votelist.find(
    (vote) =>
      dayjs(vote.dayNumber).format("YYYY-MM-DD") ===
      dayjs(props.dayDate).format("YYYY-MM-DD")
  );
  currentVote = currentVote || { votes: [] };
  return (
    <>
      <div className="text-center bg-white  p-5 rounded-[10px]">
        <div className="text-xl  text-[#333] mb-[15px]">
          {dayjs(`${props.dayDate}`).format("DD-MM-YYYY")}
        </div>
        {/* <!-- Available section --> */}
        <div className="text-base font-medium text-[#666] mt-2.5 mb-[5px] mx-0">
          Dostępni
        </div>
        <div className="flex justify-center flex-wrap gap-2.5 mb-2.5">
          {currentVote.votes.length > 0 ? (
            currentVote.votes.map((vote, index) => {
              if (vote.status) {
                return (
                  <div
                    key={index}
                    className="inline-flex items-center bg-[#f2f2f2] text-sm text-[#333] border px-2.5 py-[5px] rounded-[20px] border-solid border-transparent bg-[#e6ffe6] border-[#28a745] before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:bg-[#28a745] before:mr-2 before:rounded-[50%]"
                  >
                    {vote.name}
                  </div>
                );
              }
              return null;
            })
          ) : (
            <div>Brak głosów</div>
          )}
        </div>
        <div className="modal-section-title">Niedostępni</div>
        <div className="flex justify-center flex-wrap gap-2.5 mb-2.5">
          {currentVote.votes.length > 0 ? (
            currentVote.votes.map((vote, index) => {
              if (!vote.status) {
                return (
                  <div
                    key={index}
                    className="inline-flex items-center bg-[#f2f2f2] text-sm text-[#333] border px-2.5 py-[5px] rounded-[20px] border-solid border-transparent     bg-[#ffe6e6] border-[#dc3545] before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:bg-[#dc3545] before:mr-2 before:rounded-[50%]"
                  >
                    {vote.name}
                  </div>
                );
              }
              return null;
            })
          ) : (
            <div>Brak głosów</div>
          )}
        </div>
        <div className="text-white">
          <button className="main" onClick={() => props.onClick("yes")}>
            Jestem dostępny
          </button>{" "}
          <button className="main" onClick={() => props.onClick("no")}>
            Jestem niedostępny
          </button>
        </div>
      </div>
    </>
  );
}
