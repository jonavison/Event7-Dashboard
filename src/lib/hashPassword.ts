import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  // Generate salt (default salt rounds is 10)
  const salt = await bcrypt.genSalt(10);

  // Hash the password using the generated salt
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}
