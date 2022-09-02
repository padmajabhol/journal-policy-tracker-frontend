/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import React, { useReducer, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Journals } from '../../components';
import { Container } from '../../components/Journals/styles';
import { useGlobalContext } from '../../context/DataContext';
import GET_FULL_JOURNAL_BY_ISSN from '../../graphql/queries/getFullJournalByISSN';
import GET_ALL_JOURNALS from '../../graphql/queries/getAllJournals';
import reducer from './reducer';

const Journal = () => {
  const initialState = {
    posts: [],
    searchResults: [],
    currentPage: 1,
    search: '',
    postsPerPage: 5,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // const { data, loading, error } = useQuery(GET_FULL_JOURNAL_BY_ISSN, {
  //   variables: { issn: '61549896' },
  // });

  const { data, loading } = useQuery(GET_ALL_JOURNALS, {
    variables: { currentPageNumber: state.currentPage, limitValue: state.postsPerPage },
  });

  useEffect(() => {
    dispatch({ type: 'POSTS', payload: data?.getAllJournals });
  }, [data?.getAllJournals]);
  console.log(data);
  console.log(data?.getAllJournals);

  console.log(state.posts);

  // useEffect(() => {
  //   const filteredResults = state.posts.filter(
  //     (post) =>
  //       post.issn.includes(state.search) ||
  //       post.title.toLowerCase().includes(state.search.toLowerCase()),
  //   );

  //   dispatch({ type: 'SEARCH_RESULTS', payload: filteredResults.reverse() });
  // }, [state.posts, state.search]);

  // const indexOfLastPost = state.currentPage * state.postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - state.postsPerPage;
  // const currentPost = state.searchResults.slice(indexOfFirstPost, indexOfLastPost);
  // console.log(state.posts);
  // const paginate = (pageNumber) => dispatch({ type: 'CURRENT_PAGE', payload: pageNumber });

  if (loading) {
    return <h2>loading...</h2>;
  }
  // console.log(state.posts.length);
  return (
    <Container>
      hi
      <h1 style={{ marginTop: '5rem' }}>journals</h1>
      <Journals />
      {/* {data?.getAllJournals.length ? (
        <Journals
          // currentPage={state.currentPage}
          posts={state.posts}
          // search={state.search}
          loading={loading}
          // postsPerPage={state.postsPerPage}
          // totalPosts={state.posts.length}
          // paginate={paginate}
          // dispatch={dispatch}
        />
      ) : (
        <p>No posts to display</p>
      )} */}
    </Container>
  );
};

export default Journal;
