import './App.css';
import React, { useEffect, useContext } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TweetVote from './pages/TweetVote';
import LandingPage from './pages/Landing';
import { Routes, Route } from 'react-router-dom';
import Web3Context from './contexts';

function App() {
  window.ethereum &&
    window.ethereum.on('accountsChanged', function (accounts) {
      setTimeout(window.location.reload(false), 1000);
    });

  //CheckIfWallet is Connectd
  const { checkIfWalletIsConnected } = useContext(Web3Context);
  useEffect(() => {
    checkIfWalletIsConnected();
    // eslint-disable-next-line
  }, []);

  return (
    <div id="App" className="w-screen h-screen bg-primary">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:tweetid" element={<TweetVote />} />
        {/* <Route path="/tweet" element={<TweetVote/>}/> */}
        <Route path="*" element={<div>There's Nothing here.</div>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
