[
  {
    "table_name": "newsletter_subscribers",
    "table_type": "BASE TABLE",
    "description": null
  },
  {
    "table_name": "users",
    "table_type": "BASE TABLE",
    "description": null
  },
  {
    "table_name": "books",
    "table_type": "BASE TABLE",
    "description": null
  },
  {
    "table_name": "blog_posts",
    "table_type": "BASE TABLE",
    "description": null
  },
  {
    "table_name": "events",
    "table_type": "BASE TABLE",
    "description": null
  }
]

[
  {
    "table_name": "blog_posts",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "ordinal_position": 1,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "blog_posts",
    "column_name": "title",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "ordinal_position": 2,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "blog_posts",
    "column_name": "content",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "ordinal_position": 3,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "blog_posts",
    "column_name": "excerpt",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 4,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "blog_posts",
    "column_name": "cover_image_url",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 5,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "blog_posts",
    "column_name": "published_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 6,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "blog_posts",
    "column_name": "author_id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "ordinal_position": 7,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "blog_posts",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": "now()",
    "ordinal_position": 8,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "blog_posts",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": "now()",
    "ordinal_position": 9,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "blog_posts",
    "column_name": "slug",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 10,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "blog_posts",
    "column_name": "featured_image",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 11,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "blog_posts",
    "column_name": "is_published",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "ordinal_position": 12,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "books",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "ordinal_position": 1,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "books",
    "column_name": "title",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "ordinal_position": 2,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "books",
    "column_name": "description",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 3,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "books",
    "column_name": "cover_image_url",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 4,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "books",
    "column_name": "amazon_link",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 5,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "books",
    "column_name": "published_date",
    "data_type": "date",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 6,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "books",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": "now()",
    "ordinal_position": 7,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "books",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": "now()",
    "ordinal_position": 8,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "books",
    "column_name": "price",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "0",
    "ordinal_position": 9,
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "books",
    "column_name": "categories",
    "data_type": "ARRAY",
    "is_nullable": "YES",
    "column_default": "'{}'::text[]",
    "ordinal_position": 10,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "books",
    "column_name": "purchase_now_button",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "''::text",
    "ordinal_position": 11,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "books",
    "column_name": "series",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "''::text",
    "ordinal_position": 12,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "books",
    "column_name": "book_number",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": "0",
    "ordinal_position": 13,
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "books",
    "column_name": "teasers",
    "data_type": "ARRAY",
    "is_nullable": "YES",
    "column_default": "'{}'::text[]",
    "ordinal_position": 14,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "books",
    "column_name": "tropes",
    "data_type": "ARRAY",
    "is_nullable": "YES",
    "column_default": "'{}'::text[]",
    "ordinal_position": 15,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "books",
    "column_name": "corebill_item_id",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 16,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "books",
    "column_name": "is_published",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "ordinal_position": 17,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "books",
    "column_name": "series_order",
    "data_type": "integer",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 18,
    "character_maximum_length": null,
    "numeric_precision": 32,
    "numeric_scale": 0
  },
  {
    "table_name": "events",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "ordinal_position": 1,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "events",
    "column_name": "title",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "ordinal_position": 2,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "events",
    "column_name": "description",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 3,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "events",
    "column_name": "date",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": null,
    "ordinal_position": 4,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "events",
    "column_name": "location",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 5,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "events",
    "column_name": "registration_link",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 6,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "events",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": "now()",
    "ordinal_position": 7,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "events",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": "now()",
    "ordinal_position": 8,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "events",
    "column_name": "image_url",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 9,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "events",
    "column_name": "time",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 10,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "events",
    "column_name": "virtual_link",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 11,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "events",
    "column_name": "is_virtual",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "ordinal_position": 12,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "newsletter_subscribers",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": "gen_random_uuid()",
    "ordinal_position": 1,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "newsletter_subscribers",
    "column_name": "email",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "ordinal_position": 2,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "newsletter_subscribers",
    "column_name": "is_verified",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "ordinal_position": 3,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "newsletter_subscribers",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": "now()",
    "ordinal_position": 4,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "newsletter_subscribers",
    "column_name": "unsubscribed_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 5,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "id",
    "data_type": "uuid",
    "is_nullable": "NO",
    "column_default": null,
    "ordinal_position": 1,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "email",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": null,
    "ordinal_position": 2,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "role",
    "data_type": "text",
    "is_nullable": "NO",
    "column_default": "'customer'::text",
    "ordinal_position": 3,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "created_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": "timezone('utc'::text, now())",
    "ordinal_position": 4,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "updated_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "NO",
    "column_default": "timezone('utc'::text, now())",
    "ordinal_position": 5,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "name",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 6,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "encrypted_password",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 7,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "email_confirmed_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 8,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "invited_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 9,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "confirmation_token",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 10,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "confirmation_sent_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 11,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "recovery_token",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 12,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "recovery_sent_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 13,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "email_change_token_new",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 14,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "email_change",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 15,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "email_change_sent_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 16,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "last_sign_in_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 17,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "raw_app_meta_data",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'{}'::text",
    "ordinal_position": 18,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "raw_user_meta_data",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "'{}'::text",
    "ordinal_position": 19,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "is_super_admin",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "ordinal_position": 20,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "phone",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 21,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "phone_confirmed_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 22,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "phone_change",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "''::text",
    "ordinal_position": 23,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "phone_change_token",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "''::text",
    "ordinal_position": 24,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "phone_change_sent_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 25,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "confirmed_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 26,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "banned_until",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 27,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "reauthentication_token",
    "data_type": "text",
    "is_nullable": "YES",
    "column_default": "''::text",
    "ordinal_position": 28,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "reauthentication_sent_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 29,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "is_sso_user",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "ordinal_position": 30,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "deleted_at",
    "data_type": "timestamp with time zone",
    "is_nullable": "YES",
    "column_default": null,
    "ordinal_position": 31,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  },
  {
    "table_name": "users",
    "column_name": "is_anonymous",
    "data_type": "boolean",
    "is_nullable": "YES",
    "column_default": "false",
    "ordinal_position": 32,
    "character_maximum_length": null,
    "numeric_precision": null,
    "numeric_scale": null
  }
]


