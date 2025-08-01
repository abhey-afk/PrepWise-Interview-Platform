"use server";

import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cookies } from "next/headers";

interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

interface SignInParams {
  email: string;
  password: string;
}

export async function signUp(params: SignUpParams) {
  const { name, email, password } = params;

  console.log(`🔍 SignUp: Attempting to create user for email: ${email}`);

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log(`❌ SignUp: User already exists for email: ${email}`);
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log(`✅ SignUp: User created successfully with ID: ${newUser._id}`);

    return {
      success: true,
      message: "Account created successfully. Please sign in.",
    };
  } catch (error: any) {
    console.error("❌ SignUp Error:", error);

    return {
      success: false,
      message: "Failed to create an account.",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, password } = params;

  console.log(`🔍 SignIn: Attempting login for email: ${email}`);

  try {
    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ SignIn: User not found");
      return {
        success: false,
        message: "User not found. Please sign up.",
      };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      console.log("❌ SignIn: Incorrect password");
      return {
        success: false,
        message: "Incorrect password.",
      };
    }

    // Normally handled by NextAuth, or set session manually if custom logic
    console.log("✅ SignIn: User authenticated. NextAuth should manage session.");
    return {
      success: true,
      message: "Signed in successfully.",
    };
  } catch (error) {
    console.error("❌ SignIn Error:", error);
    return {
      success: false,
      message: "Failed to log into an account.",
    };
  }
}

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      console.log("❌ GetCurrentUser: No active session found");
      return null;
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email }).lean();

    if (!user) {
      console.log("❌ GetCurrentUser: User not found in DB");
      return null;
    }

    console.log("✅ GetCurrentUser: User found");
    return user;
  } catch (error) {
    console.error("❌ GetCurrentUser Error:", error);
    return null;
  }
}

export async function signOut() {
  // Session is managed by NextAuth, client should call signOut() from 'next-auth/react'
  const cookieStore = cookies();
  (await cookieStore).delete("session");

  console.log("✅ SignOut: Session cookie deleted");
  return {
    success: true,
    message: "Signed out successfully.",
  };
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
