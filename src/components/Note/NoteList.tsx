import React, { useState } from 'react';
import Note from './Note';
import DeleteModal from '../Modal/DeleteModal';
import { addPost } from '../modules/eventHandler';
import { PostitValues } from '../models/postModel';
// import { Row } from 'react-bootstrap';

/**
 * noteList: props로 내려받은 state 객체
 * setPostitValues: setState함수
 */
interface NoteListProps {
  noteList: PostitValues[];
  setPostitValues: React.Dispatch<React.SetStateAction<PostitValues[]>>;
}

const NoteList: React.FC<NoteListProps> = ({ noteList, setPostitValues }: NoteListProps) => {
  const [clickedPost, setClickedPost] = useState<number>(); // 삭제할때 클릭 된 객체의 id를 담을 state -> 모달에 전달 됨
  const [show, setShow] = useState(false); // 모달 상태 state
  const handleClose = () => setShow(false); // 모달 닫기 함수
  const handleShow = () => setShow(true); // 모달 열기 함수
  return (
    <>
      <div className="note-wrap" onDoubleClick={() => addPost(noteList, setPostitValues)}>
        <div className="notes_list">
          <Note noteList={noteList} setPostitValues={setPostitValues} handleShow={handleShow} setClickedPost={setClickedPost} />
        </div>
      </div>
      {show && (
        <DeleteModal
          show={show}
          handleClose={handleClose}
          noteList={noteList}
          setPostitValues={setPostitValues}
          clickedPost={clickedPost}
        />
      )}
    </>
  );
};

export default NoteList;
