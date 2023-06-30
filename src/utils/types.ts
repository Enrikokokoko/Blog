export type CreateUserParams = {
  username: string;
  password: string;
}
export type UpdateUserParams = {
  username: string;
  password: string;
}

export class CreateProfileParams {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
}

export class UpdateProfileParams {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
}

export class CreateUserPostParams {
  title: string;
  description: string;
}