[
  {
    "tablename": "newsletter_subscribers",
    "indexname": "newsletter_subscribers_pkey",
    "indexdef": "CREATE UNIQUE INDEX newsletter_subscribers_pkey ON public.newsletter_subscribers USING btree (id)"
  },
  {
    "tablename": "newsletter_subscribers",
    "indexname": "newsletter_subscribers_email_key",
    "indexdef": "CREATE UNIQUE INDEX newsletter_subscribers_email_key ON public.newsletter_subscribers USING btree (email)"
  },
  {
    "tablename": "users",
    "indexname": "users_pkey",
    "indexdef": "CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id)"
  },
  {
    "tablename": "blog_posts",
    "indexname": "blog_posts_pkey",
    "indexdef": "CREATE UNIQUE INDEX blog_posts_pkey ON public.blog_posts USING btree (id)"
  },
  {
    "tablename": "blog_posts",
    "indexname": "blog_posts_slug_key",
    "indexdef": "CREATE UNIQUE INDEX blog_posts_slug_key ON public.blog_posts USING btree (slug)"
  },
  {
    "tablename": "books",
    "indexname": "books_pkey",
    "indexdef": "CREATE UNIQUE INDEX books_pkey ON public.books USING btree (id)"
  },
  {
    "tablename": "events",
    "indexname": "events_pkey",
    "indexdef": "CREATE UNIQUE INDEX events_pkey ON public.events USING btree (id)"
  }
]


