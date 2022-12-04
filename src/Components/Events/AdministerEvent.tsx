import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";

const AdministerEvent = () => {
  interface Event {
    cost: number;
    description: string;
    free: boolean;
    host: string;
    time: string;
    title: string;
    uuid: string;
    date: string;
    address: string;
  }

  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const eventsResult = await axios
      .get("/-all-events")
      .then((res) => res.data.events.Items)
      .catch((e) => {
        console.log(e);
      });
    setEvents(eventsResult);
  };

  const deleteEvent = async (uuid: string) => {
    await axios
      .delete(`/delete-event?uuid=${uuid}`)
      .then((res) => res)
      .catch((e) => console.log(e));
    fetchEvents();
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Container>
        <h1>Administer Events</h1>
      </Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Description</th>
            <th>Host</th>
            <th>Cost</th>
            <th>Time</th>
            <th>Address</th>
          </tr>
        </thead>
        {events.map((event: Event) => {
          return (
            <tbody>
              <tr>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>{event.description}</td>
                <td>{event.host}</td>
                <td>{event.cost}</td>
                <td>{event.time}</td>
                <td>{event.address}</td>
                <td>
                  <Button
                    onClick={() => deleteEvent(event.uuid)}
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

export default AdministerEvent;
