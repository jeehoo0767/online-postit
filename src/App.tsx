import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import NoteList from './components/Note/NoteList';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/index'; // state의 타입 ( useSelector로 접근 시 타입이 필요 )
import { postListActions } from './store/feature/postSlice'; // postReducer 액션 모음

const App: React.FC = () => {
  const dispatch = useDispatch();
  const {
    isLoading: getPostLoading,
    data: getPostData,
    error: getPostError,
    selectedPostIdForFocus,
  } = useSelector((state: RootState) => state.postListReducer);

  let isCtrl: boolean = false;
  let isAlt: boolean = false;

  document.onkeyup = function (e: KeyboardEvent) {
    if (e.ctrlKey) isCtrl = false;
    if (e.altKey) isAlt = false;
  };

  document.onkeydown = function (e: KeyboardEvent) {
    if (e.ctrlKey) isCtrl = true;
    if (e.altKey) isAlt = true;

    if (e.key === 'n' && isCtrl && isAlt) {
      if (getPostData.length >= 12) {
        // 포스트 갯수는 최대 12개까지 생성 가능
        return alert('최대 12개까지 생성이 가능합니다');
      } else {
        dispatch(postListActions.addPost());
        const titleList = document.querySelectorAll('.note_title');
        dispatch(postListActions.setFocus({ id: Number(titleList[titleList.length - 1]?.id) }));
        // 포스트를 단축키로 생성 시 포커스를 위해 생성 후 postList의 note_title클래스를 가진 마지막 원소의 id를 setFocus액션에 넣어서 dispatch
      }
    }
  }; // ctrl + alt + n 단축키를 누를 시 포스트를 생성하는 함수

  useEffect(() => {
    dispatch(postListActions.loadPost());
    // 디드마운트 시 loadPost 함수를 디스패치 하면서 saga를 실행
  }, []);

  useEffect(() => {
    if (getPostData !== null) {
      localStorage.setItem('noteList', JSON.stringify(getPostData));
    } // store에 데이터가 null이라면 스토리지에 저장하지 않는다
    // store의 postData가 업데이트 될 때 마다 스토리이지에 noteList 이름으로 item을 저장
    // didmount 단게에서 loadPost 디스패치 시 아이템이 null 이라면 빈 배열을 리턴 받아서 store에 업데이트가 되고 그 값이 이 함수 안에서
    // storage에 저장되는 구조
  }, [getPostData]);

  useEffect(() => {
    const titleList = [...document.querySelectorAll('.note_title')];
    const focusEle = titleList.find((item) => Number(item.id) === selectedPostIdForFocus);
    (focusEle as HTMLElement)?.focus();
  }, [selectedPostIdForFocus]);
  // 단축키로 포커스를 생성 시 타이틀에 포커스를 위한 함수
  // 클래스로 title 인풋을 querySelector로 가져와서 스토어에 id와 매칭되는 엘레멘트를 찾아서 포커싱 한다

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: `100%`,
          backgroundImage:
            'url(https://img.freepik.com/free-photo/abstract-and-surface-wood-texture-for-background_74190-12071.jpg?size=626&ext=jpg&ga=GA1.2.1591904653.1622073600)',
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      />
      <Container className="mt-5">
        {getPostLoading && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <div className="h4">잠시만 기다려 주세요 ...</div>
          </div>
        )}
        {getPostData && (
          <>
            <div className="h1 text-center">Online Post-it</div>
            <Card className="my-3" style={{ minHeight: '80vh', backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <Row>
                <Col lg="2">
                  <Header />
                </Col>
                <Col lg="10" className="pl-0 drag_wrap">
                  <NoteList />
                </Col>
              </Row>
            </Card>
          </>
        )}
        {getPostError && <div className="text-center">에러 발생</div>}
      </Container>
    </>
  );
};

export default App;
