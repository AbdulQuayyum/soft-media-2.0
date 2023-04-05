import React, { useEffect } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import { IUser } from '../../types';

interface IProps {
  FetchAllUsers: () => void;
  AllUsers: IUser[];
}

const SuggestedAccounts: NextPage<IProps> = ({ FetchAllUsers, AllUsers }) => {
  // useEffect(() => {
  //   FetchAllUsers();
  // }, [FetchAllUsers]);

  const Users = AllUsers
    // .sort(() => 0.5 - Math.random())
    // .slice(0, AllUsers.length);

  return (
    <div className='xl:border-b-2 border-gray-200 pb-4'>
      <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
        Suggested accounts
      </p>
      {/* <div>
        {Users?.slice(0, 6).map((User: IUser) => (
          <Link href={`/Profile/${User._id}`} key={User._id}>
            <div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
              <div className='w-8 h-8'>
                <Image
                  width={34}
                  height={34}
                  className='rounded-full'
                  src={User.Image}
                  alt='User-profile'
                  layout='responsive'
                />
              </div>

              <div className='hidden xl:block'>
                <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                  {User.UserName.replace(/\s+/g, '')}{' '}
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize text-gray-400 text-xs'>
                  {User.UserName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div> */}
    </div>
  );
};

export default SuggestedAccounts;