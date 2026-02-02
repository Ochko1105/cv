import { createSchema } from 'graphql-yoga'
import { drizzle } from 'drizzle-orm/d1'
import { todos } from '@/db/schema'
import { eq } from 'drizzle-orm'

interface Env {
  DB: D1Database;
}

export const schema = createSchema<{ env: Env }>({
    
  typeDefs: /* GraphQL */ `
    type Todo {
      id: Int!
      title: String!
      completed: Boolean!
    }

    type Query {
      todos: [Todo!]!
    }

    type Mutation {
      addTodo(title: String!): Todo!
      toggleTodo(id: Int!): Todo!
      deleteTodo(id: Int!): Boolean
    }
  `,
  resolvers: {
    Query: {
      todos: async (_, __, { env }) => {
        const db = drizzle(env.DB);
        const result = await db.select().from(todos).all();
        console.log("D1 Binding status:", !!env.DB);
       
        return result.map(t => ({
          ...t,
          completed: !!t.completed 
        }));
      },
    },
    Mutation: {
      addTodo: async (_, { title }, { env }) => {
        const db = drizzle(env.DB);
        const result = await db.insert(todos)
          .values({ 
            title: title, 
            completed: false 
          })
          .returning();
        
        return {
          ...result[0],
          completed: !!result[0].completed
        };
      },
      toggleTodo: async (_, { id }, { env }) => {
        const db = drizzle(env.DB);
        
        const current = await db.select()
          .from(todos)
          .where(eq(todos.id, id))
          .get();

        if (!current) throw new Error("Todo олдсонгүй");

        const newStatus = !current.completed; 

        const result = await db.update(todos)
          .set({ completed: newStatus })
          .where(eq(todos.id, id))
          .returning();

        return {
          ...result[0],
          completed: !!result[0].completed
        };
      },
      deleteTodo: async (_, { id }, { env }) => {
        const db = drizzle(env.DB);
        try {
          await db.delete(todos).where(eq(todos.id, id));
          return true;
        } catch (e) {
          console.error(e);
          return false;
        }
      }
    }
  },
  
})