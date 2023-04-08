import React, { useEffect, useState } from 'react';
import { MdFavorite } from 'react-icons/md';
import { NextPage } from 'next';
import UseAuthStore from '../Store/AuthStore';

interface IProps {
  Likes: any;
  flex: string;
  HandleLike: () => void;
  HandleDislike: () => void;
}

const LikeButton: NextPage<IProps> = ({ Likes, flex, HandleLike, HandleDislike }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { UserProfile }: any = UseAuthStore();
  let filterLikes = Likes?.filter((item: any) => item._ref === UserProfile?._id);

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, Likes]);

  return (
    <div className={`${flex} gap-6`}>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {alreadyLiked ? (
          <div className='bg-primary rounded-full p-2 md:p-4 text-[#F51997] ' onClick={HandleDislike} >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        ) : (
          <div className='bg-primary rounded-full p-2 md:p-4 ' onClick={HandleLike} >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        )}
        <p className='text-md font-semibold '>{Likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;