import { Context, helpers } from '../../deps.ts'

const users: any[] = []

export const getAll = (ctx: Context) => {
  ctx.response.status = 200
  ctx.response.body = users
}

export const create = async (ctx: Context) => {
  const newUser = await ctx.request.body().value
  newUser.id = users.length + 1
  users.push(newUser)
  ctx.response.status = 201
  ctx.response.body = newUser
}

export const getOne = (ctx: Context) => {
  const { userId } = helpers.getQuery(ctx, { mergeParams: true })
  const user = users.find(u => u.id === Number(userId))
  if (!user) {
    ctx.response.status = 404
    ctx.response.body = 'User not found'
  } else {
    ctx.response.status = 200
    ctx.response.body = user
  }
}