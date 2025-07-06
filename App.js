import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import LandingPage from './LandingPage';
import Navbar from './Navbar';

const App = () => {
  const [landingDone, setLandingDone] = useState(false);
  const [user, setUser] = useState(null);
  const [tempName, setTempName] = useState('');
  const [role, setRole] = useState('passenger');
  const [darkMode, setDarkMode] = useState(false);

  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [type, setType] = useState('Car');
  const [ride, setRide] = useState(null);
  const [history, setHistory] = useState([]);

  const formRef = useRef(null);
  const rideRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    if (landingDone) {
      gsap.from(formRef.current, { y: -50, opacity: 0, duration: 0.8 });
      gsap.from(testimonialsRef.current, { opacity: 0, delay: 0.5 });
    }
  }, [landingDone]);

  const toggleDark = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const login = () => {
    if (tempName) setUser({ name: tempName, role });
  };

  const requestRide = () => {
    const newRide = {
      id: Date.now(),
      pickup,
      drop,
      type,
      passenger: user.name,
      status: 'Requested',
    };
    setRide(newRide);
    setHistory(prev => [...prev, newRide]);
    gsap.from(rideRef.current, { opacity: 0, x: 100, duration: 0.6 });
  };

  const updateStatus = () => {
    if (!ride) return;
    const flow = ['Requested', 'Accepted', 'In Progress', 'Completed'];
    const idx = flow.indexOf(ride.status);
    setRide({ ...ride, status: flow[idx + 1] });
  };

  const resetUser = () => setUser(null);
  const resetApp = () => {
    setUser(null);
    setRide(null);
    setHistory([]);
    setPickup('');
    setDrop('');
    setTempName('');
  };

  if (!landingDone) return <LandingPage onFinish={() => setLandingDone(true)} />;

  return (
    <>
      <Navbar
        showBack={!!user}
        onBack={resetUser}
        onHome={resetApp}
        toggleDark={toggleDark}
      />

      {!user ? (
        <div className="container">
          <h2>🚀 Let’s Get Started</h2>
          <input placeholder="👤 Name" value={tempName} onChange={e => setTempName(e.target.value)} />
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="passenger">🚶 Passenger</option>
            <option value="driver">🚗 Driver</option>
          </select>
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div className="container">
          <h2>Welcome, {user.name} ({role})</h2>

          {role === 'passenger' && (
            <div ref={formRef}>
              <h3>🚖 Request a Ride</h3>
              <input placeholder="📍 Pickup" value={pickup} onChange={e => setPickup(e.target.value)} />
              <input placeholder="🏁 Drop" value={drop} onChange={e => setDrop(e.target.value)} />
              <select value={type} onChange={e => setType(e.target.value)}>
                <option>🛵 Bike</option>
                <option>🚗 Car</option>
                <option>🛺 Rickshaw</option>
              </select>
              <button onClick={requestRide}>Request 🚀</button>
            </div>
          )}

          {ride && (
            <div ref={rideRef} className="ride-card">
              <h3>🚗 Current Ride</h3>
              <p><b>Passenger:</b> {ride.passenger}</p>
              <p>{ride.pickup} → {ride.drop}</p>
              <p>Status: {ride.status}</p>
              {ride.status !== 'Completed' && <button onClick={updateStatus}>Next</button>}
            </div>
          )}

          <h3>📜 Ride History</h3>
          {history.map(r => (
            <div key={r.id} className="history-card">
              {r.pickup} → {r.drop} ({r.status})
            </div>
          ))}

          <div ref={testimonialsRef} className="testimonials">
            <h3>💬 Reviews</h3>
            <blockquote>“Easy booking!” – Ali</blockquote>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
