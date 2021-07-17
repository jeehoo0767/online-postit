import React, { useState, useRef } from 'react';
import { handleChange, deleteNote } from '../modules/eventHandler';
import { PostitValues } from '../models/postModel';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import Draggable, { DraggableData } from 'react-draggable';

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
  const nodeRef = useRef(null);
  const [opacity, setOpacity] = useState(false);

  const handleDrag = (e: any, data: DraggableData, noteItem: PostitValues) => {
    // setPosition({ x: data.x, y: data.y });
    const nextItems = noteList.map((item) => {
      if (noteItem.id === item.id) {
        return {
          ...item,
          x: data.x,
          y: data.y,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    setPostitValues(nextItems);
  };
  const handleStart = () => {
    setOpacity(true);
  };
  const handleEnd = () => {
    setOpacity(false);
  };
  /**
   * 포스트 삭제버튼 함수 (내용이 없으면 바로 삭제)
   * @param selectedPost {PostitValues} 포스트 배열 (state)
   * @returns
   */
  const handleDeleteClick = (selectedPost: PostitValues) => {
    if (!selectedPost.description || !selectedPost.title) {
      deleteNote(selectedPost.id, noteList, setPostitValues);
      return;
    } // 제목이나 본문에 내용이 있을경우 바로 삭제
    handleShow();
    setClickedPost(selectedPost.id);
    // 아니면 모달을 띄운다
  };

  /**
   * 포스트를 접는 함수
   * @param noteItemPrams {PostitValues[]} 복제 할 state 배열
   * @param selectedPost {PostitValues} - 버튼이 선택 된 state 배열
   */
  const handleFoldButton = (noteItemPrams: PostitValues[], selectedPost: PostitValues) => {
    console.log('얘도실행됨');
    const nextItems = noteItemPrams.map((item: PostitValues) => {
      if (selectedPost.id === item.id) {
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
        <Draggable
          key={item.id}
          nodeRef={nodeRef}
          onStart={handleStart}
          onStop={handleEnd}
          onDrag={(e, data) => handleDrag(e, data, item)}
          position={{ x: item.x, y: item.y }}
        >
          <Col ref={nodeRef}>
            <div
              className="note"
              id={item.id.toString()}
              style={{ opacity: opacity ? '0.6' : '1' }}
              onDoubleClick={(e) => e.stopPropagation()}
            >
              <input
                id={index.toString()}
                name="title"
                type="text"
                style={{ border: 'none' }}
                value={item.title}
                onChange={(e) => handleChange(e, noteList, setPostitValues)}
                placeholder="Title"
                className="note_title"
                autoComplete="off"
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
        </Draggable>
      );
    });

    return noteItems;
  };

  return <>{renderNotes(noteList)}</>;
};

export default Note;
