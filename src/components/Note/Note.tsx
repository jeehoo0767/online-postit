import React from 'react';
import { handleChange, deleteNote } from '../modules/eventHandler';
import { PostitValues } from '../models/postModel';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
const StyledTextArea = styled.textarea<{ isFold: boolean }>`
  display: ${(props) => (props.isFold ? 'none' : 'inline-block')};
`;
interface NoteListProps {
  noteList: PostitValues[];
  setPostitValues: React.Dispatch<React.SetStateAction<PostitValues[]>>;
  handleShow: () => void;
  setClickedPost: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const Note: React.FC<NoteListProps> = ({ noteList, setPostitValues, handleShow, setClickedPost }: NoteListProps) => {
  /**
   * 포스트 삭제버튼 함수 (내용이 없으면 바로 삭제)
   * @param selectedPost {PostitValues} 포스트 배열 (state)
   * @returns
   */
  const handleDeleteClick = (selectedPost: PostitValues) => {
    if (!selectedPost.description) {
      deleteNote(selectedPost.id, noteList, setPostitValues);
      return;
    }
    handleShow();
    setClickedPost(selectedPost.id);
  };

  /**
   * 포스트를 접는 함수
   * @param noteItemPrams {PostitValues[]} 복제 할 state 배열
   * @param selectedPost {PostitValues} - 버튼이 선택 된 state 배열
   */
  const handleFoldButton = (noteItemPrams: PostitValues[], selectedPost: PostitValues) => {
    const nextItems = noteItemPrams.map((item: PostitValues, index: number) => {
      if (selectedPost.id === index) {
        return {
          ...item,
          isFoldPost: !item.isFoldPost,
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
   * 포스트잇을 map함수를 이용하여 순회한다
   * @param noteItemPrams {PostitValues[]} map으로 순회하며 화면에 보여줄 내용을 가진 state 배열
   */
  const renderNotes = (noteItemPrams: PostitValues[]) => {
    const noteItems = noteItemPrams.map((item: PostitValues, index: number) => {
      return (
        <Col key={index}>
          <div className="note" onDoubleClick={(e) => e.stopPropagation()}>
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
            <StyledTextArea
              id={index.toString()}
              name="description"
              value={item.description}
              onChange={(e) => handleChange(e, noteList, setPostitValues)}
              placeholder="Description..."
              className="note_description"
              style={{ border: 'none', borderTop: '1px solid black' }}
              isFold={item.isFoldPost}
            />
            <span className="note_reduce" onClick={() => handleFoldButton(noteList, item)}>
              -
            </span>
            <span className="note_delete" onClick={() => handleDeleteClick(item)}>
              X
            </span>
          </div>
        </Col>
      );
    });

    return noteItems;
  };

  return <>{renderNotes(noteList)}</>;
};

export default Note;
