import { compare, genSalt, hash } from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  receivePassword: string,
  actualPassword: string
) => {
  const isPasswordValid = await compare(receivePassword, actualPassword);
  return isPasswordValid;
};
