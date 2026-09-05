import { Client, Account, Databases, Storage, ID } from 'appwrite';

const client = new Client();

client
  .setEndpoint('http://localhost:9520/v1')
  .setProject('6a9c15fa0025b0977a06');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { client, ID };
