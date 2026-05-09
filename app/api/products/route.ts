import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function GET() {
  const db = readDb();
  return NextResponse.json(db.products);
}

export async function POST(request: Request) {
  const data = await request.json();
  const db = readDb();
  const newProduct = {
    ...data,
    id: Date.now(),
  };
  db.products.push(newProduct);
  writeDb(db);
  return NextResponse.json(newProduct, { status: 201 });
}
