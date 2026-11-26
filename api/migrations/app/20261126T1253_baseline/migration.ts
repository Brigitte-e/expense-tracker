#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/0ed485141b16a68ce5351584e26e80ffead8281b42182cf10fd7d890c23f85ad/contract';
import endContract from '../../snapshots/0ed485141b16a68ce5351584e26e80ffead8281b42182cf10fd7d890c23f85ad/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'accounts',
        columns: [
          col('bank', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('currency', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'accounts_bank_check_e33cab2d',
            "\"bank\" IN ('REVOLUT', 'MONOBANK', 'PRIVAT')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'categories',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'category_rules',
        columns: [
          col('categoryId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('pattern', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('priority', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('userId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'imports',
        columns: [
          col('bank', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('fileName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'imports_bank_check_e33cab2d',
            "\"bank\" IN ('REVOLUT', 'MONOBANK', 'PRIVAT')",
          ),
          checkExpression(
            'imports_status_check_48358bb5',
            "\"status\" IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'transactions',
        columns: [
          col('accountId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('amount', 'numeric(19,4)', {
            notNull: true,
            codecRef: { codecId: 'pg/numeric@1', typeParams: { precision: 19, scale: 4 } },
          }),
          col('categoryId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('currency', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('date', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('importId', 'uuid', { codecRef: { codecId: 'pg/uuid@1' } }),
          col('merchant', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('transactionHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('userId', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression('transaction_amount_positive_2612d8b9', 'amount > 0'),
          checkExpression('transactions_type_check_5d925dfc', "\"type\" IN ('INCOME', 'EXPENSE')"),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'users',
        columns: [
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'uuid', { notNull: true, codecRef: { codecId: 'pg/uuid@1' } }),
          col('passwordHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'categories',
        constraint: 'categories_userId_name_key',
        columns: ['userId', 'name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'category_rules',
        constraint: 'category_rules_userId_pattern_key',
        columns: ['userId', 'pattern'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'transactions',
        constraint: 'transactions_transactionHash_key',
        columns: ['transactionHash'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'users',
        constraint: 'users_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'accounts',
        index: 'accounts_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'categories',
        index: 'categories_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'category_rules',
        index: 'category_rules_categoryId_idx_15c304f2',
        columns: ['categoryId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'category_rules',
        index: 'category_rules_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'imports',
        index: 'imports_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'transactions',
        index: 'transactions_accountId_date_idx_ea3a8ef5',
        columns: ['accountId', 'date'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'transactions',
        index: 'transactions_accountId_idx_cbfb3085',
        columns: ['accountId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'transactions',
        index: 'transactions_categoryId_idx_15c304f2',
        columns: ['categoryId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'transactions',
        index: 'transactions_importId_idx_60e258d5',
        columns: ['importId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'transactions',
        index: 'transactions_userId_date_idx_b0e9c250',
        columns: ['userId', 'date'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'transactions',
        index: 'transactions_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'accounts',
        foreignKey: {
          name: 'accounts_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'categories',
        foreignKey: {
          name: 'categories_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'category_rules',
        foreignKey: {
          name: 'category_rules_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'category_rules',
        foreignKey: {
          name: 'category_rules_categoryId_fkey',
          columns: ['categoryId'],
          references: { schema: 'public', table: 'categories', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'imports',
        foreignKey: {
          name: 'imports_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'transactions',
        foreignKey: {
          name: 'transactions_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'users', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'transactions',
        foreignKey: {
          name: 'transactions_categoryId_fkey',
          columns: ['categoryId'],
          references: { schema: 'public', table: 'categories', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'transactions',
        foreignKey: {
          name: 'transactions_accountId_fkey',
          columns: ['accountId'],
          references: { schema: 'public', table: 'accounts', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'transactions',
        foreignKey: {
          name: 'transactions_importId_fkey',
          columns: ['importId'],
          references: { schema: 'public', table: 'imports', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
