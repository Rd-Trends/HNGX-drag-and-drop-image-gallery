// get first two letters of email
export const getUserNameFromEmail = (email: string): string => {
  const [name] = email.split("@");
  return name.slice(0, 2);
};
