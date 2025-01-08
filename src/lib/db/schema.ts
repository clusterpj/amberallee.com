import { pgTable, uuid, text, timestamp, integer, boolean, date } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';

// Books Table
export const books = pgTable('books', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  description: text('description'),
  amazon_link: text('amazon_link'),
  published_date: date('published_date'),
  cover_image_url: text('cover_image_url'),
  price: integer('price').default(0),
  categories: text('categories').array().default([]),
  purchase_now_button: text('purchase_now_button').default(''),
  series: text('series').default(''),
  book_number: integer('book_number').default(0),
  teasers: text('teasers').array().default([]),
  tropes: text('tropes').array().default([]),
  corebill_item_id: text('corebill_item_id'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  is_published: boolean('is_published').default(false),
  series_order: integer('series_order')
});

// Blog Posts Table
export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  slug: text('slug'),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  featured_image: text('featured_image'),
  cover_image_url: text('cover_image_url'),
  published_at: timestamp('published_at', { withTimezone: true }),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  author_id: uuid('author_id').notNull(),
  is_published: boolean('is_published').default(false)
});

// Events Table
export const events = pgTable('events', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  description: text('description'),
  date: timestamp('date', { withTimezone: true }).notNull(),
  time: text('time'),
  location: text('location'),
  virtual_link: text('virtual_link'),
  is_virtual: boolean('is_virtual').default(false),
  registration_link: text('registration_link'),
  image_url: text('image_url'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow()
});

// Users Table
export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  role: text('role').default('customer'),
  encrypted_password: text('encrypted_password'),
  email_confirmed_at: timestamp('email_confirmed_at', { withTimezone: true }),
  invited_at: timestamp('invited_at', { withTimezone: true }),
  confirmation_token: text('confirmation_token'),
  confirmation_sent_at: timestamp('confirmation_sent_at', { withTimezone: true }),
  recovery_token: text('recovery_token'),
  recovery_sent_at: timestamp('recovery_sent_at', { withTimezone: true }),
  email_change_token_new: text('email_change_token_new'),
  email_change: text('email_change'),
  email_change_sent_at: timestamp('email_change_sent_at', { withTimezone: true }),
  last_sign_in_at: timestamp('last_sign_in_at', { withTimezone: true }),
  raw_app_meta_data: text('raw_app_meta_data').default('{}'),
  raw_user_meta_data: text('raw_user_meta_data').default('{}'),
  is_super_admin: boolean('is_super_admin').default(false),
  created_at: timestamp('created_at', { withTimezone: true }).default(sql`timezone('utc'::text, now())`),
  updated_at: timestamp('updated_at', { withTimezone: true }).default(sql`timezone('utc'::text, now())`),
  phone: text('phone'),
  phone_confirmed_at: timestamp('phone_confirmed_at', { withTimezone: true }),
  phone_change: text('phone_change').default(''),
  phone_change_token: text('phone_change_token').default(''),
  phone_change_sent_at: timestamp('phone_change_sent_at', { withTimezone: true }),
  confirmed_at: timestamp('confirmed_at', { withTimezone: true }),
  banned_until: timestamp('banned_until', { withTimezone: true }),
  reauthentication_token: text('reauthentication_token').default(''),
  reauthentication_sent_at: timestamp('reauthentication_sent_at', { withTimezone: true }),
  is_sso_user: boolean('is_sso_user').default(false),
  deleted_at: timestamp('deleted_at', { withTimezone: true }),
  is_anonymous: boolean('is_anonymous').default(false)
});

// Newsletter Subscribers Table
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  email: text('email').notNull().unique(),
  is_verified: boolean('is_verified').default(false),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  unsubscribed_at: timestamp('unsubscribed_at', { withTimezone: true })
});

// Relations
export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.author_id],
    references: [users.id],
  }),
}));
