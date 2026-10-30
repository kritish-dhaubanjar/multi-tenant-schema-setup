import * as Exceptions from '@/constants/errors.constant'

export default {
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
