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
  amazonLink: text('amazon_link'),
  releaseDate: date('release_date'),
  coverImage: text('cover_image'),
  tropes: text('tropes').array(),
  series: text('series'),
  corebillItemId: text('corebill_item_id'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  isPublished: boolean('is_published').default(false),
  seriesOrder: integer('series_order'),
});

// Blog Posts Table
export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  featuredImage: text('featured_image'),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
  authorId: integer('author_id').notNull(),
  isPublished: boolean('is_published').default(false),
});

// Events Table
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  date: date('date').notNull(),
  time: text('time'),
  location: text('location'),
  virtualLink: text('virtual_link'),
  isVirtual: boolean('is_virtual').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

// Users Table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: text('name'),
  role: userRoleEnum('role').default('customer'),
  passwordHash: text('password_hash'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

// Orders Table
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  status: orderStatusEnum('status').default('pending'),
  total: integer('total').notNull(),
  corebillOrderId: text('corebill_order_id'),
  shippingAddress: text('shipping_address'),
  billingAddress: text('billing_address'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});

// Order Items Table
export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull(),
  bookId: integer('book_id').notNull(),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Newsletter Subscribers Table
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  isVerified: boolean('is_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  unsubscribedAt: timestamp('unsubscribed_at'),
});

// Relations
export const booksRelations = relations(books, ({ many }) => ({
  orderItems: many(orderItems),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  book: one(books, {
    fields: [orderItems.bookId],
    references: [books.id],
  }),
}));

export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
}));