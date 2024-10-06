import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";  // Make sure this path is correct
import User from "@/models/User";  // Ensure the User model is correctly imported
import bcrypt from "bcrypt";

export async function POST( request: Request){
    try {
        //connect to the database
        console.log("Connecting to database...");
        await connectToDatabase(); // Check database connection
        console.log("Connected to database!");


        const { email, password } = await request.json();
        console.log("Request body: ", { email, password: "<hidden>" }); // Log request body

        // Validate input 
        if( !email || !password ) {
            return NextResponse.json({ error: ' All fields are required'}, { status: 400});
        }

        // Find user by email
        const user = await User.findOne({ email });
        if( !user ){
            return NextResponse.json({ error: ' Invalid email or password'}, { status: 400});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if( !isPasswordValid ){
            return NextResponse.json({ error: ' Invalid email or password'}, { status: 400});
        }
        
        // Successful login
        return NextResponse.json({ message: 'Login successful!' }, { status: 200 });
        
    } catch (error) {
        console.error('Error during login:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}