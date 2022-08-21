import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TwitterTweetEmbed } from 'react-twitter-embed';

function TweetVote() {
  const { tweetid } = useParams();
  console.log(tweetid);
  const [tweetData, settweetData] = useState({});
  const [done, setDone] = useState(true);
  const getTweet = async () => {
    try {
      await axios
        .get(`https://protected-dusk-02862.herokuapp.com/get/${tweetid}`)
        .then((res) => {
          console.log(res.data);
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
  console.log(tweetData);
  return (
    <>
      <div>
        <div
          id="timer"
          className="flex justify-center items-center mt-2 h-1/6 w-full"
        >
          <Timer />
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
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Stack Amount"
                  required=""
                />
              </div>
              <div className="flex flex-row justify-center align-center">
                <button
                  type="submit"
                  className="w-full mr-2 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Agree
                </button>
                <button
                  type="submit"
                  className="w-full ml-2 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

function Timer(params) {
  // console.log(params.time);
  const [sec, setsec] = useState('00');
  const [min, setmin] = useState('00');
  const [hr, sethr] = useState('00');
  var countdown = new Date(params.time).getTime();
  setInterval(() => {
    var curr = new Date().getTime();
    var timeleft = countdown - curr;
    sethr(Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setmin(Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60)));
    setsec(Math.floor((timeleft % (1000 * 60)) / 1000));
  }, 1000);

  return (
    <div className="flex flex-row w-full justify-end items-center mr-40">
      <p className="text-white">Time left: </p>
      <div className="bg-timer ml-1 w-1/6 h-2/3 flex justify-around items-center rounded-md">
        <div className="flex">
          {hr}
          <p>H</p>
        </div>
        <div className="flex ">
          {min}
          <p>M</p>
        </div>
        <div className="flex ">
          {sec}
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
