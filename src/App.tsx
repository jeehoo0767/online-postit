import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import NoteList from './components/Note/NoteList';
import { Container, Row, Col, Card } from 'react-bootstrap';

interface PostitValues {
  title: string;
  description: string;
}

const App: React.FC = () => {
  const [postitValues] = useState<PostitValues[]>([
    { title: '1', description: '1번의 내용' },
    { title: '2', description: '2번의 내용' },
    { title: '3', description: '3번의 내용' },
  ]);
  return (
    <Container className="mt-5">
      <div className="h1 text-center">Online Post-it</div>
      <Card className="mt-3" style={{ height: '80vh' }}>
        <Row>
          <Col lg="2">
            <Header noteTitle={postitValues} />
          </Col>
          <Col lg="10">
            <NoteList noteList={postitValues} />
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default App;
