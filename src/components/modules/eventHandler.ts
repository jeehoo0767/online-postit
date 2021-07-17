import React from 'react';
import { PostitValues } from '../models/postModel';

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
  console.log(e.target);
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
    nextPost.push({ id: 0, title: '', description: '', isFoldPost: false, x: 10, y: 10 });
  } else {
    nextPost.push({
      id: noteItems[noteItems.length - 1].id + 1,
      title: '',
      description: '',
      isFoldPost: false,
      x: nextPost[nextPost.length - 1].x + 10,
      y: nextPost[nextPost.length - 1].y + 10,
    });
  }
  // 복사 할 state가 없다면 id를 0부터 추가하고 아니면
  // 마지막 인덱스의 id에서 1을 더한 값으로 state를 추가
  setPostitValues(nextPost);
};

/**
 * 포스트 삭제 함수
 *@param idParams {number | undefined} 클릭된 포스트의 아이디
 *@param noteItems {PostitValues[]} 포스트 state 배열
 *@param setPostitValues {React.Dispatch<React.SetStateAction<PostitValues[]>>} setState함수
 *@param handleClose {()=>void} 모달 닫는 함수
 */
export const deleteNote = (
  idParams: number | undefined,
  noteItems: PostitValues[],
  setPostitValues: React.Dispatch<React.SetStateAction<PostitValues[]>>,
  handleClose?: () => void | undefined,
) => {
  const nextItems = noteItems.filter((item) => item.id !== idParams);
  setPostitValues(nextItems);
  handleClose && handleClose();
};
