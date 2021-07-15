import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import NoteList from './components/Note/NoteList';
import { addPost } from './components/modules/eventHandler';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface PostitValues {
  id: number;
  title: string;
  description: string;
}

const App: React.FC = () => {
  const [postitValues, setPostitValues] = useState<PostitValues[]>([
    { id: 0, title: '1', description: '1번의 내용' },
    { id: 1, title: '2', description: '2번의 내용' },
    { id: 2, title: '3', description: '3번의 내용' },
  ]);
  return (
    <Container className="mt-5">
      <div className="h1 text-center">Online Post-it</div>
      <Card className="mt-3" style={{ minHeight: '80vh' }}>
        <Row>
          <Col lg="2">
            <Header noteTitle={postitValues} setPostitValues={setPostitValues} />
          </Col>
          <Col lg="10" onDoubleClick={() => addPost(postitValues, setPostitValues)}>
            <NoteList noteList={postitValues} setPostitValues={setPostitValues} />
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default App;
