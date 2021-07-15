import React from 'react';
import { Form } from 'react-bootstrap';

interface PostitValues {
  title: string;
  description: string;
}

interface NoteTitleProps {
  noteTitle: PostitValues[];
}

const renderNoteTitle = (titleParam: PostitValues[]) => {
  const titleItem = titleParam.map((item: PostitValues, index: number) => {
    return <Form.Control key={index} className="mb-3" value={item.title} />;
  });

  return titleItem;
};

const Header: React.FC<NoteTitleProps> = ({ noteTitle }) => {
  return <div className="header">{renderNoteTitle(noteTitle)}</div>;
};

export default Header;
