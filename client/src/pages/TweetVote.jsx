import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import {
  articlesData,
  getRoomParticipants,
  getVerdict,
  getParticipantsStake,
  getStatus,
  getTime,
} from '../contexts/useContracts/readContract';
import { voteFor, voteAgainst } from '../contexts/useContracts/writeContract';

import timedifference from '../components/timedifference';

import Web3Context from '../contexts';

function TweetVote() {
  const { tweetid } = useParams();
  //console.log(tweetid);
  const { Contract, account } = useContext(Web3Context);
  const [tweetData, settweetData] = useState({});
  const [done, setDone] = useState(true);
  const [stake, setStake] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    console.log(getStatus(Contract, tweetid));
    try {
      getTime(Contract, tweetid).then((res) => {
        var minutesToAdd = 10;
        var currentDate = new Date(res*1000);
        setTime(currentDate.getTime() + minutesToAdd * 60000);
      });
    } catch (err) {
      console.log(err);
    }
  }, [Contract, account]);

  const handleAgree = async (event) => {
    event.preventDefault();
    await voteFor(Contract, account, tweetid, stake);
    alert('Voting Successful');
  };
  const handleDisAgree = async (event) => {
    event.preventDefault();
    await voteAgainst(Contract, account, tweetid, stake);
    alert('Voting Successful');
  };
  const handleStake = (e) => {
    setStake(() => ([e.target.name] = e.target.value));
  };
  const getTweet = async () => {
    try {
      await axios
        .get(`https://protected-dusk-02862.herokuapp.com/get/${tweetid}`)
        .then((res) => {
          //console.log(res.data);
          settweetData(res.data[0]);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getTweet();
    // eslint-disable-next-line
  }, []);
  //console.log(tweetData);
  return (
    <>
      <div>
        <div
          id="timer"
          className="flex justify-center items-center mt-2 h-1/6 w-full"
        >
          <Timer time={time} />
        </div>
        <div className="w-full bg-primary mt-10 flex flex-row justify-around">
          <div className="p-4 h-card w-full max-w-xl bg-cardcol mb-24 rounded-lg border shadow-md rounded-lg sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="text-xl text-white font-medium dark:text-white">
              Tweet ID : {tweetid}
            </h5>
            <form className="space-y-6" action="#">
              <TweetDecision tweetid={tweetid} />
              <div>
                <input
                  type="price"
                  name="stake"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Stake Amount"
                  required=""
                  onChange={handleStake}
                />
              </div>
              <div className="flex flex-row justify-center align-center">
                <button
                  type="submit"
                  className="w-full mr-2 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onSubmit={handleAgree}
                >
                  Agree
                </button>
                <button
                  type="submit"
                  className="w-full ml-2 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onSubmit={handleDisAgree}
                >
                  Diagree
                </button>
              </div>
            </form>
          </div>

          {done ? (
            <Participants />
          ) : (
            <img
              className="w-auto h-card"
              src="https://res.cloudinary.com/sambitsankalp/image/upload/v1660659993/hackathons/Blur_Image_uojafz.png"
              alt="Blur Image"
            />
          )}
        </div>
      </div>
    </>
  );
}

function TweetDecision({ tweetid }) {
  // const url = `https://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2Ftwito%2Fstatus%2F${params.id.id}`;
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="flex flex-col justify-center items-center">
          <div className="text-white flex justify-center items-center">
            <div className=" min-w-full object-contain rounded-xl w-128">
              {tweetid && (
                <div id="tweetCard" className="w-full h-full overflow-auto">
                  <TwitterTweetEmbed
                    tweetId={tweetid}
                    options={{ width: 'auto' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Timer({ time }) {
  // console.log(params.time);
  const [timeLeft, setTimeLeft] = useState(timedifference(time));
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(timedifference(time));
    }, 1000);
  });
  return (
    <div className="flex flex-row w-full justify-end items-center mr-40">
      {

      }
      <p className="text-white">Time left: </p>
      <div className="bg-timer ml-1 w-1/6 h-2/3 flex justify-around items-center rounded-md">
        <div className="flex">
          {timeLeft['Hours']}
          <p>H</p>
        </div>
        <div className="flex ">
          {timeLeft['Minutes']}
          <p>M</p>
        </div>
        <div className="flex ">
          {timeLeft['Seconds']}
          <p>S</p>
        </div>
      </div>
    </div>
  );
}

function Participants() {
  return (
    <>
      <div
        style={{ backdropFilter: 'blur(36px)' }}
        className="p-4 w-full max-w-md h-card overflow-y-auto bg-cardcol rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="flex justify-between items-center mb-4">
          <h5 class="text-center text-xl font-bold leading-none text-white">
            Participants
          </h5>
        </div>
        <div class="flow-root">
          <div class="divide-y overflow-auto divide-gray-200 dark:divide-gray-700">
            <Person />
            <Person />
            <Person />
            <Person />
            <Person />
            <Person />
            <Person />
            <Person />
          </div>
        </div>
      </div>
    </>
  );
}

function Person(props) {
  return (
    <div class="py-3 sm:py-4">
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0"></div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-white truncate">Neil Sims</p>
        </div>
        <div class="inline-flex items-center text-base font-semibold text-white">
          320 ETH
        </div>
      </div>
    </div>
  );
}

export default TweetVote;
