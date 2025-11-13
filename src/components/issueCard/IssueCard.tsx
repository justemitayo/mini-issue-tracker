import React, { useState } from 'react'
import './IssueCard.css'
import { useIssueStore } from '../../store/IssueStore';
import { Type } from '../../Interface/type';
import { formatDistanceToNow } from 'date-fns';
import { Edit, Trash2 } from "lucide-react";
import { useNavigate } from 'react-router-dom';


interface IssueCardProps extends Type {}
const IssueCard: React.FC<IssueCardProps> = ({ id, title, description, status, priority, createdAt }: IssueCardProps) => {

  const navigate = useNavigate()

  const edit_issue = useIssueStore().edit_issue
  const remove_issue = useIssueStore().remove_issue
  const toggle_status = useIssueStore().toggle_status

  const [canEdit, setCanEdit] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState('')
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = () => {
    navigate(`/issue/${id}`);
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.stopPropagation()
    e.preventDefault();
    await edit_issue(id, { title: editTitle, description: editDescription });
    setCanEdit(false);
  };

  const handleStartEdit = () => {

    setEditTitle(title);       
    setEditDescription(description); 
    setCanEdit(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    remove_issue(id);
    setShowConfirm(false);
  };

  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div className='card' onClick={handleClick}>
      <div className='card-component'>
        { canEdit ? (
          <form onSubmit={handleEdit}>
            <label htmlFor='title'>Title</label>
            <input
              id='title'
              type="text"
              placeholder="Edit title..."
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className=""
            />
            <label htmlFor='description'>Description:</label>
            <textarea
                id='description'
                className=""
                placeholder='Edit description...'
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                autoFocus
            />
            <button type='submit'>Save</button>  
            <button type="button" onClick=
            {(e) => {
              setCanEdit(false);
              e.stopPropagation()
            }}>Cancel</button>
          </form> 
        ) : (
          <div className='card-content'>
            <div className='card-right'>
              <h1>{title.length > 25 ? title.slice(0, 25) + "..." : title}</h1>
              <p><p>{description.length > 80 ? description.slice(0, 80) + "..." : description}</p></p>
              <div className='card-right-bottom'>
                <span>created: {timeAgo}</span>
                 <span className={`priority-${priority.toLowerCase()}`}>{priority}</span>
              </div>
            </div>
            <div className='card-left'>
            <Edit
              size={24}
              color="rgb(87, 165, 255)"
              onClick={(e) => {
                e.stopPropagation();
                handleStartEdit();
              }}
              style={{ cursor: "pointer" }}
            />

            <Trash2
              size={24}
              color="rgb(200, 0, 0)"
              onClick={handleDeleteClick}
              style={{ cursor: "pointer" }}
            />

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggle_status(id);
                }}>
                {status}</button>
            </div>
          </div>
        )
        }
        {showConfirm && (
          <div className="confirm-modal">
            <p>Are you sure you want to delete this issue?</p>
            <div className="actions">
              <button onClick={(e) => {
                e.stopPropagation()
                confirmDelete()
                }}>Yes, delete</button>
              <button onClick={(e) => { 
                e.stopPropagation(); 
                setShowConfirm(false); }}>
                  Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default IssueCard