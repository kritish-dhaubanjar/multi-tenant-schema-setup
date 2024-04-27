import en_US from './en_US.errors'

export default class Exception extends Error {
  public code: number
  public status: number
  public details: string

  constructor(name: string, code: number) {
    super()
    this.name = name
    this.code = code

    // @ts-ignore-next-line
    const { status, message, details } = en_US[name][code] ?? {}

    this.status = status
    this.message = message
    this.details = details
  }
}
