import React, { useContext } from 'react';
import Web3Context from '../contexts';
import { NavLink } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';

const Navbar = () => {
  const { connectWallet, account } = useContext(Web3Context);
  return (
    <>
      <div className="flex justify-between h-16 bg-nav">
        <div className="mt-4 ml-24">
          <NavLink
            to="/"
            className="flex jusitify-center align-center w-10 h-auto"
          >
            <img
              src="https://res.cloudinary.com/sambitsankalp/image/upload/v1660398315/hackathons/ezgif_1_tmlyl3.png"
              alt="block"
            />
            <span className="mt-1 font-bold text-xl text-textcol z-50 opacity-100">
              BlockNews
            </span>
          </NavLink>
        </div>
        <div className="flex justify-center items-center mr-14">
          {account.currentAccount != null ? (
            <Typography className="mr-20" style={{color:'#fffffe'}} variant="body1">
              Hey,{' '}
              {`${String(account.currentAccount).slice(0, 5)}...${String(
                account.currentAccount
              ).slice(String(account.currentAccount).length - 5)}`}
            </Typography>
          ) : (
            <Button
              variant="contained"
              style={{ color: '#fffffe', backgroundColor: '#7f5af0' }}
              startIcon={<Add />}
              onClick={connectWallet}
            >
              <Typography
                className="mr-20"
                style={{ color: '#ffffff' }}
                variant="body1"
              >
                Connect Wallet
              </Typography>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;

