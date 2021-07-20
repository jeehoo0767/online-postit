import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { PostitValues } from '../components/models/postModel';
import { postListActions } from '../store/feature/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index'; // state의 타입 ( useSelector로 접근 시 타입이 필요 )
// interface NoteTitleProps {
//   noteTitle: PostitValues[];
//   setPostitValues: React.Dispatch<React.SetStateAction<PostitValues[]>>;
// }

const Header: React.FC = () => {
  const { data: getPostData } = useSelector((state: RootState) => state.postListReducer);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const payload = {
      id: Number(e.target.id),
      key: e.target.name,
      content: e.target.value,
    };
    dispatch(postListActions.handlePostChange(payload));
  };

  /**
   * 포스트잇 제목을 map함수를 이용하여 순회한다
   * @param titleParam {PostitValues[]} map으로 순회하며 화면에 보여줄 내용을 가진 state 배열
   */
  const renderNoteTitle = (titleParam: PostitValues[]) => {
    const titleItem = titleParam.map((item: PostitValues, index: number) => {
      return (
        <div key={index}>
          <Form.Control
            id={item.id.toString()}
            className="mb-3"
            name="title"
            value={item.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
            style={{ display: item.isVisible ? 'none' : 'inline' }}
          />
        </div>
      );
    });

    return titleItem;
  };

  /**
   * @포스트잇 포스트잇 항목을 추가한다
   * @param noteItems {PostitValues[]} nextState를 복사 할 기존 state
   */

  return (
    <div className="header">
      {renderNoteTitle(getPostData)}
      <div className="text-center">
        <Button onClick={() => dispatch(postListActions.addPost())}>+</Button>
      </div>
    </div>
  );
};

export default Header;
