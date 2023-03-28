import { useContext, useEffect } from "react";
import Context from "../Context";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

export default function Order() {
  const { price, setPrice, chosenPizzas, setChosenPizzas } =
    useContext(Context);

  const printTable = () => {
    const cart = chosenPizzas.map((p, index) =>
      p.cantidad > 0 ? (
        <tr key={index}>
          <td>
            <img src={p.img} alt="foto-pizza" width={100}/>
            <span> Pizza {p.name}</span>
          </td>
          <td>${p.price}</td>
          <td>
            <div className="d-flex flex-row gap-3 align-items-center">
              <div><Button variant="danger" onClick={() => takePizza(p.id)}>
                -
              </Button></div>
              <div>{p.cantidad}</div>
              <div><Button variant="danger" onClick={() => addPizza(p.id)}>
                +
              </Button></div>
            </div>
          </td>
        </tr>
      ) : null
    );
    return cart;
  };

  const addPizza = (id) => {
    const pizzaSelect = chosenPizzas.findIndex((p) => p.id === id);
    const nueva = [...chosenPizzas];
    nueva[pizzaSelect].cantidad += 1;
    setChosenPizzas(nueva);
  };

  const takePizza = (id) => {
    const pizzaSelect = chosenPizzas.findIndex((p) => p.id === id);
    const restar = [...chosenPizzas];
    restar[pizzaSelect].cantidad -= 1;
    const borrar = restar.filter((p) => p.cantidad !== 0);
    setChosenPizzas(borrar);
  };

  function sumar() {
    const total = chosenPizzas.reduce(
      (acc, item) => acc + (item.price ?? 0) * (item.cantidad ?? 0),
      0
    );
    setPrice(total);
  }

  useEffect(() => {
    sumar();
  });

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="my-5">Detalles del pedido</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th colSpan={1}>Detalle</th>
            <th>Precio</th>
            <th colSpan={3}>Cantidad</th>
          </tr>
        </thead>
        <tbody>{printTable()}</tbody>
      </Table>
      <h2 className="my-3">Total de su compra: ${price}</h2>
        <Button variant="success">Ir a pagar</Button>
      <div className="container detailTable">
        
      </div>
    </div>
  );
}
