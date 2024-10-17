import React, { useState } from 'react';

interface NewIssueModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, description: string) => void;
}

const NewIssueModal: React.FC<NewIssueModalProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (title && description) {
      onCreate(title, description);
      setTitle('');
      setDescription('');
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className="new-issue-modal-overlay">
      <div className="new-issue-modal">
        <h2>New Issue</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button onClick={handleCreate} className="create-button">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewIssueModal;
