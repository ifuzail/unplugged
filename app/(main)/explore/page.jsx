"use client"

import { GridPostList } from "@/components/GridPostList";
import Loader from "@/components/Loader";
import { SearchResults } from "@/components/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queryAndMutation";
import { FilterIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Explore = () => {

  const {ref , inView } = useInView();
  const {data: posts, fetchNextPage, hasNextPage} = useGetPosts();

  const [searchValue, setSearchValue] = useState('');

  const debouncedValue = useDebounce(searchValue, 500);
  const {data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedValue);

  useEffect(() => {
   if(inView && !searchValue) fetchNextPage();
  }, [inView, searchValue])
  


  if(!posts) {
    return (
      <div className="flex items-center justify-center w-full mt-10">
        <Loader />
      </div>
    )
  }

  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item.documents.length === 0)

  
  return (
    <div className="h-[100vh] overflow-y-scroll custom-scrollbar">
      <div className="p-5">
        <h2 className="font-bold text-2xl mt-4">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-zinc-900 items-center p-2 mt-5">
            <Search />
            <Input 
             type='text'
             placeholder='Search'
             className='bg-zinc-900 border-none'
             value={searchValue}
             onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
      </div>
      <div className="flex justify-between w-full max-w-5xl mt-15 p-5 items-center">
        <h3 className="font-bold text-2xl ">Popular Today</h3>
      </div>

      <div className="flex flex-wrap gap-9 items-center">
          {shouldShowSearchResults ? (
            <SearchResults isSearchFetching={isSearchFetching} searchedPosts={searchedPosts}
            />
          ) : shouldShowPosts ? (
            <p className="text-zinc-300 mt-10 text-center w-full">End of Posts</p>
          ) : posts.pages.map((item, index) => (
            <GridPostList key={`page=${index}`} posts={item.documents} />
          ))}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Explore;