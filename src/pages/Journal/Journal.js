/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useQuery } from '@apollo/client';
import { Journals } from '../../components';
import { Container } from '../../components/Journals/styles';
import { useGlobalContext } from '../../context/DataContext';
import GET_FULL_JOURNAL_BY_ISSN from '../../graphql/queries/getFullJournalByISSN';

const Journal = () => {
  const { data, loading, error } = useQuery(GET_FULL_JOURNAL_BY_ISSN, {
    variables: { issn: '61549896' },
  });

  console.log({ data });
  // const { search, loading, postsPerPage, paginate, currentPost, dispatch, currentPage } =
  //   useGlobalContext();
  if (loading) {
    return <h2>loading...</h2>;
  }
  return (
    <Container>
      <h1 style={{ marginTop: '5rem' }}>journals</h1>
      {/* {currentPost.length ? (
        <Journals
          currentPage={currentPage}
          // posts={currentPost}
          search={search}
          loading={loading}
          postsPerPage={postsPerPage}
          // totalPosts={posts.length}
          paginate={paginate}
          dispatch={dispatch}
        />
      ) : (
        <p>No posts to display</p>
      )} */}
    </Container>
  );
};

export default Journal;
