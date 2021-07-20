import React from 'react';
import { Button } from 'react-bootstrap';
import { PostitValues } from '../models/postModel';
import { postListActions } from '../store/feature/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index'; // state의 타입 ( useSelector로 접근 시 타입이 필요 )
// interface NoteTitleProps {
//   noteTitle: PostitValues[];
//   setPostitValues: React.Dispatch<React.SetStateAction<PostitValues[]>>;
// }

const Header: React.FC = () => {
  const { data: getPostData, selectedTitleForEffect } = useSelector((state: RootState) => state.postListReducer);
  const dispatch = useDispatch();

  /**
   * 포스트잇 제목을 map함수를 이용하여 순회한다
   * @param titleParam {PostitValues[]} map으로 순회하며 화면에 보여줄 내용을 가진 state 배열
   */
  const renderNoteTitle = (titleParam: PostitValues[]) => {
    const titleItem = titleParam.map((item: PostitValues) => {
      return (
        <div key={item.id}>
          <div className="mb-3 header-post-title-list" style={{ background: item.id === selectedTitleForEffect ? '#eeeeee' : '#ffffff' }}>
            {item.title}
          </div>
        </div>
      );
    });

    return titleItem;
  };

  /**
   * @포스트잇 포스트잇 항목을 추가한다
   * @param noteItems {PostitValues[]} nextState를 복사 할 기존 state
   */
  const handleAddPostButton = () => {
    if (getPostData.length >= 12) {
      return alert('최대 12개까지 생성이 가능합니다');
    }
    dispatch(postListActions.addPost());
  };

  return (
    <div className="header">
      {renderNoteTitle(getPostData)}
      <div className="text-center">
        <Button onClick={() => handleAddPostButton()}>+</Button>
      </div>
    </div>
  );
};

export default Header;
