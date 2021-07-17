import React, { useState, useRef } from 'react';
import { handleChange, deleteNote } from '../modules/eventHandler';
import { PostitValues } from '../models/postModel';
import styled from 'styled-components';
// import { Col } from 'react-bootstrap';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';

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

  /**
   * 드래그함수 - state의 x, y 좌표값 설정
   * @param e {DraggableEvent}
   * @param data {DraggableData}
   * @param noteItem {PostitValues}
   */
  const handleDrag = (e: DraggableEvent, data: DraggableData, noteItem: PostitValues) => {
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
    if (!selectedPost.description && !selectedPost.title) {
      deleteNote(selectedPost.id, noteList, setPostitValues);
      return;
    } // 제목과 본문 둘다 내용이 없으면 바로 삭제
    // 하나라도 있으면
    handleShow();
    setClickedPost(selectedPost.id);
    // 모달을 띄운다
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
    console.log('다시실행됨');
    const noteItems = noteItemPrams.map((item: PostitValues) => {
      return (
        <Draggable
          key={item.id}
          nodeRef={nodeRef}
          onStart={handleStart}
          onStop={handleEnd}
          onDrag={(e, data) => handleDrag(e, data, item)}
          position={{ x: item.x, y: item.y }}
          bounds={{ left: -25, top: -20, right: 820, bottom: 430 }} // 최대 이동거리 지정
          cancel=".note_description" // 타이틀 에서만 드래그가 가능하게 textarea를 cancel로 지정
        >
          <div ref={nodeRef} style={{ position: 'absolute', visibility: item.isVisible ? 'hidden' : 'visible' }}>
            <div
              className="note"
              id={item.id.toString()}
              style={{ opacity: opacity ? '0.6' : '1' }}
              onDoubleClick={(e) => e.stopPropagation()}
            >
              <input
                id={item.id.toString()}
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
                id={item.id.toString()}
                name="description"
                value={item.description}
                onChange={(e) => handleChange(e, noteList, setPostitValues)}
                placeholder="Description..."
                className="note_description"
                style={{ border: 'none', borderTop: '1px solid black' }}
                isFold={item.isFoldPost}
                onDrag={(e) => e.stopPropagation()}
              />
              <span className="note_reduce" onClick={() => handleFoldButton(noteList, item)}>
                -
              </span>
              <span className="note_delete" onClick={() => handleDeleteClick(item)}>
                X
              </span>
            </div>
          </div>
        </Draggable>
      );
    });

    return noteItems;
  };

  return <>{noteList && renderNotes(noteList)}</>;
};

export default Note;
