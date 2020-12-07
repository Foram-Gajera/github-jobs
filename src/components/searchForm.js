import React from "react";
import { Form } from "react-bootstrap";

const searchForm = ({ params, onParamsChange }) => {
  return (
    <Form className="mb-4">
      <Form.Row>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={onParamsChange}
            value={params.description}
            name="description"
            type="text"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control
            onChange={onParamsChange}
            value={params.location}
            name="location"
            type="text"
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            onChange={onParamsChange}
            value={params.full_time}
            name="full_time"
            id="full_time"
            label="Only Full time"
            type="checkbox"
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default searchForm;
