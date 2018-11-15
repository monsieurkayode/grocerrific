import { STATUS_CODES } from 'http';

export default (statusCode, err, res) => res
  .status(statusCode).send({
    status: STATUS_CODES[statusCode],
    message: err
  });
