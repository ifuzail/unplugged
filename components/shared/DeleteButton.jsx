"use client";

import {
  useDeleteComment,
  useDeletePost,
} from "@/lib/react-query/queryAndMutation";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";

export const DeleteButton = ({ post }) => {
    
  const { user } = useUserContext();
  const router = useRouter();

  const { mutateAsync: deletePost, isPending: isLoadingDelete } =
    useDeletePost();
  const { mutateAsync: deleteComment } = useDeleteComment();



  const handleDeletePost = async () => {
    try {
      const commentIds = post?.comments.map((comment) => comment.$id);

      if (commentIds && commentIds.length > 0) {
        await Promise.all(
          commentIds.map(async (commentId) => {
            try {
              // Delete the comment using its ID
              await deleteComment(commentId);
            } catch (error) {
              console.error(`Error deleting comment ${commentId}:`, error);
            }
          })
        );
      }

      const deletedPost = await deletePost({
        post,
        postId: post.$id,
        imageId: post?.imageId,
        videoId: post?.videoId ? post?.videoId : null,
      });

      if (deletedPost && deletedPost.status === "ok") {
        router.push("/");
      } else {
        console.error("Failed to delete post.");
        // Optionally, you can show an error message or handle the failure in another way.
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      // Handle the error accordingly, e.g., show an error message to the user.
    }
  };

  return (
    <div>
      <Button
        onClick={handleDeletePost}
        variant="ghost"
        className={user.id !== post?.creator.$id && "hidden"}>
        <Trash className={isLoadingDelete ? "text-red-500" : "text-red-600"} />
      </Button>
    </div>
  );
};
