import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import NoteList from './components/Note/NoteList';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PostitValues } from './components/models/postModel';
import { addPost } from './components/modules/eventHandler';

const App: React.FC = () => {
  const [postitValues, setPostitValues] = useState<PostitValues[]>([
    { id: 0, title: '1', description: '1번의 내용', isFoldPost: false },
    { id: 1, title: '2', description: '2번의 내용', isFoldPost: false },
    { id: 2, title: '3', description: '3번의 내용', isFoldPost: false },
  ]);

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
