import React, { useState } from "react";
import { Card, Badge, Button, Collapse } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
const Job = ({ job }) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="mt-4 mb-4">
      <Card.Body>
        <div className="d-flex justfy-content-between">
          <div>
            <Card.Title>
              {job.title} -{" "}
              <span className="text-muted font-weight-light">
                {job.company}
              </span>
            </Card.Title>
            <Card.Subtitle className="text-muted mb-2">
              {new Date(job.created_at).toLocaleDateString()}
            </Card.Subtitle>
            <Badge variant="primary">{job.type}</Badge> &nbsp;
            <Badge variant="secondary">{job.location}</Badge>
            <div style={{ wordBreak: "break-all" }}>
              <ReactMarkdown>{job.how_to_apply}</ReactMarkdown>
            </div>
          </div>
          <img
            src={job.company_logo}
            alt={job.company}
            className="d-sm-none d-md-block"
            height="50"
          />
        </div>
      </Card.Body>
      <Card.Text>
        <Button
          className="m-4"
          variant="primary"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          {open ? "Hide Details" : "View Details"}
        </Button>
      </Card.Text>
      <Collapse in={open}>
        <div className="m-4">
          <ReactMarkdown source={job.description} />
        </div>
      </Collapse>
    </Card>
  );
};

export default Job;
