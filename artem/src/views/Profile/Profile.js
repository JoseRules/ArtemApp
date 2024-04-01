import { useUser } from "../../store/UserContext";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ProfileContainer, ProfileCard, CardHeading, Image, Title, LeftColumn } from "./Profile.styled";
import Layout from "../../components/Layout/Layout";

const Profile = () => {
  const userData = useUser();
  const { type, firstname, lastname, email, phoneNumber, profilePicUrl, dateOfBirth, gender, chronicalDeseases,
    allergies, weight, height, specialty, npi, location, experience, languages, price } = userData.userInfo;
  return (
    <Layout>
      <ProfileContainer>
        <ProfileCard>
          <CardHeading>
            <Title>{`${firstname} ${lastname}`}</Title>
            <Image variant="top" src={profilePicUrl ? profilePicUrl : "https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg"} />
          </CardHeading>
          <Card.Body>
            <Card.Text>
              <Row>
                <Col>
                  <Table>
                    <tbody>
                      <tr>
                        <LeftColumn>Email</LeftColumn>
                        <td>{email}</td>
                      </tr>
                      <tr>
                        <LeftColumn>DOB</LeftColumn>
                        <td>{dateOfBirth}</td>
                      </tr>
                      <tr>
                        <LeftColumn>Cell Phone</LeftColumn>
                        <td>{phoneNumber}</td>
                      </tr>
                      <tr>
                        <LeftColumn>Gender</LeftColumn>
                        <td>{gender}</td>
                      </tr>
                      {type === 'doctor' &&
                        <tr>
                          <LeftColumn>Location</LeftColumn>
                          <td>{location}</td>
                        </tr>
                      }


                    </tbody>
                  </Table>
                </Col>
                <Col>
                  {type === 'doctor' ? <Table>
                    <tbody>
                      <tr>
                        <LeftColumn>Specialty</LeftColumn>
                        <td>{specialty}</td>
                      </tr>
                      <tr>
                        <LeftColumn>Languages</LeftColumn>
                        <td>{languages}</td>
                      </tr>
                      <tr>
                        <LeftColumn>NPI</LeftColumn>
                        <td>{npi}</td>
                      </tr>
                      <tr>
                        <LeftColumn>Experience</LeftColumn>
                        <td>{experience}</td>
                      </tr>
                      <tr>
                        <LeftColumn>Price</LeftColumn>
                        <td>{price}</td>
                      </tr>
                    </tbody>
                  </Table> :
                    <Table>
                      <tbody>
                        <tr>
                          <LeftColumn>Deseases</LeftColumn>
                          <td>{chronicalDeseases}</td>
                        </tr>
                        <tr>
                          <LeftColumn>Allergies</LeftColumn>
                          <td>{allergies}</td>
                        </tr>
                        <tr>
                          <LeftColumn>Height</LeftColumn>
                          <td>{height}</td>
                        </tr>
                        <tr>
                          <LeftColumn>Weight</LeftColumn>
                          <td>{weight}</td>
                        </tr>
                      </tbody>
                    </Table>}
                </Col>

              </Row>
            </Card.Text>

          </Card.Body>
        </ProfileCard>
      </ProfileContainer>
    </Layout>
  )
}

export default Profile;