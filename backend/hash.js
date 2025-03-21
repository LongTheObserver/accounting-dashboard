import bcrypt from "bcrypt";

const hashPassword = async () => {
  const hashedPassword = await bcrypt.hash("adminpassword", 10);
  console.log("Hashed Password:", hashedPassword);
};

hashPassword();