import React from "react";
import { Route, Routes } from "react-router-dom";
import Search from "./components/Search";
import SearchResult from "./components/SearchResult";

const SearchIndex = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<Search />}></Route>
        <Route path="/:searchText" element={<SearchResult />} />
      </Routes>
    </>
  );
};

export default SearchIndex;
