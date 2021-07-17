import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import NoteList from './components/Note/NoteList';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PostitValues } from './components/models/postModel';
import { addPost } from './components/modules/eventHandler';

const App: React.FC = () => {
  const [postitValues, setPostitValues] = useState<PostitValues[]>([]);

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
      addPost(postitValues, setPostitValues);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('noteList') === null || JSON.parse(localStorage.getItem('noteList') as string).length === 0) {
      setPostitValues([
        { id: 0, title: '1', description: '1번의 내용', isFoldPost: false, x: 0, y: 0, isVisible: false, width: 250, height: 250 },
      ]);
      // 로컬스토리지 에서 noteList 이름으로 get 할 아이템이 없다면
      // 해당 값으로 state 설정
    } else {
      setPostitValues(JSON.parse(localStorage.getItem('noteList') as string));
      // 있다면 가져온 값으로 스테이트 설정
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('noteList', JSON.stringify(postitValues));
    // postitValues 스테이트가 변경될 때 마다 localStorage에 아이템 업데이트
  }, [postitValues]);

  return (
    <Container className="mt-5">
      <div className="h1 text-center">Online Post-it</div>
      <Card className="my-3" style={{ minHeight: '80vh' }}>
        <Row>
          <Col lg="2">
            <Header noteTitle={postitValues} setPostitValues={setPostitValues} />
          </Col>
          <Col lg="10">
            <NoteList noteList={postitValues} setPostitValues={setPostitValues} />
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default App;
