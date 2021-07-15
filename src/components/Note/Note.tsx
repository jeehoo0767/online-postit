import React from 'react';

interface PostitValues {
  title: string;
  description: string;
}

interface NoteListProps {
  noteList: PostitValues[];
}

const Note: React.FC<NoteListProps> = ({ noteList }: NoteListProps) => {
  const renderNotes = (noteItemPrams: PostitValues[]) => {
    const noteItems = noteItemPrams.map((item: PostitValues, index: number) => {
      return (
        <li className="note" key={index}>
          <input
            type="text"
            style={{ border: 'none' }}
            value={item.title}
            // onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="note_title"
          />
          <textarea
            value={item.description}
            // onChange={(e) => setDescription(e.target.value)}
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
