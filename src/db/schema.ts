import { drizzle } from 'drizzle-orm/d1'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),

  completed: integer('completed', { mode: 'boolean' }).default(false),
})


export const getDb = (d1: D1Database) => drizzle(d1);