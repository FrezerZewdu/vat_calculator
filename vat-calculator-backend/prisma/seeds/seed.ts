import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2';
import { roles } from '../../src/auth/dto/enums';
import { Units } from '../../src/item/dto/enum';

// seed command: npx prisma db seed
const prisma = new PrismaClient();

const USER = [
  {
    name: 'SYSTEM_ADMIN',
    email: 'systemadmin21@admin.com',
    password: '12345678',
    role: roles.supAdmin,
    expiryDate: '2050-01-05T08:30:23+0000',
  },
  {
    name: 'Abdul',
    email: 'abdul1@gmail.com',
    password: '12345678',
    role: roles.norAdmin,
    expiryDate: '2025-01-05T08:30:23+0000',
  },
  {
    name: 'Hanna',
    email: 'hanna@gmail.com',
    password: '12345678',
    role: roles.sales,
    expiryDate: '2025-01-05T08:30:23+0000',
  },
];

const ITEM = [
  {
    name: 'Black Label 1L',
    unit: Units.unit,
    createdBy: 1,
  },
  {
    name: 'Black Label 0.5L',
    unit: Units.unit,
    createdBy: 1,
  },
  {
    name: 'Red Label 1L',
    unit: Units.unit,
    createdBy: 1,
  },
  {
    name: 'Stolchinya 1L',
    unit: Units.unit,
    createdBy: 1,
  },
  {
    name: 'Gordon Gin 1L',
    unit: Units.unit,
    createdBy: 1,
  },
  {
    name: 'Absolute Vodka 1L',
    unit: Units.unit,
    createdBy: 1,
  },
];

async function seedUsers() {
  for (let i = 0; i < USER.length; i++) {
    USER[i].password = await argon.hash(USER[i].password);
    USER[i].expiryDate = new Date(USER[i].expiryDate).toISOString();
  }

  Promise.all(USER.map((user) => prisma.user.create({ data: user })))
    .then(() => console.info('[USER_SEED] Successfully created users record'))
    .catch((error) =>
      console.error('[USER_SEED] Failed to create users record', error),
    );
}

async function seedItems() {
  Promise.all(ITEM.map((item) => prisma.item.create({ data: item })))
    .then(() => console.info('[ITEM_SEED] Successfully created items record'))
    .catch((error) =>
      console.error('[ITEM_SEED] Failed to created items record', error),
    );
}

seedUsers();
seedItems();
