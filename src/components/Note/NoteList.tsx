import React from 'react';
import Note from './Note';

interface PostitValues {
  id: number;
  title: string;
  description: string;
}

interface NoteListProps {
  noteList: PostitValues[];
  setPostitValues: React.Dispatch<React.SetStateAction<PostitValues[]>>;
}

const NoteList: React.FC<NoteListProps> = ({ noteList, setPostitValues }: NoteListProps) => {
  return (
    <div className="note-wrap">
      <ul className="notes_list">
        <Note noteList={noteList} setPostitValues={setPostitValues} />
      </ul>
    </div>
  );
};

export default NoteList;
