import { NextResponse } from 'next/server';
import pool from '../../../../lib/db';

// GET: todos los usuarios
export async function GET() {
  try {
    const res = await pool.query('SELECT * FROM users ORDER BY id ASC');
    return NextResponse.json(res.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

// POST: crear usuario
export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();
    const res = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return NextResponse.json(res.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
