import React from 'react';
import Note from './Note';

interface PostitValues {
  title: string;
  description: string;
}

interface NoteListProps {
  noteList: PostitValues[];
}

const NoteList: React.FC<NoteListProps> = ({ noteList }: NoteListProps) => {
  return (
    <div className="note-wrap">
      <ul className="notes_list">
        <Note noteList={noteList} />
      </ul>
    </div>
  );
};

export default NoteList;
