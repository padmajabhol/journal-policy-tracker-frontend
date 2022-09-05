/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch';
import GET_ALL_JOURNAL_DETAILS from '../../graphql/queries/getFullJournalByISSN';
import UPDATE_JOURNAL from '../../graphql/mutation/updateJournal';
import {
  Head,
  Label,
  Toggle,
  Input,
  FirstDiv,
  Subhead,
  Icon,
  Subhead2,
  Select,
  SecondDiv,
  Form,
  Div,
  ToggleContainer,
} from '../AddJournal/styles';
import { FormInputBtn } from '../Authentication/styles';
import { useGlobalContext } from '../../context/DataContext';
import { SectionLayout, PolicyContainer } from '../marginals';

const Edit = () => {
  const [post, setPost] = useState([]);

  const { issn } = useParams();

  const { data, loading, error, refetch } = useQuery(GET_ALL_JOURNAL_DETAILS, {
    variables: { issn: '12345678' },
  });

  useEffect(() => {
    setTitle(data?.getJournalByISSN?.title);
  }, [data?.getJournalByISSN?.title]);

  console.log({ journalDataFromISSN: data });

  useEffect(() => {
    if (loading === false) {
      setPost(data?.getJournalByISSN);
    }
  }, [data?.getJournalByISSN, loading]);

  const [title, setTitle] = useState('erererererererere');
  const [domain, setDomain] = useState('tst domain');
  const [url, setUrl] = useState('test url 2341234');
  const [policy, setPolicy] = useState('NUMBER_ONE');
  const [dataavail, setDataavail] = useState(false);
  const [datashared, setDatashared] = useState(false);
  const [peerreview, setPeerreview] = useState(false);
  const [enforced, setEnforced] = useState('YES');
  const [evidence, setEvidence] = useState('tst evidence');
  const [policyTitle, setPolicyTitle] = useState('etst policy title');
  const [firstYear, setFirstYear] = useState(9999);

  const [updateJournal, { data: updateJournalData, error: updateJournalError }] =
    useMutation(UPDATE_JOURNAL);

  const handleChangeData = (nextChecked) => {
    setDataavail(nextChecked);
  };
  const handleChangeData2 = (nextChecked) => {
    setDatashared(nextChecked);
  };
  const handleChangePeer = (nextChecked) => {
    setPeerreview(nextChecked);
  };

  console.log(updateJournalData);

  const editJournal = async (event) => {
    event.preventDefault();
    const response = await updateJournal({
      variables: {
        issnToUpdate: issn,
        newJournalDetails: {
          title,
          url,
          issn: 'changed ISSN STRING',
          domainName: domain,
          policies: {
            title: policyTitle,
            firstYear,
            policyType: policy,
            isDataAvailabilityStatementPublished: dataavail,
            isDataShared: datashared,
            isDataPeerReviewed: peerreview,
            enforced,
            enforcedEvidence: evidence,
          },
        },
      },
    });
    console.log({ response });
  };

  return (
    <SectionLayout>
      <PolicyContainer>
        <>
          <Head>Edit Journal Policies</Head>
          <Form onSubmit={editJournal}>
            <Label>Journal title</Label>
            <Input type='text' required value={title} onChange={(e) => setTitle(e.target.value)} />
            <FirstDiv>
              <div>
                <Label>ISSN Number</Label>
                <Input
                  type='text'
                  required
                  value='12345678'
                  // onChange={(e) =>}
                />
              </div>
              <div>
                <Label>Enforced Evidence</Label>
                <Input
                  type='text'
                  required
                  // value={editEvidence}
                  // onChange={(e) =>}
                />
              </div>
            </FirstDiv>

            <FirstDiv>
              <div>
                <Label>Domain</Label>
                <Input
                  type='text'
                  required
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                />
              </div>
              <div>
                <Label>Source</Label>
                <Input type='text' required value={url} onChange={(e) => setUrl(e.target.value)} />
              </div>
            </FirstDiv>

            <Subhead>
              <Icon>
                <FontAwesomeIcon icon={faBookmark} color='#EC8D20' />
              </Icon>
              <Subhead2>Policies</Subhead2>
            </Subhead>

            <Div>
              <SecondDiv>
                <div>
                  <Label>Policy Type:</Label>
                  <Select value={policy} onChange={(e) => setPolicy(e.target.value)}>
                    <option value='NUMBER_ONE'>NUMBERONE</option>
                    <option value='NUMBER_TWO'>NUMBER 2</option>
                    <option value='NUMBER_THREE'>NUMBER 3</option>
                  </Select>
                </div>
                <div>
                  <Label>Enforced:</Label>
                  <Select value={enforced} onChange={(e) => setEnforced(e.target.value)}>
                    <option value='YES'>Yes - before publication</option>
                    <option value='NO'>Policy 2</option>
                  </Select>
                </div>
              </SecondDiv>
              <SecondDiv primary>
                <ToggleContainer primary>
                  <Div primary>
                    <Label>Data Availability Statement Published:</Label>
                    <Label htmlFor='material-switch'>
                      <Toggle>
                        <Switch
                          // onChange={(nextChecked) => }
                          // checked={editDataavail}
                          onColor='#ef9c38'
                          handleDiameter={22}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                          activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
                          height={28}
                          width={54}
                          className='react-switch'
                          id='material-switch'
                        />
                      </Toggle>
                    </Label>
                  </Div>
                  <Div primary>
                    <Label>Data Peer Reviewed:</Label>
                    <Label htmlFor='material-switch'>
                      <Toggle>
                        <Switch
                          // onChange={(nextChecked) =>}
                          // checked={editPeerreview}
                          onColor='#ef9c38'
                          handleDiameter={22}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                          activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
                          height={28}
                          width={54}
                          className='react-switch'
                          id='material-switch'
                        />
                      </Toggle>
                    </Label>
                  </Div>
                  <Div primary>
                    <Label>Data Shared:</Label>
                    <Label htmlFor='material-switch'>
                      <Toggle>
                        <Switch
                          // onChange={(nextChecked) => }
                          onColor='#ef9c38'
                          handleDiameter={22}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
                          activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
                          height={28}
                          width={54}
                          className='react-switch'
                          id='material-switch'
                        />
                      </Toggle>
                    </Label>
                  </Div>
                </ToggleContainer>
              </SecondDiv>
            </Div>

            <FormInputBtn type='submit'>Submit</FormInputBtn>
          </Form>
        </>
      </PolicyContainer>
    </SectionLayout>
  );
};

export default Edit;
