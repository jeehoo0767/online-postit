import React, { useState } from 'react';
import Note from './Note';
import DeleteModal from '../Modal/DeleteModal';
import { postListActions } from '../../store/feature/postSlice';
import { useDispatch } from 'react-redux';
// import { Row } from 'react-bootstrap';

/**
 * noteList: props로 내려받은 state 객체
 * setPostitValues: setState함수
 */

const NoteList: React.FC = () => {
  const dispatch = useDispatch();
  const [clickedPost, setClickedPost] = useState<number>(); // 삭제할때 클릭 된 객체의 id를 담을 state -> 모달에 전달 됨
  const [show, setShow] = useState(false); // 모달 상태 state
  const handleClose = () => setShow(false); // 모달 닫기 함수
  const handleShow = () => setShow(true); // 모달 열기 함수
  return (
    <>
      <div className="note-wrap" onDoubleClick={() => dispatch(postListActions.addPost())}>
        <div className="notes_list">
          <Note handleShow={handleShow} setClickedPost={setClickedPost} />
        </div>
      </div>
      {show && <DeleteModal show={show} handleClose={handleClose} clickedPost={clickedPost} />}
    </>
  );
};

export default NoteList;
