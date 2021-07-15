import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { handleChange } from './modules/handleChange';
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

  const addPost = () => {
    const nextPost = [...noteTitle];
    nextPost.push({ id: noteTitle[noteTitle.length - 1].id + 1, title: '', description: '' });
    setPostitValues(nextPost);
  };

  return (
    <div className="header">
      {renderNoteTitle(noteTitle)}
      <div className="text-center">
        <Button onClick={() => addPost()}>+</Button>
      </div>
    </div>
  );
};

export default Header;
