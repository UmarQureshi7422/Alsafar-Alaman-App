import React, { useState } from 'react';

const Navbar = ({ showBack, onBack, onHome, toggleDark }) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="navbar">
      <div className="promo-bar">🎁 Get 50% off your first 3 rides!</div>

      <div className="nav-main">
        {showBack && <button className="nav-btn" style={{ width: '50px', padding: '6px' }} onClick={onBack}>←</button>
}
        <h3 className="app-name">🚖 Alsafar Alaman</h3>
        <div className="nav-right">
          <button className="nav-btn" onClick={onHome}>🏠</button>
          <button className="nav-btn" onClick={toggleDark}>🌓</button>
          <button className="nav-btn" onClick={() => setShowHelp(!showHelp)}>☎️</button>
          <span className="notif-dot">🔔</span>
        </div>
      </div>

      {showHelp && (
        <div className="helpline-box">
          <p><strong>Support:</strong></p>
          <p>📞 0800-ALSFR</p>
          <p>✉️ support@alsafar.app</p>
        </div>
      )}
    </div>
  );
};

export default Navbar;
