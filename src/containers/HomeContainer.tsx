"use client";

import ImageCard from "@/components/ImageCard";
import Logo from "@/components/Logo";
import { swapArrayIndex } from "@/utils/swapArrayIndex";
import React, { useMemo, useState } from "react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { getUserNameFromEmail } from "@/utils/getUserNameFromEmail";
import { images } from "@/constants/images";
import { BiSearch } from "react-icons/bi";

const HomeContainer = ({ user }: { user?: User }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const [items, setItems] = useState(images);

  const moveImage = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setItems((prevCards) => {
        const clonedCards = [...prevCards];
        // switch card indexes (positions) in array
        swapArrayIndex(clonedCards, hoverIndex, dragIndex);
        return clonedCards;
      });
    },
    [items]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItems(() => {
      return images.filter((item) => item.tag.includes(e.target.value));
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div>
      <div className=" py-4 flex items-center justify-between px-4 md:px-8 lg:px-16 border-b border-gray-200 shadow-sm">
        <Logo />
        <div className=" flex items-center space-x-2">
          {user && (
            <span className=" uppercase p-2 rounded-full aspect-square bg-gradient-to-r text-white font-bold  from-blue-500 to-yellow-600">
              {getUserNameFromEmail(user?.email!)}
            </span>
          )}
          <button
            className="text-red-500 font-bold outline-none border-none focus:underline"
            onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className=" my-8 md:my-12 px-4 md:px-8 lg:px-16">
        <div className=" mb-4">
          <h1 className=" font-bold text-3xl lg:text-6xl text-center pb-2">
            Discover amazing photos
          </h1>
          <p className=" text-center text-lg md:text-xl font-medium">
            Search for images, drag and drop to reposition images!!
          </p>
        </div>
        <div className=" relative flex items-center mx-auto max-w-2xl ">
          <input
            type="search"
            placeholder="Search for images"
            onChange={handleSearch}
            className=" w-full py-2 md:py-3 pl-[3.4rem] pr-4 border-2 outline-none border-gray-300 hover:border-blue-500 focus:border-blue-500 focus:shadow-sm rounded-md"
          />
          <button className=" absolute left-4 top--1/2 translate-y--1/2 text-gray-400">
            <BiSearch size={25} />
          </button>
        </div>
      </div>

      {!!items.length && (
        <div className="px-4 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 md:mb-12">
          {items.map((item, index) => (
            <ImageCard
              data={item}
              index={index}
              key={item.tag}
              moveImage={moveImage}
            />
          ))}
        </div>
      )}

      {!!!items.length && (
        <div className="text-center">
          <span className=" font-semibold text-lg">No images found</span>
        </div>
      )}
    </div>
  );
};

export default HomeContainer;
