import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Row, Col } from 'react-bootstrap';

const Task = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const newTask = {
        title,
        description,
      };
  
      const response = await axios.post('http://localhost:5000/tasks/ajouter', newTask);
  
      setTitle('');
      setDescription('');
      console.log(response.data); // Add this line
      // Reload the page after adding a new task
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  //Clear Fields 
  const handleClearFields = () => {
    setTitle('');
    setDescription('');
  };

  
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="success"
            type="submit"
            style={{ marginRight: '30px' }}
           
          >
            Envoyer
          </Button>
          <Button variant="secondary"
           type="reset"
           onClick={handleClearFields}>
            Annuler
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Task;