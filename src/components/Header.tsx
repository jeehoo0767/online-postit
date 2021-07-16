import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { handleChange, addPost } from './modules/eventHandler';
interface PostitValues {
  id: number;
  title: string;
  description: string;
}

interface NoteTitleProps {
  noteTitle: PostitValues[];
  setPostitValues: React.Dispatch<React.SetStateAction<PostitValues[]>>;
}

const Header: React.FC<NoteTitleProps> = ({ noteTitle, setPostitValues }) => {
  /**
   * 포스트잇 제목을 map함수를 이용하여 순회한다
   * @param titleParam {PostitValues[]} map으로 순회하며 화면에 보여줄 내용을 가진 state 배열
   */
  const renderNoteTitle = (titleParam: PostitValues[]) => {
    const titleItem = titleParam.map((item: PostitValues, index: number) => {
      return (
        <Form.Control
          id={index.toString()}
          key={index}
          className="mb-3"
          name="title"
          value={item.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, noteTitle, setPostitValues)}
        />
      );
    });

    return titleItem;
  };

  /**
   * @포스트잇 포스트잇 항목을 추가한다
   * @param noteItems {PostitValues[]} nextState를 복사 할 기존 state
   */

  return (
    <div className="header">
      {renderNoteTitle(noteTitle)}
      <div className="text-center">
        <Button onClick={() => addPost(noteTitle, setPostitValues)}>+</Button>
      </div>
    </div>
  );
};

export default Header;
