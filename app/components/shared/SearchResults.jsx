import { GridPostList } from "./GridPostList";
import {Loading} from "./Loading";

export const SearchResults = ({isSearchFetching, searchedPosts }) => {
  if(isSearchFetching) return <Loading />

  if(searchedPosts && searchedPosts.documents.length > 0) {
    return (
      <GridPostList posts={searchedPosts.documents}/>
    )
  }
  return (
    <p className="mt-10 text-center w-full">No results found</p>
  )
};