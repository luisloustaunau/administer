import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


const Home = () => {
    return (
        <>
        <br></br>
<br></br>
        <Container>
            <Row>
                <Col></Col>
                <Col><div>
                    <h2 >Administer Resources Home</h2>
                    </div>
                </Col>
                <Col></Col>
                    </Row>
<br></br>
<br></br>
  <Row>

    <Col>
            <Link to='/users'>
    <Button variant="primary" size="lg">
    View Users
  </Button>
          </Link>

  </Col>

    <Col md={{ span: 4, offset: 4 }}>
        <Link to='/create-event'>
    <Button variant="success" size="lg">
   Create events
  </Button>
        </Link>
                <Link to='/events'>
    <Button variant="primary" size="lg">
View Current events  
</Button>   
        </Link>

 </Col>

  </Row>
</Container>
        </> 
    )

    
}



export default Home;