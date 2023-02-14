import { Context } from '../../deps.ts'

export const home = (ctx: Context) => {
  ctx.response.status = 200
  ctx.response.body = 'Hello from oak in deno!'
}