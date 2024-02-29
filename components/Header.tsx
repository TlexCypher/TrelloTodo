"use client";

import useBoardStore from "@/store/BoardStore";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import React, { ChangeEvent } from "react";
import Avatar from "react-avatar";

const Header = () => {
  const [searchString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);

  const handleSearchString = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  return (
    <header className="py-2 px-10 shadow-sm">
      <div className="absolute top-0 left-0 -z-50 bg-gradient-to-br from-pink-400 to-blue-400 w-full h-96 blur-3xl rounded-md opacity-70" />
      <div className="flex items-center justify-between">
        <Image
          src="https://links.papareact.com/c2cdd5"
          alt="Trello Icon"
          width={200}
          height={200}
        />
        <div className="flex items-center">
          <div className="flex bg-white rounded-md shadow-md mr-4 items-center">
            <MagnifyingGlassIcon className="text-gray-400 h-10 w-10 mr-3" />
            <input
              placeholder="Search"
              className="outline-none rounded-md h-20 w-60"
              onChange={handleSearchString}
            />
          </div>
          <Avatar
            name="Tlex Cypher"
            size="50"
            className="rounded-full shadow-md w-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
