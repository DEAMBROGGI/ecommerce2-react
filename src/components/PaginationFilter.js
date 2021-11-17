import  { useState } from "react";
import {useStateValue} from '../StateProvider';
import {actionTypes} from '../reducer'

function usePaginationFilter( {result},itemsPerPage) {
const [{filterProducts, currentPage},dispatch] = useStateValue();
  
  const maxPage = Math.ceil(result?.length / 6);
  console.log(currentPage)

  function currentData() {
    const begin = (currentPage - 1) * 6;
    const end = begin + 6;
    return result?.slice(begin, end);
  }
  function next() {
    dispatch({
      type: actionTypes.CURRENT_PAGE,
      currentPage:Math.min(currentPage + 1, maxPage)
    })
    //setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
  }
  function prev() {
    dispatch({
      type: actionTypes.CURRENT_PAGE,
      currentPage:Math.max(currentPage - 1, 1)
    })
   // setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  }
  function jump(page) {
    const pageNumber = Math.max(1, page);
    dispatch({
      type: actionTypes.CURRENT_PAGE,
      currentPage:Math.min(pageNumber, maxPage)
    })
    //setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
  }
  return { next, prev, jump, currentData,  maxPage };
}

export default usePaginationFilter;
