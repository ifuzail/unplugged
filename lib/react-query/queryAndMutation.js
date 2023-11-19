import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query';
import { createComment, createPost, createUserAccount, createVideoPost, deletePost, deleteSavedPost, getCurrentUser, getInfinitePosts, getPostById, getRecentComments, getRecentPosts, getUserById, likePost, savePost, searchPosts, signInAccount, signOutAccount, updatePost, updateUser } from '../app-write/api';

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user) => createUserAccount(user)
    })
}
export const useSignInAccount = () => {
    return useMutation({
        mutationFn: user => signInAccount(user)
    })
}
export const useSignOutAccount = () => {
    return useMutation({
        mutationFn:  signOutAccount
    })
}

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

export const useCreateVideoPost = () => {
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: (videoPost) => createVideoPost(videoPost),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getRecentPosts']
            })
        }
    })
}

export const useGetRecentPosts = () => {
    return useQuery({
      queryKey: ['getRecentPosts'],
      queryFn: getRecentPosts
    });
  };

export const useLikePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postId, likesArray) => likePost(postId, likesArray),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['getPostById' , data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey: ['getRecentPosts']
            })
            queryClient.invalidateQueries({
                queryKey: ['getPosts']
            })
            queryClient.invalidateQueries({
                queryKey: ['getCurrentUser']
            })
        }

    })
}


export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ['getCurrentUser'],
    queryFn: getCurrentUser,

  })
}

export const useGetPostById = (postId) => {
  return useQuery({
    queryKey: ['getPostById', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  })
}

export const useUpdatePost = () => {
  const queryClient  = useQueryClient();

  return useMutation({
   mutationFn: (post) => updatePost(post),
   onSuccess: (data) => {
    queryClient.invalidateQueries({
      queryKey: ['getPostById', data?.$id]
    })
   }
  })
}

export const useDeletePost = () => {
  const queryClient  = useQueryClient();

  return useMutation({
    mutationFn: (postId, imageId) => deletePost(postId, imageId),
   onSuccess: (data) => {
     queryClient.invalidateQueries({
      queryKey: ['getRecentPosts']
    })
   }
  })
}

export const useGetPosts = () => {
  return useInfiniteQuery({
    queryKey: ['getInfinitePosts'],
    queryFn: getInfinitePosts,
    getNextPageParam: (lastPage) => {

      if(lastPage && lastPage.documents.length === 0) return null;
      
      const lastId = lastPage.documents[lastPage?.documents.length - 1].$id;

      return lastId;
    }
  })
}

export const useSearchPosts = (searchTerm) => {
   return useQuery({
    queryKey: ['searchedPosts', searchTerm],
    queryFn: () => searchPosts(searchTerm),
    enabled: !!searchTerm
   })
}

export const useCreateComment = () => {

    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (comment) => createComment(comment),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getRecentComments'],
        });
      },
    });
  };

export const useGetRecentComments = () => {
    return useQuery({
      queryKey: ['getRecentComments'],
      queryFn: getRecentComments
    });
  };

export const useGetUserById = (userId) => {
  return useQuery({
    queryKey: ['getUserById', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => updateUser(user),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['getCurrentUser'],
      })
      queryClient.invalidateQueries({
        queryKey: ['getUserById', data?.$id],
      })

    }
  })
}