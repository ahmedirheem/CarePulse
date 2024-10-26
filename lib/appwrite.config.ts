import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new sdk.Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6710ea05000e1c5d0c4e')
  .setKey('standard_a44c6924b6768ce010878aeb1c25c03450afed5d99331f8948f6e7fb2f86c74c808afd851658a13e6021ac3f2ede17b03d02e9aea4735fac758cc41d3d6ebf3ab1079897855b05241b26de33f5cfc839cb583894860be78d6d69f5f6733eb14c077068aaf4d4866781bd3fcd065426b7d25196c469b9be226eb8460e9834cfbb');

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);