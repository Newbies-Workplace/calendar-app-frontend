import React, { useState } from "react";

export default function DayModal(props) {
  return (
    <>
      <div className="text-center bg-white  p-5 rounded-[10px]">
        <div className="text-xl  text-[#333] mb-[15px]">{props.dayDate}</div>

        {/* <!-- Available section --> */}
        <div className="text-base font-medium text-[#666] mt-2.5 mb-[5px] mx-0">
          Dostępni
        </div>
        <div className="flex justify-center flex-wrap gap-2.5 mb-2.5">
          <div
            className="inline-flex items-center bg-[#f2f2f2] text-sm text-[#333] border px-2.5 py-[5px] rounded-[20px] border-solid border-transparent     bg-[#e6ffe6] border-[#28a745] before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:bg-[#28a745] before:mr-2 before:rounded-[50%]
"
          >
            John Snow
          </div>
          <div
            className="inline-flex items-center bg-[#f2f2f2] text-sm text-[#333] border px-2.5 py-[5px] rounded-[20px] border-solid border-transparent     bg-[#e6ffe6] border-[#28a745] before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:bg-[#28a745] before:mr-2 before:rounded-[50%]
"
          >
            Johny Test
          </div>
          <div
            className="inline-flex items-center bg-[#f2f2f2] text-sm text-[#333] border px-2.5 py-[5px] rounded-[20px] border-solid border-transparent     bg-[#e6ffe6] border-[#28a745] before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:bg-[#28a745] before:mr-2 before:rounded-[50%]
"
          >
            Donald Kaczor
          </div>
          <div
            className="inline-flex items-center bg-[#f2f2f2] text-sm text-[#333] border px-2.5 py-[5px] rounded-[20px] border-solid border-transparent     bg-[#e6ffe6] border-[#28a745] before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:bg-[#28a745] before:mr-2 before:rounded-[50%]
"
          >
            Lupieżca z Żoliborza
          </div>
        </div>

        <div className="modal-section-title">Niedostępni</div>
        <div className="flex justify-center flex-wrap gap-2.5 mb-2.5">
          <div className="inline-flex items-center bg-[#f2f2f2] text-sm text-[#333] border px-2.5 py-[5px] rounded-[20px] border-solid border-transparent     bg-[#ffe6e6] border-[#dc3545] before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:bg-[#dc3545] before:mr-2 before:rounded-[50%]">
            Ty
          </div>
          <div className="inline-flex items-center bg-[#f2f2f2] text-sm text-[#333] border px-2.5 py-[5px] rounded-[20px] border-solid border-transparent     bg-[#ffe6e6] border-[#dc3545] before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:bg-[#dc3545] before:mr-2 before:rounded-[50%]">
            Myszka miki
          </div>
          <div className="inline-flex items-center bg-[#f2f2f2] text-sm text-[#333] border px-2.5 py-[5px] rounded-[20px] border-solid border-transparent     bg-[#ffe6e6] border-[#dc3545] before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:bg-[#dc3545] before:mr-2 before:rounded-[50%]">
            Goofy
          </div>
          <div className="inline-flex items-center bg-[#f2f2f2] text-sm text-[#333] border px-2.5 py-[5px] rounded-[20px] border-solid border-transparent     bg-[#ffe6e6] border-[#dc3545] before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:bg-[#dc3545] before:mr-2 before:rounded-[50%]">
            Pluto
          </div>
          <div className="inline-flex items-center bg-[#f2f2f2] text-sm text-[#333] border px-2.5 py-[5px] rounded-[20px] border-solid border-transparent     bg-[#ffe6e6] border-[#dc3545] before:content-[''] before:inline-block before:w-2.5 before:h-2.5 before:bg-[#dc3545] before:mr-2 before:rounded-[50%]">
            Robert
          </div>
        </div>

        <div className="text-base font-medium text-[#666] mt-2.5 mb-[5px] mx-0">
          Niekreśleni
        </div>
        <div className="flex justify-center gap-2.5 mb-5">
          <div className="inline-block bg-[#f2f2f2] text-sm cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease] px-2.5 py-[5px] rounded-[5px]">
            On
          </div>
          <div className="inline-block bg-[#f2f2f2] text-sm cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease] px-2.5 py-[5px] rounded-[5px]">
            Ona
          </div>
          <div className="inline-block bg-[#f2f2f2] text-sm cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease] px-2.5 py-[5px] rounded-[5px]">
            On też
          </div>
        </div>
      </div>
    </>
  );
}
