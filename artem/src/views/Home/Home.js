import Carousel from 'react-bootstrap/Carousel';
import hospital1 from '../../assets/images/hospital1.jpg';
import hospital2 from '../../assets/images/hospital2.jpeg';
import hospital3 from '../../assets/images/hospital3.jpg';
import { Image } from './Home.styled';
import Layout from '../../components/Layout/Layout';

const Home = () => {
  return (
    <Layout>
      <Carousel>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            src={hospital1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>We are specialized</h3>
            <p>You'll get someone who knows what they're doing.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            src={hospital2}
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>We care</h3>
            <p>You'll get personalized attention</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-100"
            src={hospital3}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>We are human</h3>
            <p>You are important to us, we will treat you humanely.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Layout>
  )
}

export default Home;