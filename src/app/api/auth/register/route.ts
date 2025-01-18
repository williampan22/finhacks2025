import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/utils/mongodb';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  const { firstName, lastName, email, password } = await request.json();
  console.log('Registration data received:', { firstName, lastName, email });

  try {
    const { db } = await connectToDatabase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error('User already exists');
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();
    console.log('User registered successfully:', email);

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
