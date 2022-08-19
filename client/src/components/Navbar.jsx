import React, { useContext } from 'react';
import Web3Context from '../contexts';
import { NavLink } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Add } from '@mui/icons-material';

const Navbar = () => {
  const classes = useStyles();
  const { connectWallet, account } = useContext(Web3Context);
  // const [user, setuser] = useState("+ Connect The Wallet");
  // const [connected, setconnected] = useState(false);
  // function setData() {
  //   setconnected(true);
  //   if(connected){
  //     setuser("Hey, 0x67d36FB0b3b6a1cC11343d17646A5D9c94a2d098");
  //   }
  //   else{
  //     setuser("+ Connect The Wallet");
  //   }
  //   console.log(connected, user);
  // }
  return (
    <>
      <div className="flex justify-between h-16 bg-nav">
        <div className="mt-4 ml-24">
          <NavLink to="/" className="flex jusitify-center align-center w-10 h-auto">
            <img
              src="https://res.cloudinary.com/sambitsankalp/image/upload/v1660398315/hackathons/ezgif_1_tmlyl3.png"
              alt="block"
            />
            <span className="mt-1 font-bold text-xl text-textcol z-50 opacity-100">BlockNews</span>
          </NavLink>
        </div>
        <div className={classes.tabsContainer}>
          {account.currentAccount != null ? (
            <Typography className={classes.tab} variant="body1">
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
                className={classes.tab}
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
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '70px',
    position: 'fixed',
    top: 0,
    backgroundColor: '#232946',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
  },
  logoContainer: {
    textDecoration: 'none',
    marginLeft: '10%',
  },
  logo: {
    color: '#fff',
    textTransform: 'uppercase',
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: '10%',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  tabLink: {
    margin: 0,
    textDecoration: 'none',
    padding: 'auto 15px',
    marginLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  tab: {
    color: '#fffffe',
    opacity: 1,
    fontFamily: 'Helvetica',
    marginRight: '20px',
  },
}));
