import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { PostitValues } from '../models/postModel';
import { deleteNote } from '../modules/eventHandler';
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
