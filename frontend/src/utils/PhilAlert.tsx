import React from 'react';
import { createPortal } from 'react-dom';
import philpic from '../assets/phil.png';

interface PhilAlertProps {
  message: string;
  onClose: () => void;
}

const PhilAlert: React.FC<PhilAlertProps> = ({ message, onClose }) => {
  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.35)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: '#fffbe6',
        border: '2px solid #ffb300',
        borderRadius: '12px',
        padding: '28px 28px 20px 28px',
        maxWidth: '350px',
        minWidth: '260px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.25)',
        fontFamily: 'Comic Sans MS, cursive, sans-serif',
        color: '#333',
        textAlign: 'center',
        position: 'relative'
      }}>
        <img
          src={philpic}
          alt="Phil alert"
          style={{
            width: 80,
            height: 80,
            objectFit: 'cover',
            borderRadius: '450%',
            border: '3px solid #ffb300',
            marginBottom: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            background: '#fff'
          }}
        />
        <strong style={{ fontSize: '1.1em', display: 'block', marginBottom: 6 }}>Phil from Co. Fingal says:</strong>
        <p style={{ marginTop: '8px', marginBottom: '18px', fontSize: '1.05em' }}>
          {message} <span role="img" aria-label="wink">😉</span>
        </p>
        <button
          onClick={onClose}
          style={{
            background: '#ffb300',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 22px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1em',
            marginTop: '8px'
          }}
        >
          See ya rafter!
        </button>
      </div>
    </div>,
    document.body
  );
};

export default PhilAlert;