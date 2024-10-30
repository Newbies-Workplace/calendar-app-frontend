import React, { useState } from 'react';
import { QuestionMarkCircledIcon, Share1Icon } from "@radix-ui/react-icons";
import HelpModal from "../components/HelpModal.jsx";
import Button from "../components/Button.tsx";

const Toolbar = () => {
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  const openHelpModal = () => setIsHelpModalOpen(true);
  const closeHelpModal = () => setIsHelpModalOpen(false);

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

  const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 12px',
    backgroundColor: '#f5f7fa',
    borderRadius: '12px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.2s ease',
    cursor: 'pointer',
  };

  const iconStyle = {
    color: '#374151',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#e5e7eb',
  };

  return (
    <div style={toolbarStyle}>
        
      <Button 
        onClick={openHelpModal} 
        style={buttonStyle} 
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
      >
        <QuestionMarkCircledIcon width={24} height={24} style={iconStyle} />
      </Button>

      {isHelpModalOpen && <HelpModal onClose={closeHelpModal} />}

      <Button 
        onClick={copyEventLink} 
        style={buttonStyle}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
      >
        <Share1Icon width={24} height={24} style={iconStyle} />
      </Button>

      {copySuccess && (
        <span style={{ marginLeft: '8px', color: '#16a34a', fontWeight: '500' }}>{copySuccess}</span>
      )}
    </div>
  );
};

export default Toolbar;
