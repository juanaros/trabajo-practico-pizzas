import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import MyContext from "../Context";

export default function Home() {
  const { info, chosenPizzas, setChosenPizzas } = useContext(MyContext);

  const navigate = useNavigate();

  const pizzaDetailClick = (id) => {
    navigate(`/pizza/${id}`);
  };

  const addPizza = (id) => {
    const pizzaSelect = chosenPizzas.findIndex((p) => p.id === id);
    if (pizzaSelect >= 0) {
      const nueva = [...chosenPizzas];
      nueva[pizzaSelect].cantidad += 1;
      setChosenPizzas(nueva);
    } else {
      const nuevaPizza = info.find((p) => p.id === id);
      const datosPizza = {
        id: nuevaPizza.id,
        cantidad: 1,
        price: nuevaPizza.price,
        name: nuevaPizza.name,
        img: nuevaPizza.img,
      };
      setChosenPizzas([...chosenPizzas, datosPizza]);
    }
  };

  return (
    <Container className="my-5 ">
      <Row>
      {info.map((type) => (
        <Col md="6" lg="4" className="d-flex justify-content-center"> 
          <Card key={type.id} className="mb-4" style={{ width: '25rem' }}>
          <Card.Img variant="top" src={type.img} />
          <Card.Body >
            <Card.Title className="">Pizza {type.name}</Card.Title>
            <div>
              <h6>Ingredientes:</h6>
              <ul>
                {type.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <Card.Text>${type.price}</Card.Text>
            <Card.Footer className="d-flex justify-content-center gap-2">
                <Button onClick={() => pizzaDetailClick(type.id)}>
                  Ver más
                </Button>
                <Button
                  variant="danger"
                  onClick={() => addPizza(type.id)}
                >
                  Añadir
                </Button>
            </Card.Footer>
          </Card.Body>
          </Card>
        </Col>
      ))}
      </Row>
    </Container>
  );
}
