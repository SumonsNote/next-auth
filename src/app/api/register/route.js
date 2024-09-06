import { createUser } from "@/queries/users";
import { NextResponse } from "next/server";

import { dbConnect } from "@/lib/mongo";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
  const { name, email, password } = await request.json();

  // Create a DB Conenction
  await dbConnect();
  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 5);
  // Form a DB payload
  const newUser = {
    name,
    password: hashedPassword,
    email,
  };
  // Update the DB
  try {
    await createUser(newUser);
  } catch (err) {
    return new NextResponse(error.mesage, {
      status: 500,
    });
  }

  return new NextResponse("User has been created", {
    status: 201,
  });
};
