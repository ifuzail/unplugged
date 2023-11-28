import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage} from "./appwrite-config";

// Auth functions

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
    console.log(error);
    return error;
  }
}

export async function signInAccount(user) {
  try {
    const session = await account.createEmailSession(user?.email, user?.password);

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
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}

//-------------------------------------------------------------------------------

//Post Functions.

export async function createPost(post) {
  try {
    //upload the image to storage
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadFile) throw Error("no image is dropped!");

    // Get the FileUrl [from storage]
    const fileUrl = getFilePreview(uploadedFile.$id);

    if (!fileUrl) {
      deleteFile(uploadedFile.$id);
      throw Error("no Fileurl found");
    }

    // convert tags in an array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //Save the post the database
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function createVideoPost(videoPost) {
  try {
    //upload the image to storage
    const uploadedFile = await uploadFile(videoPost.videoFile[0]);

    if (!uploadedFile) throw Error("no video is dropped!");

    // Get the FileUrl [from storage]
    const VideoFileUrl = getFileView(uploadedFile.$id);

    if (!VideoFileUrl) {
      deleteFile(uploadedFile.$id);
      throw Error("no Fileurl found");
    }

    const uploadedImage = await uploadFile(videoPost.imageFile[0]);

    if (!uploadedImage) throw Error("no image is dropped!");

    // Get the FileUrl [from storage]
    const fileUrl = getFilePreview(uploadedImage.$id);

    if (!fileUrl) {
      deleteFile(uploadedImage.$id);
      throw Error("no Fileurl found");
    }

    // convert tags in an array
    const tags = videoPost.tags?.replace(/ /g, "").split(",") || [];

    //Save the post the database
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: videoPost.userId,
        caption: videoPost.caption,
        videoUrl: VideoFileUrl,
        videoId: uploadedFile.$id,
        location: videoPost.location,
        tags: tags,
        imageUrl: fileUrl,
        imageId: uploadedImage.$id,
      }
    );

    if (!newPost) {
      (await deleteFile(uploadedFile.$id)) + deleteFile(uploadedImage.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getRecentPosts() {
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.postCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(20)]
  );

  if (!posts) throw Error;

  return posts;
}

export async function likePost(post) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        likes: post.likesArray
      }
    )

    if (!updatedPost) throw Error("post is not updated");

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function getPostById(postId) {
  if (!postId) throw Error;

  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
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
    };

    if (hasFileToUpdate) {
      //upload the image to storage
      const uploadedFile = await uploadFile(post.file[0]);

      if (!uploadedFile) throw Error("no image is dropped!");

      // Get the FileUrl [from storage]
      const fileUrl = getFilePreview(uploadedFile.$id);

      if (!fileUrl) {
        deleteFile(uploadedFile.$id);
        throw Error("no Fileurl found");
      }
      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // convert tags in an array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    //Save the post the database
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );

    if (!updatedPost) {
      await deleteFile(post.imageId);
      throw Error;
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateVideoPost(videoPost) {

  const hasFileToUpdate = videoPost.imageFile.length > 0;

  const hasVideoFileToUpdate = videoPost.videoFile.length > 0;

  try {
    let image = {
      imageUrl: videoPost.imageUrl,
      imageId: videoPost.imageId,
    };

    let video = {
      videoUrl: videoPost.videoUrl,
      videoId: videoPost.videoId,
    };

    if (hasFileToUpdate && hasVideoFileToUpdate) {
      //upload the image to storage
      const uploadedFile = await uploadFile(videoPost.imageFile[0]);

      const uploadedVideo = await uploadFile(videoPost.videoFile[0]);

      if (!uploadedFile || !uploadedVideo) throw Error("no image is dropped!");

      // Get the FileUrl [from storage]
      const fileUrl = getFilePreview(uploadedFile.$id);

      const videoFileUrl = getFileView(uploadedVideo.$id);

      if (!fileUrl || !videoFileUrl) {
        deleteFile(uploadedFile.$id || uploadedVideo.$id);
        throw Error("no File Url found");
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };

      video = { ...video, videoUrl: videoFileUrl, videoId: uploadedVideo.$id };
    }

    // convert tags in an array
    const tags = videoPost.tags?.replace(/ /g, "").split(",") || [];

    //Save the post the database
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      videoPost.videoPostId,
      {
        caption: videoPost.caption,
        videoUrl: video.videoUrl,
        videoId: video.videoId,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: videoPost.location,
        tags: tags,
      }
    );

    if (!updatedPost) {
      await deleteFile(videoPost.imageId && videoPost.videoId);
      throw Error;
    }

    return updatedPost;
    
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deletePost(post) {

  if (!post) {
    console.error('Invalid post data for deletion');
    return { status: 'error', message: 'Invalid post data for deletion' };
  }

  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId
    );

    if (!statusCode) throw Error;

      await deleteFile(post.imageId)

      if(post?.videoId) {
        await deleteFile(post.videoId)
      }

    return { status: "ok" };

  } catch (error) {
    console.log(error);
  }
}

