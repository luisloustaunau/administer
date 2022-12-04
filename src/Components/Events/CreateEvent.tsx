import { Button, Dropdown, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import AutoComplete from "react-google-autocomplete";
import { Inputs, Hosts, listOfHosts } from "./types";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateEvent = () => {
  const [isBuisness, setIsBuissness] = useState(true);
  const [inputFile, setInputFile] = useState([]);
  const [address, setAddress] = useState(undefined);
  const [uuid, setUuid] = useState("");
  const [actualDate, setDate] = useState<Date>();
  const redirect = useNavigate();

  useEffect(() => {
    setAddress(undefined);
  }, [isBuisness]);

  const [eventInfo, setEventinfo] = useState<Inputs>({
    title: "",
    host: Hosts.None,
    date: "",
    time: "",
    description: "",
    free: false,
    cost: 0,
  });

  const { title, host, time, description, free, cost, date } = eventInfo;
  const handleTitle = (e: { target: { value: any } }) => {
    setEventinfo({
      ...eventInfo,
      title: e.target.value,
    });
  };

  const handleAdress = (place: any) => {
    console.log(place);
    setAddress(place);
  };

  const handleHost = (host: any) => {
    setEventinfo({
      ...eventInfo,
      host: host,
    });
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setInputFile(e.target.files);
  };

  const handleSubmit = async (e: any) => {
    let uuids = window.self.crypto.randomUUID();
    setUuid(uuids);
    e.preventDefault();
    let fileLength = inputFile.length;
    //Make new API CALL
    while (fileLength !== 0) {
      await axios
        .post(
          `/-profile-image?fileName=eventImage${fileLength}&bucketName=event-images-container&subFolder=${uuid}`,
          null
        )
        // eslint-disable-next-line no-loop-func
        .then((response) => {
          // Getting the url from response
          const url = response.data.fileUploadURL;
          let data = inputFile[fileLength - 1];
          axios
            .put(url, data, {
              headers: { "Content-Type": "multipart/form-data" },
            })
            .catch((e) => {
              return console.log(e);
            });
        })
        .catch((e) => {
          return console.log(e);
        });

      fileLength--;
    }

    await axios
      .post("/-create-event", {
        address,
        uuid,
        title,
        date,
        host,
        time,
        description,
        free,
        cost,
      })
      .then(() => {
        toast.success("Event created!", { theme: "colored" });
        redirect("/");
      })
      .catch((e) => {
        toast.error("Failed to create event!", { theme: "colored" });
        console.log("delete " + uuid + " from s3 " + e);
      });
  };

  const handleDescription = (e: any) => {
    setEventinfo({
      ...eventInfo,
      description: e.target.value,
    });
  };

  const handleTime = (e: any) => {
    setEventinfo({
      ...eventInfo,
      time: e.target.value,
    });
  };

  const handleDate = (e: string) => {
    setEventinfo({
      ...eventInfo,
      date: e,
    });
  };

  const handleChecked = () => {
    setEventinfo({
      ...eventInfo,
      free: !eventInfo.free,
      cost: 0,
    });
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div style={{ width: "50%", margin: "auto", display: "block" }}>
        <Button variant="info">
          <Link to="/">HOME</Link>
        </Button>

        <div
          style={{ margin: "auto", display: "flex", justifyContent: "center" }}
        >
          <br></br>
          <h1>Create an event</h1>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Event title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter title"
              onChange={(e) => handleTitle(e)}
            />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
          ></Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Buissness"
              onChangeCapture={() => setIsBuissness(!isBuisness)}
            />
          </Form.Group>
          <>
            <div hidden={isBuisness}>
              <Form.Label>Event Buissness Address</Form.Label>
              <br />
              <AutoComplete
                apiKey={process.env.REACT_APP_API?.slice(
                  0,
                  process.env.REACT_APP_API.length - 1
                ).replaceAll('"', "")}
                onPlaceSelected={(place) =>
                  handleAdress(place.formatted_address)
                }
                style={{ width: "100%" }}
                options={{
                  fields: ["formatted_address", "icon", "name"],
                  componentRestrictions: { country: "us" },
                  strictBounds: true,
                  types: ["establishment"],
                }}
              />
            </div>
          </>
          <>
            <div hidden={!isBuisness}>
              <Form.Label>Event Specific Address</Form.Label>
              <br />
              <AutoComplete
                apiKey={process.env.REACT_APP_API?.slice(
                  0,
                  process.env.REACT_APP_API.length - 1
                ).replaceAll('"', "")}
                onPlaceSelected={(place) =>
                  handleAdress(place.formatted_address)
                }
                style={{ width: "100%" }}
                options={{
                  fields: ["formatted_address", "icon", "name"],
                  componentRestrictions: { country: "us" },
                  strictBounds: true,
                  types: ["address"],
                }}
              />
            </div>
          </>
          <Dropdown>
            <br />
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              aria-required
            >
              host
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {listOfHosts.map((host) => {
                return (
                  <Dropdown.Item value={host} onClick={() => handleHost(host)}>
                    {host}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <br />
          <Form.Label>Current Host: {eventInfo.host}</Form.Label>
          <br />
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Time</Form.Label>
            <Form.Control
              required
              type="time"
              onChange={(e) => handleTime(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Date</Form.Label>
            <DatePicker
              onChange={(e) => {
                setDate(e || undefined);
                handleDate(e?.toDateString().toString() || "");
              }}
              selected={actualDate}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="any">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe event"
              onChange={(e) => handleDescription(e)}
            />
          </Form.Group>
          {inputFile === null || inputFile.length === 0 ? (
            ""
          ) : (
            <img
              src={URL.createObjectURL(inputFile[0])}
              style={{ width: "500px", height: "auto" }}
            />
          )}

          <Form.Control
            type="file"
            onChange={handleUpload}
            placeholder="Describe event"
            multiple
          />
          <Form.Control type="submit" />
          <br />
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              label="Free"
              onChange={() => handleChecked()}
            />
          </Form.Group>
          {!eventInfo.free ? (
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Cost</Form.Label>
              <Form.Control type="number" placeholder="Enter cost" />
            </Form.Group>
          ) : (
            ""
          )}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreateEvent;
