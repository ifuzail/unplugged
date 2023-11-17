import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./appwrite-config";


// AUTH FUNCTIONS 
export async function createUserAccount(user) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function saveUserToDB(user) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function signInAccount(user) {
  try {
    const session = await account.createEmailSession(user.email, user.password);

    return session;
  } catch (error) {
    console.log(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession('current')

    return session
  } catch (error) {
    console.log(error)
  }
}
// Auth Functions Ended

//------------------------------------

//Post Functions Started.

// Function for upload image --> then get it --> then submit the form to create the post in the database.
export async function createPost(post) {
  try {
    //upload the image to storage
    const uploadedFile = await uploadFile(post.file[0])

    if(!uploadFile) throw Error('no image is dropped!');

  // Get the FileUrl [from storage]
  const fileUrl = getFilePreview(uploadedFile.$id)

  if(!fileUrl) {
    deleteFile(uploadedFile.$id)
    throw Error('no Fileurl found');
  }

  // convert tags in an array
  const tags = post.tags?.replace(/ /g,'').split(',') || [];

  //Save the post the database
   const newPost = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.postCollectionId,
    ID.unique(),
    {
      creator: post.userId,
      caption: post.caption,
      imageUrl:  fileUrl,
      imageId: uploadedFile.$id,
      location: post.location,
      tags: tags,
    }
   )

   if(!newPost) {
    await deleteFile(uploadedFile.$id)
    throw Error;
   }
    
   return newPost
   
  } catch (error) {
    console.log(error)
    return null;
  }
} 

// function for making video posts 

export async function createVideoPost(videoPost) {
  try {
    //upload the image to storage
    const uploadedFile = await uploadFile(videoPost.videoFile[0])

    if(!uploadedFile) throw Error('no video is dropped!');

  // Get the FileUrl [from storage]
  const VideoFileUrl = getFileView(uploadedFile.$id)

  if(!VideoFileUrl) {
    deleteFile(uploadedFile.$id)
    throw Error('no Fileurl found');
  }

  const uploadedImage = await uploadFile(videoPost.imageFile[0])

    if(!uploadedImage) throw Error('no image is dropped!');

  // Get the FileUrl [from storage]
  const fileUrl = getFilePreview(uploadedImage.$id)

  if(!fileUrl) {
    deleteFile(uploadedImage.$id)
    throw Error('no Fileurl found');
  }


  // convert tags in an array
  const tags = videoPost.tags?.replace(/ /g,'').split(',') || [];

  //Save the post the database
   const newPost = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.postCollectionId,
    ID.unique(),
    {
      creator: videoPost.userId,
      caption: videoPost.caption,
      videoUrl:  VideoFileUrl,
      videoId: uploadedFile.$id,
      location: videoPost.location,
      tags: tags,
      imageUrl: fileUrl,
      imageId: uploadedImage.$id,
    }
   )

   if(!newPost) {
    await deleteFile(uploadedFile.$id) + deleteFile(uploadedImage.$id)
    throw Error;
   }
    
   return newPost
   
  } catch (error) {
    console.log(error)
    return null;
  }
} 

// this is a subfunction from above which help in uploading the image file.

export async function uploadFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    )

    return uploadedFile
  } catch (error) {
    console.log(error)
  }
}


// this is the subfunction from the main function [createPost] which allow user to see the uploaded image.
export function getFilePreview(fileId){
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      'top',
      100
    )

    return fileUrl;

  } catch (error) {
    console.log(error)
  }
}

export function getFileView(fileId){
  try {
    const fileUrl = storage.getFileView(
      appwriteConfig.storageId,
      fileId,
    )

    return fileUrl;

  } catch (error) {
    console.log(error)
  }
}

// this function is for deleting the user uploaded image it something goes wrong.
export async function deleteFile(fileId) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

     return {status: 'ok'}

  } catch (error) {
    console.log(error)
  }
}

export async function getRecentPosts() {
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.postCollectionId,
    [Query.orderDesc('$createdAt'), Query.limit(20)]
  )

  if(!posts) throw Error;

  return posts;
}

export async function likePost(postId , likesArray) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );

    if(!updatedPost) throw Error('post is not updated');

    return updatedPost
  } catch (error) {
    console.log(error)
  }
}

export async function savePost(userId, postId) {
  try {
    const savedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );

    if(!savedPost) throw Error;
    return savedPost;
  } catch (error) {
    console.log(error)
  }
}

export async function deleteSavedPost(savedRecordId) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId,
    )
    if(!statusCode) throw Error;
    
    return {status: 'Ok' };

  } catch (error) {
    console.log(error)
  }
}

export async function getPostById(postId) {
  
  if (!postId) throw Error;

  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId,
      
    );

    if (!post) throw Error;

    return post;

  } catch (error) {
    console.log(error);
  }
}

export async function updatePost(post) {
 
    const hasFileToUpdate = post.file.length > 0;
     
    try {

      let image = {
        imageUrl: post.imageUrl,
        imageId: post.imageId,
      }

      if(hasFileToUpdate) {

        //upload the image to storage
        const uploadedFile = await uploadFile(post.file[0])

        if(!uploadedFile) throw Error('no image is dropped!');

        // Get the FileUrl [from storage]
        const fileUrl = getFilePreview(uploadedFile.$id)
      
        if(!fileUrl) {
          deleteFile(uploadedFile.$id)
          throw Error('no Fileurl found');
        }
        image = {...image, imageUrl: fileUrl, imageId: uploadedFile.$id}
      }


      // convert tags in an array
      const tags = post.tags?.replace(/ /g,'').split(',') || [];
    
      //Save the post the database
       const updatedPost = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postCollectionId,
        post.postId,
        {
          caption: post.caption,
          imageUrl:  image.imageUrl,
          imageId: image.imageId,
          location: post.location,
          tags: tags,
        }
       )
    
       if(!updatedPost) {
        await deleteFile(post.imageId)
        throw Error;
       }
        
       return updatedPost 
      }
       catch (error) {
        console.log(error)
        return null;
      }
    };
     
export async function deletePost(postId, imageId) {
  if(!postId || !imageId) throw Error;

  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    )
    return {status: 'ok'}
  } catch (error) {
    console.log(error)
  }
}

export async function getInfinitePosts({pageParam}) {

  //query param for listing all user's posts
  const queries = [Query.orderDesc('$updatedAt'), Query.limit(10)]

  if(pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    )

    if(!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}


export async function searchPosts(searchTerm) {

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search('caption', searchTerm)]
    )

    if(!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}





