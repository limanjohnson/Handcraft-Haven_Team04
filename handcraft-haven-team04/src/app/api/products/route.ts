import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

// GET: todos los productos
export async function GET() {
  try {
    const res = await pool.query('SELECT * FROM products ORDER BY id ASC');
    return NextResponse.json(res.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
}

// POST: crear producto
export async function POST(req: Request) {
  try {
    const { title, description, price, user_id } = await req.json();
    const res = await pool.query(
      'INSERT INTO products (title, description, price, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, price, user_id]
    );
    return NextResponse.json(res.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
}
