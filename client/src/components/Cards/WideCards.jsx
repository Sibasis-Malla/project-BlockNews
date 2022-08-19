import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const WideCards = (params) => {
  //const url = `https://twitframe.com/show?url=https%3A%2F%2Ftwitter.com%2Ftwito%2Fstatus%2F${params.id}`;
  return (
    <div className="text-white h-92 flex flex-col justify-center items-center w-11/12 mx-4 mb-6">
      {/* <iframe className='w-full h-full' height="250px" theme="dark" data-chrome="transparent" conversation="none" src={url}></iframe> */}
      {params.id && (
        <div className="min-w-full h-auto object-contain rounded-xl">
          <div id="tweetCard" className="object-fill w-full overflow-auto">
            <TwitterTweetEmbed tweetId={params.id} options={{ height: 100 }} />
          </div>
        </div>
      )}

      <NavLink className="w-full" to={`/${params.id}`}>
        <button className="bg-wallet px-1 w-full mt-0 h-8 rounded-lg font-roboto text-base cursor-pointer">
          Enter Room
        </button>
      </NavLink>
      <Outlet />
    </div>
  );
};

export default WideCards;
