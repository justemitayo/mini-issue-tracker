import React, { useState } from 'react'
import SearchModal from '../SearchModal/SearchModal';
import IssueList from '../IssueList/IssueList';
import IssueClear from '../IssueClear/IssueClear';

const IssuePage = () => {
    const [searching, setSearching] = useState(false);
  return (
    <>
    <SearchModal setSearching={setSearching} />
    {!searching && <IssueList />}
    <IssueClear />
    </>
  )
}

export default IssuePage