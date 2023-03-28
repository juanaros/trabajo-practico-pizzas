import { Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi"
import MyContext from "../Context";
import { useEffect, useContext } from "react";

export default function Navigation() {
  const { price, setPrice, chosenPizzas } = useContext(MyContext)
  const setActiveClass = ({ isActive }) => (isActive ? "active" : "inactive");
  const logoPizza = "https://static.vecteezy.com/system/resources/previews/010/178/999/original/cartoon-small-pizza-file-free-png.png";

  function sum(){
    const total = chosenPizzas.reduce((acc, item) => acc + (item.price ?? 0) * (item.cantidad ?? 0), 0);
    setPrice(total);
  }

  useEffect(() => {
    sum();
  })

  return (
    <Navbar className="navbar bg-primary" variant="light">
      <Container className="container">
        <Navbar.Brand>
          <NavLink to="/" className={setActiveClass}>
            <img src={logoPizza} alt="logo-pizza" width={50}/>
            Pizza Latam
          </NavLink>
        </Navbar.Brand>
        <Navbar.Brand>
          <NavLink to="/order" className={setActiveClass}>
            <GiShoppingCart /> (${price})
          </NavLink>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}