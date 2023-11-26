import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export const StoryList = ({user}) => {

  const params = useParams()

  return (
    <ul className="grid md:grid-cols-3 grid-cols-2 gap-2 p-5">
      {user?.stories?.map((story) => (
      <Link href={`/story/${user?.$id}/${story?.$id}`}>
        <Image
          src={story?.imageUrl}
          width={500}
          height={500}
          alt="image-post"
          className="h-[360px] w-[220px] object-cover rounded-xl "
        />
      </Link>
      ))}
    </ul>
  );
};
