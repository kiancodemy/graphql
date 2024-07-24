export interface User {
  name: String;
  email: string;
}

export interface BearState {
  bears: any;
  adduser: (user: User) => void;
  removeuser: () => void;
}
export interface SignupInput {
  name: String!;
  email: String!;
  password: String!;
  gender: String!;
}
