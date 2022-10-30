import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  interface User {
    fullname: String;
    user_email: String;
    user_name: String;
    dateofbirth: String;
  }

  const fetchUsers = async () => {
    const response = await axios
      .get("/-all-users")
      .then((res) => res.data)
      .catch((e) => {
        console.log(e);
      });
    setUsers(response.users.Items);
  };

  const deleteUser = async (email: String) => {
    await axios
      .delete(`/-delete-user?email=${email}`)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.log(e);
      });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Container>
        <h1>Administer Users</h1>
      </Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full name</th>
            <th>Date of birth</th>
            <th>email</th>
            <th>Username</th>
          </tr>
        </thead>
        {users.map((user: User) => {
          return (
            <tbody>
              <tr>
                <td>{user.fullname}</td>
                <td>{user.dateofbirth}</td>
                <td>{user.user_email}</td>
                <td>{user.user_name}</td>
                <td>
                  <Button
                    onClick={() => deleteUser(user.user_name)}
                    variant={"danger"}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </>
  );
};

export default ViewUsers;
