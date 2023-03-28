import { useParams } from "react-router-dom";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Card, ListGroup } from "react-bootstrap";

import Context from "../Context";

export default function Pizza() {
  const { id } = useParams();
  const { info, chosenPizzas, setChosenPizzas } = useContext(Context);

  const pizza = info.filter((p) => p.id.toString() === id.toString());

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
    <div className="col d-flex justify-content-center my-2">
      {pizza.map((type) => (

        <Card style={{ width: '28rem' }}>
          <Card.Body>
          <Card.Img src={type.img} alt={type.name}/>
            <Card.Title className="mt-2">Pizza {type.name}</Card.Title>
            <Card.Text>{type.desc}</Card.Text>
            <p className="fw-bold">Ingredientes:</p>
            <ListGroup>
              {type.ingredients.map((ingredient) => (
                <ListGroup.Item key={ingredient}>{ingredient}</ListGroup.Item>
              ))}
            </ListGroup>
            <hr />
            <span className="fw-bold">Precio: ${type.price}</span>
            <div>
            <Button
              className="mt-3"
              variant="danger"
              onClick={() => addPizza(type.id)}
            >
              Añadir
            </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
