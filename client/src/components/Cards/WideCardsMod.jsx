import React from 'react';
import { Outlet } from 'react-router-dom';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import axios from 'axios';
const WideCards = (params) => {
  const approve = async () => {
    console.log(params.contract);
    console.log(params.account);
    params.approve(params.contract, params.account, params.id, params.text);
    try {
      const response = await axios.put(
        `https://protected-dusk-02862.herokuapp.com/approve/${params.id}`
      );
      console.log(response.status, response.message);
    } catch (e) {}
  };
  //const url = `https://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2Ftwito%2Fstatus%2F${params.id}`;
  return (
    <div className="text-white h-92 flex flex-col justify-center items-center w-11/12 mx-4 mb-6">
      {/* <iframe className='w-full h-full' height="250px" theme="dark" data-chrome="transparent" conversation="none" src={url}></iframe> */}
      {params.id && (
        <div className="min-w-full h-auto object-contain rounded-xl">
          <div
            id="tweetCard"
            className="object-fill w-full overflow-auto"
          >
            <TwitterTweetEmbed
              tweetId={String(params.id)}
              options={{ height: 100 }}
            />
          </div>
        </div>
      )}

      <button
        className="bg-wallet px-1 w-full mt-0 h-8 rounded-lg font-roboto text-base cursor-pointer"
        onClick={approve}
      >
        Approve
      </button>
      <Outlet />
    </div>
  );
};

export default WideCards;
