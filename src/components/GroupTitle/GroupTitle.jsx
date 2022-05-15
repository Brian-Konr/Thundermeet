import {
  Input,
} from 'antd';

import './GroupTitle.css';

export default function GroupTitle({
  isEdit, groupTitle, setGroupTitle,
}) {
  if (isEdit === false) {
    return (
      <div className="header">
        <h1 className="group-title">{groupTitle}</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="header">
        <h1 className="group-name">Group Name</h1>
      </div>
      <hr />
      <Input className="edit-title" style={{ width: '35%' }} defaultValue={groupTitle} onChange={(e) => { setGroupTitle(e.target.value); }} />
    </div>
  );
}
