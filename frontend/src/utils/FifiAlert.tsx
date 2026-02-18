import React from 'react';
import { createPortal } from 'react-dom';
import fifipic from '../assets/fifi.jpg';

interface FifiAlertProps {
  message: string;
  onClose: () => void;
}

const FifiAlert: React.FC<FifiAlertProps> = ({ message, onClose }) => {
  return createPortal(
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(255, 192, 203, 0.18)', // soft pink overlay
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #fff0f6 0%, #e0c3fc 100%)',
        border: '2.5px solid #e75480',
        borderRadius: '22px',
        padding: '32px 32px 24px 32px',
        maxWidth: '370px',
        minWidth: '260px',
        boxShadow: '0 4px 24px rgba(231, 84, 128, 0.15)',
        fontFamily: '"Comic Sans MS", cursive, sans-serif',
        color: '#a23e48',
        textAlign: 'center',
        position: 'relative'
      }}>
        <img
          src={fifipic}
          alt="Fifi alert"
          style={{
            width: 88,
            height: 88,
            objectFit: 'cover',
            borderRadius: '50%',
            border: '3px solid #e75480',
            marginBottom: 14,
            boxShadow: '0 2px 8px rgba(231, 84, 128, 0.10)',
            background: '#fff'
          }}
        />
        <strong style={{ fontSize: '1.18em', display: 'block', marginBottom: 8, color: '#e75480' }}>
          Fifi from Co. Galway says:
        </strong>
        <p style={{ marginTop: '10px', marginBottom: '20px', fontSize: '1.08em', color: '#a23e48' }}>
          {message} <span role="img" aria-label="flower">🌸</span>
        </p>
        <button
          onClick={onClose}
          style={{
            background: 'linear-gradient(90deg, #e75480 0%, #fcb7b7 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '22px',
            padding: '12px 28px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.08em',
            marginTop: '10px',
            boxShadow: '0 2px 8px rgba(231, 84, 128, 0.10)',
            letterSpacing: '0.5px',
            transition: 'background 0.2s'
          }}
        >
          Slán a chara!
        </button>
      </div>
    </div>,
    document.body
  );
};

export default FifiAlert;