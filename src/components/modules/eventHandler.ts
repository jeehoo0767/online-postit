import React from 'react';

interface PostitValues {
  id: number;
  title: string;
  description: string;
}

/**
 * 우측 목록의 title과 postit의 title, description(내용) 을 수정한다
 * @param e {React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>} HTML event 객체
 * @param noteItemsParams {PostitValues[]} props로 내려받은 포스트잇 리스트 (state)
 * @param setPostitValuses {React.Dispatch<React.SetStateAction<PostitValues[]>>} postit setState함수
 */
export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  noteItemsParams: PostitValues[],
  setPostitValues: React.Dispatch<React.SetStateAction<PostitValues[]>>,
) => {
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

/**
 * 포스트잇 항목을 추가한다
 * @param noteItems {PostitValues[]} nextState를 복사 할 기존 state
 * @param setPostitValues{React.Dispatch<React.SetStateAction<PostitValues[]>>} postit setState함수
 */
export const addPost = (noteItems: PostitValues[], setPostitValues: React.Dispatch<React.SetStateAction<PostitValues[]>>) => {
  const nextPost = [...noteItems];
  if (nextPost.length === 0) {
    nextPost.push({ id: 0, title: '', description: '' });
  } else {
    nextPost.push({ id: noteItems[noteItems.length - 1].id + 1, title: '', description: '' });
  }
  // 복사 할 state가 없다면 id를 0부터 추가하고 아니면
  // 마지막 인덱스의 id에서 1을 더한 값으로 state를 추가
  setPostitValues(nextPost);
};

/**
 *
 */
export const deleteNote = (
  noteList: PostitValues[],
  idParams: number,
  setPostitValues: React.Dispatch<React.SetStateAction<PostitValues[]>>,
) => {
  const nextItems = noteList.filter((item) => item.id !== idParams);
  setPostitValues(nextItems);
};
