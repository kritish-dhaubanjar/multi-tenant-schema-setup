import { convertObjectKeysToCamelCase } from './object'

describe('convertObjectKeysToCamelCase', () => {
  it('should convert all object keys to camel case', () => {
    const obj = {
      first_name: 'John',
      last_name: 'Doe',
      age: 30,
    }

    const result = convertObjectKeysToCamelCase(obj)

    expect(result).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
    })
  })

  it('should handle empty objects', () => {
    const obj = {}

    const result = convertObjectKeysToCamelCase(obj)

    expect(result).toEqual({})
  })

  it('should handle key for only top level object but not in nested objects', () => {
    const obj = {
      user_info: {
        first_name: 'John',
        last_name: 'Doe',
      },
      address: {
        street_name: '123 Main St',
        city: 'New York',
      },
    }

    const result = convertObjectKeysToCamelCase(obj)

    expect(result).toEqual({
      userInfo: {
        first_name: 'John',
        last_name: 'Doe',
      },
      address: {
        street_name: '123 Main St',
        city: 'New York',
      },
    })
  })

  it('should handle objects with nested arrays', () => {
    const obj = {
      users: [
        {
          first_name: 'John',
          last_name: 'Doe',
        },
        {
          first_name: 'Jane',
          last_name: 'Smith',
        },
      ],
    }

    const result = convertObjectKeysToCamelCase(obj)

    expect(result).toEqual({
      users: [
        {
          first_name: 'John',
          last_name: 'Doe',
        },
        {
          first_name: 'Jane',
          last_name: 'Smith',
        },
      ],
    })
  })

  it('should handle objects with null and undefined values', () => {
    const obj = {
      first_name: null,
      last_name: undefined,
      age: 30,
    }

    const result = convertObjectKeysToCamelCase(obj)

    expect(result).toEqual({
      firstName: null,
      lastName: undefined,
      age: 30,
    })
  })
})
