import React from 'react';
import { Form, Button } from 'react-bootstrap';

interface PostitValues {
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
      return <Form.Control key={index} className="mb-3" value={item.title} />;
    });

    return titleItem;
  };

  const addPost = () => {
    const nextPost = [...noteTitle];
    nextPost.push({ title: '', description: '' });
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
