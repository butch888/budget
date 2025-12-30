export interface IUser {
  id: number;
  email: string;
  token: string;
}

export interface IUserData {
  email: string;
  password: string;
}

export interface IResponseUser {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface IResponseUserData {
  token: string;
  user: IResponseUser;
}

export interface ICategory {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  transactions?: ITransaction;
}

export interface ITransaction {
  id: number;
  amount: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  category: ICategory;
  type: string;
}

export interface IResponseTransactionLoader {
  categories: ICategory[];
  transactions: ITransaction[];
  totalIncome: number;
  totalExpense: number;
}
