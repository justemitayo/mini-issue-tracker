import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useIssueStore } from '../../store/IssueStore';
import { Type } from '../../Interface/type';
import { useNavigate } from "react-router-dom";
import back from '../../assets/Back_Arrow.png'
import './IssueDetail.css'

const IssueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const issues = useIssueStore().issues;
  const [issue, setIssue] = useState<Type | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const page = issues.find((i) => i.id === id);
    if (page) setIssue(page);
  }, [id, issues]);

  if (!issue) {
    return (
      <div className="issue-detail not-found">
        <p>Issue not found</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    )
  }


  return (
    <div className='issue-detail'>
      <div className="btp-header">
        <img alt='' src={back} className='back' onClick={() => navigate(-1)}/>
      </div>
      <div className="detail-header">
        <h2>{issue.title}</h2>
        <span className={`priority-tag ${issue.priority.toLowerCase()}`}>
          {issue.priority}
        </span>
      </div>

      <p className="issue-status">
        Status: <span className={issue.status.toLowerCase()}>{issue.status}</span>
      </p>

      <p className="issue-description">{issue.description}</p>

      <div className="issue-meta">
        <p><strong>Created:</strong> {new Date(issue.createdAt).toLocaleString()}</p>
      </div>
    </div>
  )
}

export default IssueDetail