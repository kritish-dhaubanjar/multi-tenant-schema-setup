import * as Exceptions from '../constants/errors.constant'

export default {
  [Exceptions.ExpectationException]: {
    1000: {
      status: 417,
      message: '417 Expectation Failed',
      details:
        'The server cannot meet the requirements of the Expect request-header X-TENANT-ID field.',
    },
  },
  [Exceptions.ModelNotFoundException]: {
    2000: {
      status: 404,
      message: '404 Not Found',
      details: 'The requested resource could not be found but may be available in the future.',
    },
  },
  [Exceptions.FileNotFoundException]: {
    3000: {
      status: 404,
      message: '404 Not Found',
      details: 'The requested resource could not be found but may be available in the future.',
    },
  },
  [Exceptions.UnprocessableEntityException]: {
    4000: {
      status: 422,
      message: '422 Unprocessable Entity',
      details: 'The request was well-formed but was unable to be followed due to semantic errors.',
    },
  },
}
