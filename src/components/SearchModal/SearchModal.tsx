import React, { useEffect, useMemo, useState } from 'react'
import './SearchModal.css'
import { useIssueStore } from '../../store/IssueStore';
import IssueCard from '../issueCard/IssueCard';
import toast from 'react-hot-toast';

interface SearchModalProps {
  setSearching: (value: boolean) => void;
}


const SearchModal:React.FC<SearchModalProps> = ({ setSearching }) => {
  
  const issues = useIssueStore().issues
  const add_issue = useIssueStore().add_issue


  const [search, setSearch] = useState<string>('');
  const [status, setStatus] = useState<"Open" | "Closed" | "">("");
  const [priority, setPriority] = useState<"Low" | "Med" | "High" | "">("");
  const [filterPriority, setFilterPriority] = useState<"Low" | "Med" | "High" | "">("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('');
 

  useEffect(() => {
    const isFiltering = search !== "" || status !== "" || filterPriority !== "";
    setSearching(isFiltering);
  }, [search, status, filterPriority, setSearching]);
  

  const filteredIssues = useMemo(() => {
    let result = [...issues];

    if (status) {
      result = result.filter((issue) => issue.status === status);
    }
    if (filterPriority) {
      result = result.filter((issue) => issue.priority === filterPriority);
    }
    if (search) {
      result = result.filter((issue) =>
        issue.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    return result;
  }, [issues, search, status, filterPriority]);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setNewTitle("");
    setNewDescription("");
    setPriority("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTitle.trim() || !newDescription.trim() || !priority) {
      toast.error('All fields are required!');
      return;
    }

    await add_issue({
      title: newTitle,
      description: newDescription,
      priority: priority,
      status: "Open",
    });

    toast.success('New issue created successfully!');
    closeModal();
  };


  return (
    <div className='search'>
      <div className='search-top'>
        <input type='text' placeholder='search for issues...'  value={search} onChange={(e) => setSearch(e.target.value)} autoFocus/>
        <button className='pix' onClick={openModal}>Add Issue</button>
      </div>
      <div className="search-mid">
        {(["High", "Med", "Low"] as const).map((p) => (
          <div
            key={p}
            className={`${p.toLowerCase()} ${filterPriority === p ? "active" : ""}`}
            onClick={() => setFilterPriority(p === filterPriority ? "" : p)}
          >
            {p}
          </div>
        ))}
      </div>

      <div className="search-low">
        {(["Open", "Closed"] as const).map((s) => (
          <div
            key={s}
            className={`${s.toLowerCase()} ${status === s ? "active" : ""}`}
            onClick={() => setStatus(s === status ? "" : s)}
          >
            {s}
          </div>
        ))}
      </div>
      <div className="search-results">
        {(search || status || filterPriority) ? (
       filteredIssues.length === 0 ? (
        <div>No issues found</div>
      ) : (
        filteredIssues.map((issue) => (
        <IssueCard key={issue.id} {...issue} />
      ))
    )
    ) : null}
  </div>
  {showModal &&
    <div className='side-modal'>
      <div className='modal-content'>
        <div className='side-top'>
          <h2>Create New Issue</h2>
        </div>
      <form onSubmit={handleSubmit}>

      <label htmlFor='title'>Title</label>
            <input
              id='title'
              type="text"
              placeholder="Edit title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className=""

            />
            <label htmlFor='description'>Description:</label>
            <textarea
                id='description'
                className=""
                placeholder='Edit description...'
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                autoFocus
            />
            <div className="priority-select">
                <p>Priority:</p>
                {(["High", "Med", "Low"] as const).map((p) => (
                  <div
                    key={p}
                    className={`priority-btn ${p.toLowerCase()} ${priority === p ? "active" : ""}`}
                    onClick={() => setPriority(p)}
                  >
                    {p}
                  </div>
                ))}
            </div>
            <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  Create
                </button>
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
            </div>
      </form>
      </div>
    </div>

  }
    </div>
  )
}

export default SearchModal