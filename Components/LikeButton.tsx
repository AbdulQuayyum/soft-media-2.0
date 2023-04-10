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
      <div className='flex flex-col items-center justify-center mt-4 cursor-pointer'>
        {alreadyLiked ? (
          <div className='p-2 text-blue-700 rounded-full bg-primary md:p-4 ' onClick={HandleDislike} >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        ) : (
          <div className='p-2 rounded-full bg-primary md:p-4 ' onClick={HandleLike} >
            <MdFavorite className='text-lg md:text-2xl' />
          </div>
        )}
        <p className='font-semibold text-md '>{Likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;