import React from 'react';
import { PostitValues } from '../../models/postModel';
import styled from 'styled-components';
import { Rnd, DraggableData, ResizableDelta } from 'react-rnd';
import { ResizeDirection } from 're-resizable';
import { postListActions } from '../../store/feature/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/index'; // state의 타입 ( useSelector로 접근 시 타입이 필요 )

const StyledTextArea = styled.textarea<{ isFold: boolean }>`
  display: ${(props) => (props.isFold ? 'none' : 'inline-block')};
  resize: none;
`;
/**
 * Note컴포넌트로 전달받은 Props의 타입
 * handleShow {() => void} 모달을 여는 함수
 * setClickedPost {React.Dispatch<React.SetStateAction<number | undefined>>} 클릭 된 포스트의 아이디를 담을 state를 setState하는 props
 */
interface NoteListProps {
  handleShow: () => void;
  setClickedPost: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const Note: React.FC<NoteListProps> = ({ handleShow, setClickedPost }: NoteListProps) => {
  const { data: getPostData } = useSelector((state: RootState) => state.postListReducer);
  const dispatch = useDispatch();

  /**
   * 인풋 체인지 이벤트 함수, 타겟의 name과 value를 넘기고 스토어에서 해당 name을 가진 key의 value를 action.payload.value로 업데이트
   * @param e {React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>}
   * e => 이벤트가 일어난 input / textArea의 이벤트객체
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const payload = {
      id: Number(e.target.id),
      key: e.target.name,
      content: e.target.value,
    };
    dispatch(postListActions.handlePostChange(payload));
  };
  /**
   * 드래그함수 - state의 x, y 좌표값 설정
   * @param dragData {DraggableData} 드래그 이벤트 좌표값 객체
   * @param selectedItemsId {number} 이벤트가 일어난 아이템의 id
   */
  const handleDragPost = (dragData: DraggableData, selectedItemsId: number) => {
    const payload = {
      id: selectedItemsId,
      x: dragData.x,
      y: dragData.y,
    };
    dispatch(postListActions.handleDragPost(payload));
  };

  /**
   * 포스트 리사이즈 함수
   * @param e {MouseEvent | TouchEvent}
   * @param direction {ResizeDirection} 리사이즈 시간 조절
   * @param ref {HTMLElement} 이벤트가 일어난 엘리먼트
   * @param delta {ResizableDelta}
   * @param position { x: number; y: number } 좌표를 가진 파라미터
   * @param noteItem {PostitValues} 이벤트가 일어난 아이템의 상태(state)
   */
  const handleResizePost = (
    e: MouseEvent | TouchEvent,
    direction: ResizeDirection,
    ref: HTMLElement,
    delta: ResizableDelta,
    position: { x: number; y: number },
    noteItem: PostitValues,
  ) => {
    const payload = {
      id: noteItem.id,
      width: Number(ref.style.width.split('px')[0]),
      height: Number(ref.style.height.split('px')[0]),
    };
    dispatch(postListActions.handleResizePost(payload));
  };

  /**
   * 포스트 삭제버튼 함수 (내용이 없으면 바로 삭제 시키는 함수)
   * @param selectedPost {PostitValues} 포스트 배열 (state)
   * @returns
   */
  const handleDeleteClick = (selectedPost: PostitValues) => {
    const payload = {
      id: selectedPost.id,
    };
    if (!selectedPost.description && !selectedPost.title) {
      dispatch(postListActions.deletePost(payload));
      return;
    } // 제목과 본문 둘다 내용이 없으면 바로 삭제
    // 하나라도 있으면
    handleShow();
    setClickedPost(selectedPost.id);
    // 모달을 띄운다
  };

  /**
   * 포스트 접기버튼 함수
   * @param selectedPostId {number} 선택된 객체의 id
   */
  const handleFoldButton = (selectedPostId: number) => {
    const paylpad = {
      id: selectedPostId,
    };
    dispatch(postListActions.handleFoldPost(paylpad));
  };

  /**
   * 포스트잇을 map함수를 이용하여 순회한다
   * @param noteItemPrams {PostitValues[]} map으로 순회하며 화면에 보여줄 내용을 가진 state 배열
   */
  const renderNotes = (noteItemPrams: PostitValues[]) => {
    const noteItems = noteItemPrams.map((item: PostitValues) => {
      return (
        <Rnd
          position={{
            x: item.x,
            y: item.y,
          }}
          size={{ width: item.width, height: item.height }}
          minWidth={200}
          minHeight={80}
          onDragStop={(e, d) => handleDragPost(d, item.id)} // 드래그 props
          onResizeStop={(e, direction, ref, delta, position) => handleResizePost(e, direction, ref, delta, position, item)} // 사이즈 조절 props
          cancel=".note_description" // 타이틀 에서만 드래그가 가능하게 textarea를 cancel로 지정
          bounds=".drag_wrap" // 해당 영역 안에서만 움직임 가능
          enableResizing={{ bottom: item.isFoldPost ? false : true, right: true, bottomRight: item.isFoldPost ? false : true }} // 사이즈 조정이 가능한 방향
          key={item.id}
        >
          <div
            className="note resize"
            id={item.id.toString()}
            onDoubleClick={(e) => e.stopPropagation()} // 더블클릭 이벤트 캡쳐링 방지를 위한 함수
            style={{
              background: item.isFoldPost
                ? 'lightyellow'
                : 'linear-gradient(-45deg, transparent 15px, lightyellow 0), linear-gradient(45deg, transparent 15px, rgb(255, 94, 0) 0)',
            }} // 모서리 주황색 스타일
          >
            <input
              id={item.id.toString()}
              name="title"
              type="text"
              style={{ border: 'none' }}
              value={item.title}
              onChange={(e) => handleChange(e)}
              onFocus={() => dispatch(postListActions.selectedTitleMakeEffect({ id: item.id }))}
              onBlur={() => dispatch(postListActions.selectedTitleMakeEffect({ id: null }))}
              placeholder="Title"
              className="note_title"
              autoComplete="off"
            />
            <StyledTextArea
              id={item.id.toString()}
              name="description"
              value={item.description}
              onChange={(e) => handleChange(e)}
              onFocus={() => dispatch(postListActions.selectedTitleMakeEffect({ id: item.id }))}
              onBlur={() => dispatch(postListActions.selectedTitleMakeEffect({ id: null }))}
              placeholder="Description..."
              className="note_description"
              style={{ border: 'none', borderTop: '1px solid black' }}
              isFold={item.isFoldPost}
              onDrag={(e) => e.stopPropagation()}
            />
            <span className="note_reduce" onClick={() => handleFoldButton(item.id)}>
              -
            </span>
            <span className="note_delete" onClick={() => handleDeleteClick(item)}>
              X
            </span>
          </div>
        </Rnd>
      );
    });

    return noteItems;
  };

  return <>{getPostData && renderNotes(getPostData)}</>;
};

export default Note;