export async function getInfinitePosts({ pageParam }) {
  //query param for listing all user's posts
  const queries = [Query.orderDesc("$updatedAt"), Query.limit(30)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      queries
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

// -----------------------------------------------------------------------------------

// stories functions

export async function createStory(story) {
  try {
    // Upload the image to storage
    const uploadedFile = await uploadFile(story?.file[0]);

    if (!uploadedFile) throw Error("No image is dropped!");

    // Get the FileUrl [from storage]
    const fileUrl = getFilePreview(uploadedFile.$id);

    if (!fileUrl) {
      deleteFile(uploadedFile.$id);
      throw Error("No Fileurl found");
    }

    // Save the post to the database
    const newStory = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.storiesCollectionId,
      ID.unique(),
      {
        user: story?.userId,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
      }
    );

    if (!newStory) {
      await deleteFile(uploadedFile.$id);
      throw Error("Error creating story");
    }

    // Calculate the deletion time (current time + 5 hours)
    const deletionTime = new Date();
    deletionTime.setMinutes(deletionTime.setMinutes() + 2);

    // Schedule the deleteStory function to execute after 5 hours
    setTimeout(async () => {
      try {
        await deleteStory(newStory.$id, uploadedFile.$id);
      } catch (error) {
        console.error("Error deleting story:", error);
      }
    }, deletionTime - Date.now());

    return newStory;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteStory(story) {
  try {
    if (!story) throw Error("Invalid story ID");

     const statusCode = await databases.deleteDocument(
        appwriteConfig.databaseId,
        appwriteConfig.storiesCollectionId,
        story.storyId
      );

      if(!statusCode) throw Error;
      // Delete the associated image from storage
      await deleteFile(story.imageId);

     return {status: 'ok'}

  } catch (error) {
    console.error('Error deleting story:', error);
   
  }
}

export async function getStoryById(storyId) {
  if (!storyId) throw Error;

  try {
    const story = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.storiesCollectionId,
      storyId
    );

    if (!story) throw Error;

    return story;
    
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentStories() {
  const stories = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.storiesCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(20)]
  );

  if (!stories) throw Error;

  return stories;
}

// -----------------------------------------------------------------------------

// Comments functions

export async function createComment(comment) {
  try {
    const newComment = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.commentsCollectionId,
      ID.unique(),
      {
        user: comment.userId,
        posts: comment.postId,
        message: comment.message,
      }
    );

    if (!newComment) throw Error;
    return newComment;
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentComments() {
  const comments = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.commentsCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(50)]
  );

  if (!comments) throw Error;

  return comments;
}

export async function deleteComment(commentId) {
  try {  
    const deletedComments = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.commentsCollectionId,
      commentId
    )
  
    if(!deletedComments) throw Error;
    
    return { status: "ok" };

  } catch (error) {
    console.log(error)
  }

}

// ----------------------------------------------------------------------

// user functions

export async function followUser(user) {
  try {

    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.userId,
      {
        followers: user.followArray,
      }
    )

    if (!updatedUser) throw Error("User update failed");

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function getUserById(userId) {
  if (!userId) throw Error;

  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    )

    if(!user) throw Error;
    return user;

  } catch (error) {
    console.log(error)
  }
}

export async function updateUser(user) {
  const hasFileToUpdate = user.file.length > 0;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(user.file[0]);
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    //  Update user
    const updatedUser = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      user.userId,
      {
        name: user.name,
        bio: user.bio,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );

    // Failed to update
    if (!updatedUser) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      // If no new file uploaded, just throw error
      throw Error;
    }

    // Safely delete old file after successful update
    if (user.imageId && hasFileToUpdate) {
      await deleteFile(user.imageId);
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers(limit) {

  const queries = [Query.orderDesc('$createdAt')];
  if(limit) {

    queries.push(Query.limit(limit));

  }
  try {

    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      queries,
    )

    if (!users) throw Error;
    return users;

  } catch (error) {

    console.log(error)
    
  }
}

// ---------------------------------------------------------------------------

// other helper-functions 

export async function uploadFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

export function getFilePreview(fileId) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export function getFileView(fileId) {
  try {
    const fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileId) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function searchPosts(searchTerm) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.search("caption", searchTerm)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}








