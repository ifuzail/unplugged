# Unplugged Development Process

![Unplugged](https://github.com/ifuzail/unplugged/assets/135622982/e366d973-45a7-44f5-9944-3cda82d4a8fd)


## Developer’s Note

When I first started as a web developer, I was always interested in learning new technologies. Starting with a video streaming site called Cubical, I moved on to Aigist (where I summarized articles using the GPT-4 api), and finally I worked on a front-end e-commerce online application called Stellar. My learning curve accelerated after creating all of these fantastic apps, and I became motivated to create a full-stack app. And then this app appeared. Originally named Eleevan (I picked this name mainly because the domain name was available), it was then renamed **Unplugged**. Here, I just want to demonstrate how I went through the entire process and how I brought it all to life.


## My Decision to code a Social Media App

My decision to create a social media app was simple, I wanted to make a web app full of backend logic and interaction with the UI. But I haven’t started with this mindset. Initially, I was curious to know more about how authentication works in a front-end app. For that, I decided to create a basic layout for authentication. I used to rely on Clerk to streamline the authentication process, but then I came across Appwrite and everything changed. Appwrite, being a full-fledged Baas (backend as a service), still has a lot to offer in terms of learning opportunities. I worked with Appwrite to apply the authentication services that it offers. It took me some hours to set up the auth for my new tiny project. With the right syntax and plundering the documentation I finally made a successful authentication.

## A little assistance from the tutorial

If I said I coded this app all on my own, it would be untrue. I used to be stuck in tutorial hell, relying solely on tutorials to learn how to code. However, when I started working on Steller, I made a conscious decision to seek help from documentation and chatGPT. Even though I reverted back to using a tutorial for building this social media app, I was able to break out of my tutorial dependency and explore other resources to improve my coding skills. Although tutorials can be helpful to some extent, they may not sufficiently develop your logical and creative skills as a developer. I made a conscious decision to develop my app using a different environment than what was used in the tutorial. For example, instead of using React, I opted for Next.js to implement a different routing system and other techniques. While working on my app, I implemented new features to learn more. This led to sculpting a full-stack social media platform.

## My Appwrite Schemas

### Schema for User -
![user](https://github.com/ifuzail/unplugged/assets/135622982/2b7e62f4-0377-421b-8a22-dbcdf102bfc8)
![user-2](https://github.com/ifuzail/unplugged/assets/135622982/9eb3de1f-94dd-4ed4-9965-d5d924a6b7ef)

### Schema for Posts -
![Screenshot (52)](https://github.com/ifuzail/unplugged/assets/135622982/a7b3bc32-63fb-4b08-955d-3023c0df5805)
![Screenshot (53)](https://github.com/ifuzail/unplugged/assets/135622982/d6fc046d-3853-4824-81b1-feaf8c4a9189)

### Schema for Stories -
![Screenshot (55)](https://github.com/ifuzail/unplugged/assets/135622982/aeb97582-91bd-4b00-a260-3bb946fa4c1f)

### Schema for Comments-
![Screenshot (56)](https://github.com/ifuzail/unplugged/assets/135622982/9fa143b1-9d7c-4065-b955-b6cf6a2f1604)

## This is how a component interact with Appwrite

Let’s say you want to create a post and save the post details into the database. First we need to configure Appwrite. Code for that is shown below.

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
    }
    
    export const client = new Client();
    
    client.setProject(appwriteConfig.projectId);
    client.setEndpoint(appwriteConfig.url);
    
    export const account = new Account(client)
    export const databases = new Databases(client)
    export const storage = new Storage(client)
    export const avatars = new Avatars(client)




then in the api.js file, we would create an api function that will interact with the database in Appwrite. code for the function would looks like this: 

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

then create mutation (with tanstack query) in queriesAndMutation.js file in the LIB directory.

    export const useCreatePost = () => {
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: (post) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getRecentPosts']
            })
        }
    })
    }

then call this mutation into your component. Like this:

     const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();

This is a small example of how appwrite works in a Next js project. 

## Flow-chart showing the interaction between UI and Appwrite cloud.

<img width="1152" alt="Untitled" src="https://github.com/ifuzail/unplugged/assets/135622982/bbc78ae3-72c1-4235-bedc-4ddd88dbe78b">

## Features I have Implemented on my own.
- **Add a Video Post**: This feature allows users to add video files as posts and perform CRUD operations on them.
  
   ![Screenshot (47)](https://github.com/ifuzail/unplugged/assets/135622982/667bb6f6-8298-4e5d-bd61-f29f88edb3d4)
-  **Add Stories**:This feature allows you to share your stories with others. You can also remove them from your profile.
  
  ![Screenshot (46)](https://github.com/ifuzail/unplugged/assets/135622982/29561fce-60ff-4e62-a3e0-dde3c1054f27)
- **Comment on a Specific post**: This feature allows users to comment on their own or other people's posts.
  
 ![Screenshot (42)](https://github.com/ifuzail/unplugged/assets/135622982/2db6f1e1-ec83-49c5-9d7a-50f3e8e5f65f)
 
- **A Follow Button**:You can use this feature to follow a particular user and also allow them to follow you back.
  
  ![Screenshot (48)](https://github.com/ifuzail/unplugged/assets/135622982/511588e4-613d-42d3-9d44-072c4983acbf)



## Make sure to Update your .env.local file like this 

   

    NEXT_PUBLIC_APPWRITE_PROJECTID=''
    NEXT_PUBLIC_APPWRITE_URL=''
    NEXT_PUBLIC_APPWRITE_STORAGE_ID=''
    NEXT_PUBLIC_APPWRITE_DATABASE_ID=''
    NEXT_PUBLIC_APPWRITE_USER_COLLECTION_ID=''
    NEXT_PUBLIC_APPWRITE_POST_COLLECTION_ID=''
    NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID=''
    NEXT_PUBLIC_APPWRITE_STORIES_COLLECTION_ID=''

## To run this Repository on your local device

- clone the repository from [github.com/ifuzail/unplugged](https://github.com/ifuzail/unplugged)
- then on your Vscode run: `npm install` to install the latest version of node js.
- To start the development server run: `npm run dev `

## This is Unplugged
![ezgif com-gif-to-mp4](https://github.com/ifuzail/unplugged/assets/135622982/5125babb-0b75-4dc4-afe1-49871e745bd4)

- don't hesitate to fix bugs related to style, components or logic


