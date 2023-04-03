import React from 'react'
import { NextPage } from 'next'

import { FooterList1, FooterList2, FooterList3 } from '../Utilities/Constants'

const List = ({ items, mt }: { items: string[]; mt: Boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
    {items.map((item: string) => (
      <p
        key={item}
        className="text-gray-400 text-sm  hover:underline cursor-pointer"
      >
        {item}
      </p>
    ))}
  </div>
)

const Footer = () => {
  return (
    <div className="mt-6 hidden xl:block">
      <List items={FooterList1} mt={false} />
      <List items={FooterList2} mt />
      <List items={FooterList3} mt />
      <p className="text-gray-400 text-sm mt-5">Copyright © {new Date().getFullYear()} Soft-Media 2.0</p>
    </div>
  )
}

export default Footer
