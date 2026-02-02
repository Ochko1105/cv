import { drizzle } from 'drizzle-orm/d1';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Cloudflare-ийн төрлүүдийг импортлох
import type { D1Database } from '@cloudflare/workers-types';

export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
});

export const getDb = (d1: D1Database) => drizzle(d1);