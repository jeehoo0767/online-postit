import React from 'react';
import { handleChange } from '../modules/handleChange';
interface PostitValues {
  id: number;
  title: string;
  description: string;
}

interface NoteListProps {
  noteList: PostitValues[];
  setPostitValues: React.Dispatch<React.SetStateAction<PostitValues[]>>;
}

const Note: React.FC<NoteListProps> = ({ noteList, setPostitValues }: NoteListProps) => {
  /**
   * @포스트잇 포스트잇을 map함수를 이용하여 순회한다
   * @param noteItemPrams {PostitValues[]} map으로 순회하며 화면에 보여줄 내용을 가진 state 배열
   */
  const renderNotes = (noteItemPrams: PostitValues[]) => {
    const noteItems = noteItemPrams.map((item: PostitValues, index: number) => {
      return (
        <li className="note" key={index}>
          <input
            id={index.toString()}
            name="title"
            type="text"
            style={{ border: 'none' }}
            value={item.title}
            onChange={(e) => handleChange(e, noteList, setPostitValues)}
            placeholder="Title"
            className="note_title"
          />
          <textarea
            id={index.toString()}
            name="description"
            value={item.description}
            onChange={(e) => handleChange(e, noteList, setPostitValues)}
            placeholder="Description..."
            className="note_description"
            style={{ border: 'none', borderTop: '1px solid black' }}
          />
          <span className="note_reduce">-</span>
          <span className="note_delete">X</span>
        </li>
      );
    });

    return noteItems;
  };

  return <>{renderNotes(noteList)}</>;
};

export default Note;
