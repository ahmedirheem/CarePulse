import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"
import { parseStringify } from "../utils";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log(user, 'from create user');
    console.log(users, 'USERS');
    
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    )
    return parseStringify(newUser);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if(error && error?.code === 409) {
      const documents = await users.list([
        Query.equal("email", [user.email])
      ])
      return documents.users[0]
    }
    console.error("An error occurred while creating a new user:", error);
  }
}