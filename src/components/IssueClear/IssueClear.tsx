import React, { useState } from 'react'
import toast from "react-hot-toast";
import { useIssueStore } from '../../store/IssueStore';
import './IssueClear.css'

const IssueClear = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const clear_issues = useIssueStore().clear_issues

  const handleClear = () => {
    clear_issues();
    setShowConfirm(false);
    toast.success("All issues cleared!");
  };

  return (
    <div className="issue-clear">
    <button onClick={() => setShowConfirm(true)} className="clear-btn">
      Clear All Issues
    </button>

    {showConfirm && (
      <div className="confirm-modal">
        <p>Are you sure you want to clear all issues?</p>
        <div className="actions">
          <button onClick={handleClear}>Yes, clear</button>
          <button onClick={() => setShowConfirm(false)}>Cancel</button>
        </div>
      </div>
    )}
  </div>
  )
}

export default IssueClear