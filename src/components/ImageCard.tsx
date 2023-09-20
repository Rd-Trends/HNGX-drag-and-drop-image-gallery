import { Image as TImage } from "@/types";
import Image from "next/image";
import React from "react";
import { useDrag, useDrop } from "react-dnd";

type ImageCardProps = {
  data: TImage;
  index: number;
  moveImage: (dragIndex: number, hoverIndex: number) => void;
};

const ImageCard = ({ data, index, moveImage }: ImageCardProps) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop({
    accept: "card",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    drop: (item: { index: number }) => {
      if (item.index === index) return;
      moveImage(item.index, index);
      item.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => {
      return { index };
    },
    collect: (monitor) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`relative shadow-md rounded-md group ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}>
      <Image
        src={data.src}
        alt={data.tag}
        width={500}
        height={500}
        priority={index <= 4}
        className=" w-full aspect-square object-cover object-center rounded-md"
      />
      {/* glassmorphism design for the tags */}
      <div
        className={` ${
          isDragging ? "hidden" : "hidden group-hover:block"
        } absolute bottom-2 left-2 right-2 p-4 bg-gray-300 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-md`}>
        <p className="text-white font-semibold text-lg">{data.tag}</p>
      </div>
      {isOver && (
        <div className="absolute top-0 right-0 left-0 bottom-0 rounded-md inset-0 bg-blue-500 opacity-50" />
      )}
    </div>
  );
};

export default ImageCard;