[
  {
    "table_name": "refresh_tokens",
    "column_name": "session_id",
    "foreign_table_name": "sessions",
    "foreign_column_name": "id"
  },
  {
    "table_name": "users",
    "column_name": "id",
    "foreign_table_name": "users",
    "foreign_column_name": "id"
  },
  {
    "table_name": "blog_posts",
    "column_name": "author_id",
    "foreign_table_name": "users",
    "foreign_column_name": "id"
  },
  {
    "table_name": "mfa_factors",
    "column_name": "user_id",
    "foreign_table_name": "users",
    "foreign_column_name": "id"
  },
  {
    "table_name": "mfa_challenges",
    "column_name": "factor_id",
    "foreign_table_name": "mfa_factors",
    "foreign_column_name": "id"
  },
  {
    "table_name": "identities",
    "column_name": "user_id",
    "foreign_table_name": "users",
    "foreign_column_name": "id"
  },
  {
    "table_name": "objects",
    "column_name": "bucket_id",
    "foreign_table_name": "buckets",
    "foreign_column_name": "id"
  },
  {
    "table_name": "sessions",
    "column_name": "user_id",
    "foreign_table_name": "users",
    "foreign_column_name": "id"
  },
  {
    "table_name": "sso_domains",
    "column_name": "sso_provider_id",
    "foreign_table_name": "sso_providers",
    "foreign_column_name": "id"
  },
  {
    "table_name": "mfa_amr_claims",
    "column_name": "session_id",
    "foreign_table_name": "sessions",
    "foreign_column_name": "id"
  },
  {
    "table_name": "s3_multipart_uploads",
    "column_name": "bucket_id",
    "foreign_table_name": "buckets",
    "foreign_column_name": "id"
  },
  {
    "table_name": "saml_providers",
    "column_name": "sso_provider_id",
    "foreign_table_name": "sso_providers",
    "foreign_column_name": "id"
  },
  {
    "table_name": "saml_relay_states",
    "column_name": "flow_state_id",
    "foreign_table_name": "flow_state",
    "foreign_column_name": "id"
  },
  {
    "table_name": "saml_relay_states",
    "column_name": "sso_provider_id",
    "foreign_table_name": "sso_providers",
    "foreign_column_name": "id"
  },
  {
    "table_name": "one_time_tokens",
    "column_name": "user_id",
    "foreign_table_name": "users",
    "foreign_column_name": "id"
  },
  {
    "table_name": "s3_multipart_uploads_parts",
    "column_name": "bucket_id",
    "foreign_table_name": "buckets",
    "foreign_column_name": "id"
  },
  {
    "table_name": "s3_multipart_uploads_parts",
    "column_name": "upload_id",
    "foreign_table_name": "s3_multipart_uploads",
    "foreign_column_name": "id"
  }
]

[
  {
    "tablename": "books",
    "policyname": "Enable insert for authenticated users only",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "INSERT",
    "qual": null,
    "with_check": "(auth.role() = 'authenticated'::text)"
  },
  {
    "tablename": "books",
    "policyname": "Enable update for authenticated users only",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "UPDATE",
    "qual": "(auth.role() = 'authenticated'::text)",
    "with_check": null
  },
  {
    "tablename": "books",
    "policyname": "Enable delete for authenticated users only",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "DELETE",
    "qual": "(auth.role() = 'authenticated'::text)",
    "with_check": null
  },
  {
    "tablename": "users",
    "policyname": "Enable read access for authenticated users",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "SELECT",
    "qual": "(auth.role() = 'authenticated'::text)",
    "with_check": null
  },
  {
    "tablename": "users",
    "policyname": "Enable update for users based on id",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "UPDATE",
    "qual": "(auth.uid() = id)",
    "with_check": null
  },
  {
    "tablename": "users",
    "policyname": "Enable insert for authenticated users",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "INSERT",
    "qual": null,
    "with_check": "(auth.role() = 'authenticated'::text)"
  },
  {
    "tablename": "books",
    "policyname": "Public read access for books",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "SELECT",
    "qual": "true",
    "with_check": null
  },
  {
    "tablename": "books",
    "policyname": "Admin full access for books",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "ALL",
    "qual": "(EXISTS ( SELECT 1\n   FROM users\n  WHERE ((users.id = auth.uid()) AND (users.role = 'admin'::text))))",
    "with_check": null
  },
  {
    "tablename": "blog_posts",
    "policyname": "Public read access for published blog posts",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "SELECT",
    "qual": "((published_at IS NOT NULL) AND (published_at <= now()))",
    "with_check": null
  },
  {
    "tablename": "blog_posts",
    "policyname": "Admin full access for blog posts",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "ALL",
    "qual": "(EXISTS ( SELECT 1\n   FROM users\n  WHERE ((users.id = auth.uid()) AND (users.role = 'admin'::text))))",
    "with_check": null
  },
  {
    "tablename": "events",
    "policyname": "Public read access for events",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "SELECT",
    "qual": "true",
    "with_check": null
  },
  {
    "tablename": "events",
    "policyname": "Admin full access for events",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "ALL",
    "qual": "(EXISTS ( SELECT 1\n   FROM users\n  WHERE ((users.id = auth.uid()) AND (users.role = 'admin'::text))))",
    "with_check": null
  },
  {
    "tablename": "books",
    "policyname": "Enable read access for all users",
    "permissive": "PERMISSIVE",
    "roles": "{public}",
    "cmd": "SELECT",
    "qual": "true",
    "with_check": null
  }
]

