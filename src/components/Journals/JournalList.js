/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/jsx-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import React, { useReducer, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { FiSearch } from 'react-icons/fi';
import Pagination from '../Pagination/Pagination';
import {
  Box,
  Preview,
  Head2,
  Authors,
  Head3,
  Description,
  Search,
  SearchTerm,
  SearchButton,
} from './styles';
import GET_ALL_JOURNALS from '../../graphql/queries/getAllJournals';
import reducer from '../../useReducer/Journals/reducer';

const JournalList = () => {
  const initialState = {
    posts: [],
    searchResults: [],
    currentPage: 1,
    search: '',
    postsPerPage: 10,
  };

  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, loading } = useQuery(GET_ALL_JOURNALS, {
    variables: { currentPageNumber: currentPage, limitValue: 10 },
  });

  console.log({ data });

  // const indexOfLastPost = state.currentPage * state.postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - state.postsPerPage;
  let journalsOnCurrentPage;

  if (data) {
    journalsOnCurrentPage = data.getAllJournals.journals;
  }

  if (loading) {
    return <h2>loading...</h2>;
  }
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <Search>
          <SearchTerm
            id='search'
            type='text'
            placeholder='Search Journal'
            value={state.search}
            onChange={(e) => dispatch({ type: 'SEARCH', payload: e.target.value })}
          />
          <SearchButton type='submit'>
            <FiSearch />
          </SearchButton>
        </Search>
      </form>
      <Box>
        {journalsOnCurrentPage.map((blog) => (
          <Preview key={blog.id}>
            <Head2 primary>{blog.domainName}</Head2>
            <Link to={`/policy/${blog.issn}`}>
              <Head2>{blog.title}</Head2>
              <Authors>
                <Head3 secondary>{blog.createdBy}</Head3>
              </Authors>
              <Description>
                <Head3>{blog.domainName} |</Head3>
                <Head3>ISSN: {blog.issn}</Head3>
              </Description>
              <Head3>
                <span style={{ color: '#EC8D20' }}>First Published: </span>
                {blog.createdAt}
              </Head3>
            </Link>
          </Preview>
        ))}
        <Pagination
          postsPerPage={10}
          totalPosts={data.getAllJournals.totalJournals}
          paginate={paginate}
        />
      </Box>
    </>
  );
};

export default JournalList;
