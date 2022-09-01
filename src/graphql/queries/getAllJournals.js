import { gql } from '@apollo/client';

const GET_ALL_JOURNALS = gql`
  query GetAllJournals($currentPageNumber: Int!, $limitValue: Int!) {
    getAllJournals(currentPageNumber: $currentPageNumber, limitValue: $limitValue) {
      id
      title
      url
      issn
      domainName
      createdAt
      updatedAt
      createdBy
      policies {
        title
        firstYear
        lastYear
        policyType
        isDataAvailabilityStatementPublished
        isDataShared
        isDataPeerReviewed
        enforced
        enforcedEvidence
      }
    }
  }
`;

export default GET_ALL_JOURNALS;
