import React, { useState } from 'react';
import Note from './Note';
import DeleteModal from '../Modal/DeleteModal';
import { postListActions } from '../../store/feature/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index'; // state의 타입 ( useSelector로 접근 시 타입이 필요 )

const NoteList: React.FC = () => {
  const { data: getPostData } = useSelector((state: RootState) => state.postListReducer);

  const dispatch = useDispatch();
  const [clickedPost, setClickedPost] = useState<number>(); // 삭제할때 클릭 된 객체의 id를 담을 state -> 모달에 전달 됨
  const [show, setShow] = useState(false); // 모달 상태 state
  const handleClose = () => setShow(false); // 모달 닫기 함수
  const handleShow = () => setShow(true); // 모달 열기 함수

  const handleDoubleClick = () => {
    if (getPostData.length >= 12) {
      return alert('최대 12개까지 생성이 가능합니다');
    }
    dispatch(postListActions.addPost());
  };
  return (
    <>
      <div className="note-wrap" onDoubleClick={() => handleDoubleClick()}>
        <div className="notes_list">
          <Note handleShow={handleShow} setClickedPost={setClickedPost} />
        </div>
      </div>
      {show && <DeleteModal show={show} handleClose={handleClose} clickedPost={clickedPost} />}
    </>
  );
};

export default NoteList;
