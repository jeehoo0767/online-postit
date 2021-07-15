import React from 'react';

interface PostitValues {
  id: number;
  title: string;
  description: string;
}

export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  noteItemsParams: PostitValues[],
  setPostitValues: React.Dispatch<React.SetStateAction<PostitValues[]>>,
) => {
  console.log(`${e.target.name} : ${e.target.value}`);
  const nextItems = noteItemsParams.map((item: PostitValues, index: number) => {
    if (e.target.id === index.toString()) {
      return {
        ...item,
        [e.target.name]: e.target.value,
      };
    } else {
      return {
        ...item,
      };
    }
  });
  setPostitValues(nextItems);
};
