import { GridPostList } from "./GridPostList";
import Loader from "./Loader";

export const SearchResults = ({isSearchFetching, searchedPosts }) => {
  if(isSearchFetching) return <Loader />

  if(searchedPosts && searchedPosts.documents.length > 0) {
    return (
      <GridPostList posts={searchedPosts.documents}/>
    )
  }
  return (
    <p className="mt-10 text-center w-full">No results found</p>
  )
};