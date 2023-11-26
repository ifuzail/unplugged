import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from '@tanstack/react-query';
import { createComment, createPost, createStory, createUserAccount, createVideoPost, deleteComment, deletePost, deleteSavedPost, deleteStory, followUser, getCurrentUser, getInfinitePosts, getPostById, getRecentComments, getRecentPosts, getRecentStories, getStoryById, getUserById, getUsers, likePost, savePost, searchPosts, signInAccount, signOutAccount, updatePost, updateUser, updateVideoPost } from '../app-write/api';

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
export const useCreateStory = () => {
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: (story) => createStory(story),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['getStoryById', data?.$id]
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
        mutationFn: (post) => likePost(post),
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
export const useFollowUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user) => followUser(user),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['getUserById' , data?.$id]
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

export const useGetStoryById = (storyId) => {
  return useQuery({
    queryKey: ['getStoryById', storyId],
    queryFn: () => getStoryById(storyId),
    enabled: !!storyId,
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

export const useUpdateVideoPost = () => {
  const queryClient  = useQueryClient();

  return useMutation({
   mutationFn: (videoPost) => updateVideoPost(videoPost),
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
    mutationFn: (post) => deletePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getRecentPosts'],
      });
    }
  })
}

export const useDeleteStory = () => {
  const queryClient  = useQueryClient();

  return useMutation({
    mutationFn: (story) => deleteStory(story),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getRecentStories'],
      });
    }
  })
}

export const useDeleteComment = () => {
  const queryClient  = useQueryClient();

  return useMutation({
    mutationFn: (commentId) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getRecentComments'],
      });
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
  
export const useGetRecentStories = () => {
    return useQuery({
      queryKey: ['getRecentStories'],
      queryFn: getRecentStories
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

export const useGetUsers = (limit) => {
  return useQuery({
    queryKey: ['getUsers'],
    queryFn: () => getUsers(limit)

  })
}