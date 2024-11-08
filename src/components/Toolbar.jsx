import React, { useState } from 'react';
import { QuestionMarkCircledIcon, Share1Icon, Cross1Icon } from "@radix-ui/react-icons";
import HelpModal from "../components/HelpModal.jsx";
import EndVoteModal from "../components/EndVoteModal.jsx";
import Button from "../components/Button.tsx";

const Toolbar = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const openHelpModal = () => setIsHelpModalOpen(true);
  const closeHelpModal = () => setIsHelpModalOpen(false);
  
  const openEndModal = () => setIsEndModalOpen(true);
  const closeEndModal = () => setIsEndModalOpen(false); 

  const copyEventLink = () => {
    const eventLink = window.location.href;
    navigator.clipboard.writeText(eventLink)
      .then(() => {
        setCopySuccess('Link skopiowany!');
        setTimeout(() => setCopySuccess(''), 2000);
      })
      .catch(err => {
        console.error('Nie udało się skopiować linku: ', err);
        setCopySuccess('Błąd przy kopiowaniu linku.');
      });
  };

  return (
    <div className="w-full flex justify-between items-center h-12 px-3 bg-[#f5f7fa] shadow-md z-50">
      {/* Przycisk pomocy */}
        <Button 
          onClick={openHelpModal} 
          className="flex items-center justify-center w-9 h-9 bg-white border border-gray-300 rounded-md shadow-sm transition-colors duration-200 hover:bg-gray-200 cursor-pointer"
        >
          <QuestionMarkCircledIcon width={24} height={24} className="text-gray-700" />
        </Button>
        {/* Przycisk zakończenia wydarzenia */}
        <Button 
          onClick={openEndModal} 
          className="flex items-center justify-center w-9 h-9 bg-white border border-gray-300 rounded-md shadow-sm transition-colors duration-200 hover:bg-gray-200 cursor-pointer"
        >
          <Cross1Icon width={24} height={24} className="text-gray-700" />
        </Button>

     

      {/* Przycisk kopiowania */}
      <div className="flex items-center space-x-2">
        {copySuccess && (
          <span className="text-green-600 font-medium">
            {copySuccess}
          </span>
        )}
        <Button 
          onClick={copyEventLink} 
          className="flex items-center justify-center w-9 h-9 bg-white border border-gray-300 rounded-md shadow-sm transition-colors duration-200 hover:bg-gray-200 cursor-pointer"
        >
          <Share1Icon width={24} height={24} className="text-gray-700" />
        </Button>
      </div>
      
      <div className="flex flex-col">
        {/* Modal pomocy */}
        {isHelpModalOpen && <HelpModal onClose={closeHelpModal} />}

        {/* Modal zakończenia wydarzenia */} 
        {isEndModalOpen && <EndVoteModal onClick={closeEndModal} />}
      </div>

    </div>
  );
};

export default Toolbar;
