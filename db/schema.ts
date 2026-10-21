import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const enquiries=sqliteTable('enquiries',{
 id:text('id').primaryKey(), name:text('name').notNull(), company:text('company').notNull(),
 phone:text('phone').notNull(), email:text('email').notNull(), service:text('service').notNull(),
 location:text('location').notNull(), message:text('message').notNull(), type:text('type').notNull(),
 stage:text('stage').notNull(), start:text('start').notNull(), source:text('source').notNull(),
 createdAt:integer('created_at').notNull(),
});
export const settings=sqliteTable('settings',{id:text('id').primaryKey(),value:text('value').notNull()});
export const rateLimits=sqliteTable('rate_limits',{key:text('key').primaryKey(),count:integer('count').notNull(),createdAt:integer('created_at').notNull()});
