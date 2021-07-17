import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { PostitValues } from '../models/postModel';
import { deleteNote } from '../modules/eventHandler';

/**
 * show: 모달 상태 state
 * handleClose: 모달 닫는 함수
 * noteList: props로 내려받은 state객체 (deleteNote 함수로 전달 될 파라미터)
 * setPostitValues: setState함수
 * clickedPost: 삭제 버튼 클릭 시 선택된 id를 props로 전달받음
 */
interface DeleteModalProps {
  show: boolean;
  handleClose: () => void;
  noteList: PostitValues[];
  setPostitValues: React.Dispatch<React.SetStateAction<PostitValues[]>>;
  clickedPost: number | undefined;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ show, handleClose, noteList, setPostitValues, clickedPost }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>해당 포스트잇을 삭제 하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            취소
          </Button>
          <Button variant="primary" onClick={() => deleteNote(clickedPost, noteList, setPostitValues, handleClose)}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
