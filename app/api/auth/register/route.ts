import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import bcrypt from 'bcrypt';  // For hashing passwords
import User from '@/models/User';

export async function POST ( request: Request ) {
    try {

        await connectToDatabase(); // db connection

        // parse the request body
        const { name, email , password } = await request.json();

        // validate the incoming data
        if( !name || !email || !password){
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        // check if the email already exists in the database
        const existingUser = await User.findOne({ email });
        if( existingUser ) {
            return NextResponse.json({ error: 'user already exists' }, { status: 400 });
        }

        // hash password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();  // save user in database

        // return a success message
        return NextResponse.json({ message: 'User registered successfully ' }, { status: 201});
            
    } catch (error) {
        console.log(`Error registering user: ${error}`);
        return NextResponse.json({ error: 'Initial Server Error' }, { status: 500 });
    }
}