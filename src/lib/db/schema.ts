import { pgTable, serial, text, timestamp, date, integer, boolean, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const orderStatusEnum = pgEnum('order_status', ['pending', 'processing', 'completed', 'failed']);
export const userRoleEnum = pgEnum('user_role', ['admin', 'customer']);

// Books Table
export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  amazon_link: text('amazon_link'),
  published_date: date('published_date'),
  cover_image_url: text('cover_image_url'),
  price: integer('price'),
  tropes: text('tropes').array(),
  series: text('series'),
  corebill_item_id: text('corebill_item_id'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at'),
  is_published: boolean('is_published').default(false),
  series_order: integer('series_order'),
});

// Blog Posts Table
export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  featured_image: text('featured_image'),
  published_at: timestamp('published_at'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at'),
  author_id: integer('author_id').notNull(),
  is_published: boolean('is_published').default(false),
});

// Events Table
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  date: date('date').notNull(),
  time: text('time'),
  location: text('location'),
  virtual_link: text('virtual_link'),
  is_virtual: boolean('is_virtual').default(false),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at'),
});

// Users Table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: text('name'),
  role: userRoleEnum('role').default('customer'),
  password_hash: text('password_hash'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at'),
});

// Orders Table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull(),
  status: orderStatusEnum('status').default('pending'),
  total: integer('total').notNull(),
  corebill_order_id: text('corebill_order_id'),
  shipping_address: text('shipping_address'),
  billing_address: text('billing_address'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at'),
});

// Order Items Table
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id').notNull(),
  book_id: integer('book_id').notNull(),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
  created_at: timestamp('created_at').defaultNow(),
});

// Newsletter Subscribers Table
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  is_verified: boolean('is_verified').default(false),
  created_at: timestamp('created_at').defaultNow(),
  unsubscribed_at: timestamp('unsubscribed_at'),
});

// Relations
export const booksRelations = relations(books, ({ many }) => ({
  orderItems: many(orderItems),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.user_id],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.order_id],
    references: [orders.id],
  }),
  book: one(books, {
    fields: [orderItems.book_id],
    references: [books.id],
  }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.author_id],
    references: [users.id],
  }),
}));
