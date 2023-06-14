//Zet de imports goed
import React, { useEffect, useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
//there is no need to import bootstrap.min.css, because it is already imported in index.js
const url = 'https://localhost:7066/Information';


function App() {
  const [data, setData] = useState([]);
  const [newInformation, setNewInformation] = useState('');
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(url);//doe een call maken naar de API
      const jsonData = await response.json();//zet de response om naar json
      setData(jsonData);//tadaa, data is gemaakt
    } catch (error) {
      console.log('Error fetching data:', error);//default error handling
    }
  };

  const handleSubmit = async (e) => {//dit is voor invullen
    e.preventDefault();
  
    try {
      const response = await fetch(url, {
        method: 'POST',//maak hier ook een call, maar zeg dat je wilt posten
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ information: newInformation }),//maak vna de string die je meegeeft json zodat de API niet breekt
      });
  
      if (response.ok) {//is het allemaal goed gegaan (code 200)
        const jsonData = await response.json();
        if (jsonData) {
          setData([...data, jsonData]);
          setNewInformation('');
        } else {
          console.log('Empty response received.');//als er niks terug is, zeg dat er niks terug is
        }
      } else {
        console.log('Failed to submit data:', response.status);//als er geen 200 code is, zeg dat er geen 200 code is
      }
    } catch (error) {
      console.log('Error submitting data:', error);//als er helemaal nikt gezegd word, laat dit weten. 
    }
  };
  
//mooimaaktijd!
  return (
    <div>
      <h1>Data from API:</h1>
      <ul>
        {data.map((item) => (
          <ListGroup key={item.infromationID}>
            <ListGroup.Item className="mt-2 col-md-3" variant="primary">
              {item.information}
            </ListGroup.Item>
          </ListGroup>
        ))}
      </ul> 

      <h2>Add New Information:</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="informationInput">
          <Form.Label>Information:</Form.Label>
          <Form.Control
            type="text"
            value={newInformation}
            onChange={(e) => setNewInformation(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;