[
  {
    "rolname": "pg_database_owner",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "pg_read_all_data",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "pg_write_all_data",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "pg_monitor",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "pg_read_all_settings",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "pg_read_all_stats",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "pg_stat_scan_tables",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "pg_read_server_files",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "pg_write_server_files",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "pg_execute_server_program",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "pg_signal_backend",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "pg_checkpoint",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "dashboard_user",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": true,
    "rolcreatedb": true,
    "rolcanlogin": false
  },
  {
    "rolname": "pgsodium_keyiduser",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "pgsodium_keyholder",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "pgsodium_keymaker",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "authenticated",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "anon",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "service_role",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  },
  {
    "rolname": "supabase_admin",
    "rolsuper": true,
    "rolinherit": true,
    "rolcreaterole": true,
    "rolcreatedb": true,
    "rolcanlogin": true
  },
  {
    "rolname": "postgres",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": true,
    "rolcreatedb": true,
    "rolcanlogin": true
  },
  {
    "rolname": "authenticator",
    "rolsuper": false,
    "rolinherit": false,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": true
  },
  {
    "rolname": "pgbouncer",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": true
  },
  {
    "rolname": "supabase_auth_admin",
    "rolsuper": false,
    "rolinherit": false,
    "rolcreaterole": true,
    "rolcreatedb": false,
    "rolcanlogin": true
  },
  {
    "rolname": "supabase_storage_admin",
    "rolsuper": false,
    "rolinherit": false,
    "rolcreaterole": true,
    "rolcreatedb": false,
    "rolcanlogin": true
  },
  {
    "rolname": "supabase_replication_admin",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": true
  },
  {
    "rolname": "supabase_read_only_user",
    "rolsuper": false,
    "rolinherit": true,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": true
  },
  {
    "rolname": "supabase_realtime_admin",
    "rolsuper": false,
    "rolinherit": false,
    "rolcreaterole": false,
    "rolcreatedb": false,
    "rolcanlogin": false
  }
]

[
  {
    "trigger_name": "tr_check_filters",
    "table_name": "realtime.subscription",
    "function_name": "realtime.subscription_check_filters",
    "tgtype": 23,
    "tgenabled": "O"
  },
  {
    "trigger_name": "key_encrypt_secret_trigger_raw_key",
    "table_name": "pgsodium.key",
    "function_name": "pgsodium.key_encrypt_secret_raw_key",
    "tgtype": 23,
    "tgenabled": "O"
  },
  {
    "trigger_name": "secrets_encrypt_secret_trigger_secret",
    "table_name": "vault.secrets",
    "function_name": "vault.secrets_encrypt_secret_secret",
    "tgtype": 23,
    "tgenabled": "O"
  },
  {
    "trigger_name": "on_auth_user_created",
    "table_name": "auth.users",
    "function_name": "handle_new_user",
    "tgtype": 5,
    "tgenabled": "O"
  },
  {
    "trigger_name": "handle_books_updated_at",
    "table_name": "books",
    "function_name": "handle_updated_at",
    "tgtype": 19,
    "tgenabled": "O"
  },
  {
    "trigger_name": "handle_blog_posts_updated_at",
    "table_name": "blog_posts",
    "function_name": "handle_updated_at",
    "tgtype": 19,
    "tgenabled": "O"
  },
  {
    "trigger_name": "handle_events_updated_at",
    "table_name": "events",
    "function_name": "handle_updated_at",
    "tgtype": 19,
    "tgenabled": "O"
  },
  {
    "trigger_name": "update_objects_updated_at",
    "table_name": "storage.objects",
    "function_name": "storage.update_updated_at_column",
    "tgtype": 19,
    "tgenabled": "O"
  }
]

