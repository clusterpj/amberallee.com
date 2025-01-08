import { pgTable, uuid, serial, text, timestamp, integer, boolean, varchar, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const orderStatusEnum = pgEnum('order_status', ['pending', 'processing', 'completed', 'failed']);
export const userRoleEnum = pgEnum('user_role', ['admin', 'customer']);

// Books Table
export const books = pgTable('books', {
  id: uuid('id').primaryKey().default('gen_random_uuid()'), // Use uuid instead of serial
  title: text('title').notNull(),
  description: text('description'),
  amazon_link: text('amazon_link'),
  published_date: timestamp('published_date'), // Change to timestamp with time zone
  cover_image_url: text('cover_image_url'),
  price: integer('price').default(0), // Set default value to 0
  categories: text('categories').array().default([]), // Add categories field
  purchase_now_button: text('purchase_now_button').default(''), // Add purchase_now_button field
  series: text('series').default(''), // Add series field
  book_number: integer('book_number').default(0), // Add book_number field
  teasers: text('teasers').array().default([]), // Add teasers field
  tropes: text('tropes').array().default([]), // Ensure tropes has a default value
  corebill_item_id: text('corebill_item_id'),
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at'),
  is_published: boolean('is_published').default(false),
  series_order: integer('series_order'),
});

// Blog Posts Table
export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().default('gen_random_uuid()'), // Use uuid instead of serial
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  featured_image: text('featured_image'),
  cover_image_url: text('cover_image_url'),
  published_at: timestamp('published_at', { withTimezone: true }), // Change to timestamp with time zone
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(), // Set default value for created_at
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(), // Set default value for updated_at
  author_id: uuid('author_id').notNull(), // Ensure author_id is uuid
  is_published: boolean('is_published').default(false),
});

// Events Table
export const events = pgTable('events', {
  id: uuid('id').primaryKey().default('gen_random_uuid()'), // Use uuid instead of serial
  title: text('title').notNull(),
  description: text('description'),
  date: timestamp('date').notNull(), // Change to timestamp with time zone
  time: text('time'),
  location: text('location'),
  virtual_link: text('virtual_link'),
  is_virtual: boolean('is_virtual').default(false),
  registration_link: text('registration_link'), // Add registration_link field
  image_url: text('image_url'), // Add image_url field
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(), // Set default value for updated_at
});

// Users Table
export const users = pgTable('users', {
  id: uuid('id').primaryKey(), // Use uuid instead of serial
  email: text('email').notNull().unique(), // Change to text
  name: text('name'),
  role: text('role').default('customer'), // Change to text
  encrypted_password: text('encrypted_password'), // Add encrypted_password field
  email_confirmed_at: timestamp('email_confirmed_at'), // Add email_confirmed_at field
  invited_at: timestamp('invited_at'), // Add invited_at field
  confirmation_token: text('confirmation_token'), // Add confirmation_token field
  confirmation_sent_at: timestamp('confirmation_sent_at'), // Add confirmation_sent_at field
  recovery_token: text('recovery_token'), // Add recovery_token field
  recovery_sent_at: timestamp('recovery_sent_at'), // Add recovery_sent_at field
  email_change_token_new: text('email_change_token_new'), // Add email_change_token_new field
  email_change: text('email_change'), // Add email_change field
  email_change_sent_at: timestamp('email_change_sent_at'), // Add email_change_sent_at field
  last_sign_in_at: timestamp('last_sign_in_at'), // Add last_sign_in_at field
  raw_app_meta_data: text('raw_app_meta_data').default('{}'), // Add raw_app_meta_data field
  raw_user_meta_data: text('raw_user_meta_data').default('{}'), // Add raw_user_meta_data field
  is_super_admin: boolean('is_super_admin').default(false), // Add is_super_admin field
  created_at: timestamp('created_at').defaultNow(),
  updated_at: timestamp('updated_at').defaultNow(), // Set default value for updated_at
  phone: text('phone'), // Add phone field
  phone_confirmed_at: timestamp('phone_confirmed_at'), // Add phone_confirmed_at field
  phone_change: text('phone_change').default(''), // Add phone_change field
  phone_change_token: text('phone_change_token').default(''), // Add phone_change_token field
  phone_change_sent_at: timestamp('phone_change_sent_at'), // Add phone_change_sent_at field
  confirmed_at: timestamp('confirmed_at'), // Add confirmed_at field
  banned_until: timestamp('banned_until'), // Add banned_until field
  reauthentication_token: text('reauthentication_token').default(''), // Add reauthentication_token field
  reauthentication_sent_at: timestamp('reauthentication_sent_at'), // Add reauthentication_sent_at field
  is_sso_user: boolean('is_sso_user').default(false), // Add is_sso_user field
  deleted_at: timestamp('deleted_at'), // Add deleted_at field
  is_anonymous: boolean('is_anonymous').default(false), // Add is_anonymous field
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
export const blogPostsRelations = relations(blogPosts, ({ one }) => ({
  author: one(users, {
    fields: [blogPosts.author_id],
    references: [users.id],
  }),
}));
