import { Account, Client, Databases, ID, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APP_WRITE_URL!)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!);

console.log("APP_WRITE_URL>>", process.env.NEXT_PUBLIC_APP_WRITE_URL!);
console.log("PROJECT_ID>>", process.env.NEXT_PUBLIC_PROJECT_ID!);

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

export { account, databases, storage, ID };
