import type { NextFunction, Request, RequestHandler, Response } from 'express'
import { ZodError, type ZodIssue, type ZodTypeAny } from 'zod'

const sources = ['params', 'query', 'body'] as const

type RequestSource = (typeof sources)[number]

export function validate(schemas: Partial<Record<RequestSource, ZodTypeAny>>): RequestHandler {
  return (request: Request, _response: Response, next: NextFunction) => {
    const issues: ZodIssue[] = []

    for (const source of sources) {
      const schema = schemas[source]

      if (!schema) {
        continue
      }

      const result = schema.safeParse(request[source])

      if (!result.success) {
        issues.push(...result.error.issues)
        continue
      }

      if (source === 'query') {
        Object.defineProperty(request, 'query', {
          value: result.data,
          writable: true,
          configurable: true,
        })
      } else {
        request[source] = result.data
      }
    }

    if (issues.length > 0) {
      next(new ZodError(issues))
      return
    }

    next()
  }
}
