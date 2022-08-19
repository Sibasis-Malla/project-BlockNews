import React, { useEffect, useState, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import WideCards from '../components/Cards/WideCards';
import WideCardsMod from '../components/Cards/WideCardsMod';
import Web3Context from '../contexts';
import axios from 'axios';
import { articlesData } from '../contexts/useContracts/readContract';
import { intializeArticle } from '../contexts/useContracts/writeContract';

const LandingPage = () => {
  const [articles, setarticles] = useState([]);
  const { Contract, account } = useContext(Web3Context);
  //const {articlesData} = readContract;

  useEffect(() => {
    ApprovedRooms();
    console.log(articles);
    // eslint-disable-next-line
  }, [Contract]);
  const ApprovedRooms = async () => {
    articlesData(Contract).then((res) => {
      setarticles(res);
    });
  };

  const [tweetData, settweetData] = useState([]);
  const [recenttweet, setrecenttweet] = useState([]);
  const Fetchdata = async () => {
    try {
      await axios
        .get('https://protected-dusk-02862.herokuapp.com/get')
        .then((res) => {
          console.log(res);
          const later = res.data.filter((tweet) => {
            // const now = new Date();
            // const then = new Date(tweet.timer);
            // var hours = Number(Math.abs(now-then)/36e5);
            // return hours>4;
            console.log(tweet.approved);
            return !tweet.approved;
          });
          const recent = res.data.filter((tweet) => {
            const now = new Date();
            const then = new Date(tweet.timer);
            var hours = Number(Math.abs(now - then) / 36e5);
            return hours < 4;
          });
          settweetData(later);
          setrecenttweet(recent);
          console.log(recenttweet);
          setTimeout(Fetchdata, 10000);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    Fetchdata();
    // eslint-disable-next-line
  }, []);
  // setInterval(Fetchdata, 20000);
  // console.log(tweetData)
  return (
    <>
      <div className="bg-primary flex flex-col w-full h-new text-white font-medium text-xl ">
        <div className="w-full h-1/3">
          <img
            src="https://res.cloudinary.com/sambitsankalp/image/upload/v1660395461/hackathons/Hero_Section_twito_yz1ovz.png"
            alt="BlockNews"
          />
        </div>

        {articles && (
          <h1 className="text-center font-bold pl-10 mb-10 text-3xl my-2 text-textcol">
            Voting about to end{' '}
          </h1>
        )}

        <div className="grid grid-cols-3 gap-5">
          {articles &&
            articles.map((tweet) => {
              return (
                <WideCards
                  id={tweet.id}
                  // username={tweet.username}
                  // name={tweet.user}
                  // text={tweet.text}
                  // time={`${new Date(tweet.timer).getDate()} ${new Date(tweet.timer).toLocaleDateString('default', {month: 'long'})} ${new Date(tweet.timer).getFullYear()}`}
                />
              );
            })}
        </div>

        <h1 className="text-center font-bold pl-10 mt-10 mb-10 text-3xl text-textcol">
          Recent Tweets{' '}
        </h1>
        <div className="grid grid-cols-3 gap-0 mb-10">
          {tweetData.map((tweet) => {
            return (
              <div>
                <WideCardsMod
                  id={tweet.id}
                  username={tweet.username}
                  name={tweet.user}
                  text={tweet.text}
                  time={`${new Date(tweet.timer).getDate()} ${new Date(
                    tweet.timer
                  ).toLocaleDateString('default', {
                    month: 'long',
                  })} ${new Date(tweet.timer).getFullYear()}`}
                  approve={intializeArticle}
                  contract={Contract}
                  account={account.currentAccount}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default LandingPage;
