import { createYoga } from 'graphql-yoga'
import { schema } from '@/graphql/schema'
import { getRequestContext } from '@cloudflare/next-on-pages'

export const runtime = 'edge';

const { handleRequest } = createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response }
})

export async function GET(request: Request) {
  const context = { env: getRequestContext().env }
  return handleRequest(request, context)
}

export async function POST(request: Request) {
  const context = { env: getRequestContext().env }
  return handleRequest(request, context)
}