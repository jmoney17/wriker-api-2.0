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

    let email = input.emailAddress;
    let username = input.username;

    const emailFind = await UserModel.findOne({ emailAddress: email });

    const usernameFind = await UserModel.findOne({ username: username });

    if (emailFind) {
      let emailMessage = 'User with email "' + email + '" already exists';
      throw  { message: emailMessage };
    }

    if (usernameFind) {
      let usernameMessage = 'User with User Name "' + username + '" already exists';
      throw  { message: usernameMessage };
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
