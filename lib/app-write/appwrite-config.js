import {Client, Account, Databases, Avatars, Storage } from 'appwrite';

export const appwriteConfig = {
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECTID,
    url: process.env.NEXT_PUBLIC_APPWRITE_URL,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID ,
    userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID,
    postCollectionId: process.env.NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID ,
    commentsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID,
    storiesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_STORIES_COLLECTION_ID,
    messagesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID,
}

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)