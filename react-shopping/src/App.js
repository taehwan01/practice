import "./App.css";
import Product from "./components/Product";
import Event from "./components/Event";
// import Detail from "./routes/Detail";
import Cart from "./routes/Cart";
import data from "./data";
import axios from "axios";
import { lazy, Suspense, useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Routes, Route, useNavigate } from "react-router-dom";

const Detail = lazy(() => import("./routes/Detail.js"));
//cons: loading time required

function App() {
  let [crayons, setCrayons] = useState(data);
  let navigate = useNavigate();
  let [cnt, setCnt] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("watched")) {
      localStorage.setItem("watched", JSON.stringify([]));
    }
  }, []);

  return (
    <div className="App">
      <Navbar bg="light" varian="light">
        <Container>
          <Navbar.Brand href="#home">Crayon Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            {/* <Nav.Link
              onClick={() => {
                navigate("/detail/2");
              }}
            >
              Detail
            </Nav.Link> */}
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/event");
              }}
            >
              Event
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div>
        <h4>RECENTLY WATCHED</h4>
        <h5>{localStorage.getItem("watched")}</h5>
      </div>
      <Suspense fallback={<h1>LOADING</h1>}>
        <Routes>
          <Route
            path="/"
            element={
              <div className="main-bg container">
                <div className="row">
                  {crayons.map(function (a, i) {
                    return <Product key={i} crayons={crayons[i]}></Product>;
                  })}
                </div>
                <button
                  onClick={() => {
                    // if (cnt < 2) {
                    axios
                      .get("https://codemonte.github.io/data2.json")
                      .then((result) => {
                        setCnt(cnt + 1);
                        let copyCrayons = [...crayons];
                        console.log(copyCrayons);
                        copyCrayons = copyCrayons.concat(result.data);
                        //OR let copyCrayons = [...crayons, ...result.data];
                        setCrayons(copyCrayons);
                      })
                      .catch(() => {
                        console.log("Failed to get data");
                      });

                    axios.post("/url", { data });
                    // }
                  }}
                >
                  CLICK!
                </button>
              </div>
            }
          />
          <Route path="/detail/:id" element={<Detail crayons={crayons}></Detail>} />
          <Route path="/cart" element={<Cart></Cart>}></Route>

          <Route path="/event" element={<Event></Event>}>
            <Route
              path="one"
              element={
                <div>
                  <h4>First order, get two.</h4>
                </div>
              }
            ></Route>
            <Route
              path="two"
              element={
                <div>
                  <h4>Get a birthday discount coupon.</h4>
                </div>
              }
            ></Route>
          </Route>
          <Route path="*" element={<h1>404 Non Existing Page</h1>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
