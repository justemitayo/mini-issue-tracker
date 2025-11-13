import { useEffect } from "react";
import { useIssueStore } from "../../store/IssueStore";
import IssueCard from "../issueCard/IssueCard";

import './IssueList.css'


const IssueList = () => {
  const issues = useIssueStore().issues
  const get_issues = useIssueStore().get_issues
  const loading = useIssueStore().loading


  useEffect(() => {
    get_issues();
  }, [get_issues]);

  if (loading) return <p>Loading issues...</p>;
  

  const sortedIssues = [...issues].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );

  return (
    <div className="issue-list">
      {sortedIssues.length > 0 ? (
        sortedIssues.map((issue) => (
          <IssueCard key={issue.id} {...issue} />
        ))
      ) : (
        <div className="no-issues">
          <p>No issues found.</p>
          <small>Create a new one to get started 🚀</small>
        </div>
      )}
    </div>
  );
};

export default IssueList;
