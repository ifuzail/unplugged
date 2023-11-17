import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query';
import { createPost, createUserAccount, createVideoPost, deletePost, deleteSavedPost, getCurrentUser, getInfinitePosts, getPostById, getRecentPosts, likePost, savePost, searchPosts, signInAccount, signOutAccount, updatePost } from '../app-write/api';

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

export const useSavePost = () => {

    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (userId, postId) => savePost(userId, postId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getRecentPosts'],
        });
        queryClient.invalidateQueries({
          queryKey: ['getPosts'],
        });
        queryClient.invalidateQueries({
          queryKey: ['getCurrentUser'],
        });
      },
    });
  };
  
export const useDeleteSavedPost = () => {

    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (savedRecordId) =>
        deleteSavedPost(savedRecordId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['getRecentPosts'],
        });
        queryClient.invalidateQueries({
          queryKey: ['getPosts'],
        });
        queryClient.invalidateQueries({
          queryKey: ['getCurrentUser'],
        });
      },
    });
  };

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