[
  {
    "type_name": "action",
    "schema_name": "realtime",
    "type_category": "E",
    "input_function": "enum_in",
    "output_function": "enum_out"
  },
  {
    "type_name": "equality_op",
    "schema_name": "realtime",
    "type_category": "E",
    "input_function": "enum_in",
    "output_function": "enum_out"
  },
  {
    "type_name": "user_defined_filter",
    "schema_name": "realtime",
    "type_category": "C",
    "input_function": "record_in",
    "output_function": "record_out"
  },
  {
    "type_name": "wal_column",
    "schema_name": "realtime",
    "type_category": "C",
    "input_function": "record_in",
    "output_function": "record_out"
  },
  {
    "type_name": "wal_rls",
    "schema_name": "realtime",
    "type_category": "C",
    "input_function": "record_in",
    "output_function": "record_out"
  },
  {
    "type_name": "aal_level",
    "schema_name": "auth",
    "type_category": "E",
    "input_function": "enum_in",
    "output_function": "enum_out"
  },
  {
    "type_name": "code_challenge_method",
    "schema_name": "auth",
    "type_category": "E",
    "input_function": "enum_in",
    "output_function": "enum_out"
  },
  {
    "type_name": "factor_status",
    "schema_name": "auth",
    "type_category": "E",
    "input_function": "enum_in",
    "output_function": "enum_out"
  },
  {
    "type_name": "factor_type",
    "schema_name": "auth",
    "type_category": "E",
    "input_function": "enum_in",
    "output_function": "enum_out"
  },
  {
    "type_name": "one_time_token_type",
    "schema_name": "auth",
    "type_category": "E",
    "input_function": "enum_in",
    "output_function": "enum_out"
  },
  {
    "type_name": "_key_id_context",
    "schema_name": "pgsodium",
    "type_category": "C",
    "input_function": "record_in",
    "output_function": "record_out"
  },
  {
    "type_name": "crypto_box_keypair",
    "schema_name": "pgsodium",
    "type_category": "C",
    "input_function": "record_in",
    "output_function": "record_out"
  },
  {
    "type_name": "crypto_kx_keypair",
    "schema_name": "pgsodium",
    "type_category": "C",
    "input_function": "record_in",
    "output_function": "record_out"
  },
  {
    "type_name": "crypto_kx_session",
    "schema_name": "pgsodium",
    "type_category": "C",
    "input_function": "record_in",
    "output_function": "record_out"
  },
  {
    "type_name": "crypto_sign_keypair",
    "schema_name": "pgsodium",
    "type_category": "C",
    "input_function": "record_in",
    "output_function": "record_out"
  },
  {
    "type_name": "crypto_signcrypt_keypair",
    "schema_name": "pgsodium",
    "type_category": "C",
    "input_function": "record_in",
    "output_function": "record_out"
  },
  {
    "type_name": "crypto_signcrypt_state_key",
    "schema_name": "pgsodium",
    "type_category": "C",
    "input_function": "record_in",
    "output_function": "record_out"
  },
  {
    "type_name": "key_status",
    "schema_name": "pgsodium",
    "type_category": "E",
    "input_function": "enum_in",
    "output_function": "enum_out"
  },
  {
    "type_name": "key_type",
    "schema_name": "pgsodium",
    "type_category": "E",
    "input_function": "enum_in",
    "output_function": "enum_out"
  },
  {
    "type_name": "user_role",
    "schema_name": "public",
    "type_category": "E",
    "input_function": "enum_in",
    "output_function": "enum_out"
  }
]