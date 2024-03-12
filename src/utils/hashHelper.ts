import bcrypt from "bcrypt";
import crypto from "crypto";

async function bcryptHash(plainText: string) {
  return await bcrypt.hash(plainText, 10);
}

async function bcryptCompareHash(plainText: string, hashedText: string) {
  return await bcrypt.compare(plainText, hashedText);
}

function generateKey(size = 32, format = "base64") {
  const buffer = crypto.randomBytes(size);
  return buffer.toString(format as BufferEncoding);
}

function hashString(key: string) {
  const salt = crypto.randomBytes(8).toString("hex");
  const buffer = crypto.scryptSync(key, salt, 64);
  return `${buffer.toString("hex")}.${salt}`;
}

function compareStringHash(storedKey: string, suppliedKey: string) {
  const [hashedPassword, salt] = storedKey.split(".");
  const buffer = crypto.scryptSync(suppliedKey, salt, 64);
  return crypto.timingSafeEqual(Buffer.from(hashedPassword, "hex"), buffer);
}

const hashHelper = {
  hashString,
  compareStringHash,
  generateKey,
  bcryptHash,
  bcryptCompareHash,
};

export default hashHelper;
