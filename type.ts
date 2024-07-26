export interface User {
  name: String;
  email: string;
}

export interface BearState {
  bears: any;
  adduser: (user: User) => void;
  removeuser: () => void;
}
export interface ID {
  id: String;
}
export interface ITEM {
  _id: String;
  userId: String;
  description: String | any;
  paymentType: String;
  category: String;
  amount: Number;
  location: String | any;
  date: String;
}
