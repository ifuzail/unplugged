import Image from "next/image";
import Link from "next/link";
import { FollowButton } from "../shared/FollowButton";

export const AllUsersCard = ({ user }) => {
  return (
    <section className="flex flex-row items-center gap-6">
      <Link href={`/profile/${user.$id}`}>
        <Image
          src={user.imageUrl || "/default-user.png"}
          width={500}
          height={500}
          alt="user-profile"
          className="rounded-full md:w-32 md:h-32 w-24 h-24 object-cover object-top"
        />
      </Link>
      <div className="flex flex-col justify-start items-start">
        <p className="md:text-3xl text-xl font-bold text-zinc-200">
          {user?.name}
        </p>
        <p className="text-sm text-zinc-400">@{user?.username}</p>
        <FollowButton currentUser={user} />
      </div>
    </section>
  );
};
