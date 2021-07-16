import React from 'react';
import Note from './Note';
import { addPost } from '../modules/eventHandler';
import { PostitValues } from '../models/postModel';
interface NoteListProps {
  noteList: PostitValues[];
  setPostitValues: React.Dispatch<React.SetStateAction<PostitValues[]>>;
}

const NoteList: React.FC<NoteListProps> = ({ noteList, setPostitValues }: NoteListProps) => {
  return (
    <div className="note-wrap" onDoubleClick={() => addPost(noteList, setPostitValues)}>
      <ul className="notes_list">
        <Note noteList={noteList} setPostitValues={setPostitValues} />
      </ul>
    </div>
  );
};

export default NoteList;
