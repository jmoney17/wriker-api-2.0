import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";

export async function createUser(input: UserInput) {
  try {
    const editedInput = {
      username: input.username,
      emailAddress: input.emailAddress,
      displayName: input.firstName + " " + input.lastName,
      password: input.password
    }

    const user = await UserModel.create(editedInput);

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw e.message;
  }
}

export async function validatePassword({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = await UserModel.findOne({ username });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
