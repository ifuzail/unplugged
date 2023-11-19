import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { multiFormatDateString } from "@/lib/utils";
import { EditIcon } from "lucide-react";
import { useUserContext } from "@/context/AuthContext";
import Image from "next/image";
import { PostStats } from "../shared/PostStats";

export const PostCard = ({ post }) => {
  const { user } = useUserContext();

  if (!post.creator) return;

  return (
    <Card className="bg-zinc-900 rounded-3xl border border-zinc-800 lg:p-7 w-full max-w-screen-sm p-5">
      <CardContent className="flex flex-row gap-3 text-white justify-between items-center p-3">
        <Link
          href={`/profile/${post.creator.$id}`}
          className="flex flex-row gap-3">
          <Image
            width={500}
            height={500}
            src={post?.creator?.imageUrl || "/default-user.png"}
            alt="creator"
            className="rounded-full w-12 h-12 object-cover object-top"
          />
          <div className="flex flex-col">
            <p className="font-bold">{post.creator.name}</p>
            <div className="flex items-center gap-2 text-zinc-400 font-semibold ">
              <p>{multiFormatDateString(post.$createdAt)}</p>-
              <p>{post.location}</p>
            </div>
          </div>
        </Link>
        <Link
          href={`/edit-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}>
          <EditIcon className="w-5 text-primary-Eleevan hover:text-zinc-200" />
        </Link>
      </CardContent>
      <CardContent>
        <Link href={`/post/${post.$id}`}>
          <div className="py-5">
            <p className="text-zinc-200 text-xl font-semibold hover:underline">
              {post.caption}
            </p>
            <ul className="flex gap-1 mt-2 text-zinc-300">
              {post.tags.map((tag, index) => (
                <li key={`${tag}${index}`} className="">
                  #{tag}
                </li>
              ))}
            </ul>
          </div>
          <Image
            priority
            src={post.imageUrl}
            width={500}
            height={500}
            alt="post image"
            className="h-64 xs:h-[400px] lg:h-[450px] w-full rounded-[24px] mb-5 object-cover"
          />
        </Link>
        <div>
          <PostStats post={post} userId={user.$id} />
        </div>
      </CardContent>
    </Card>
  );
};
