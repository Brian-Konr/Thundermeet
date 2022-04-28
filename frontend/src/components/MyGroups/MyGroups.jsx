import './MyGroups.css';

export default function MyGroups() {
  return (
    <div>
      <h1 className="section-title">My Groups</h1>
      <hr />
      <div className="groups">
        <p className="card default-card">已參與 Participated</p>
        <p className="card default-card">已確認 Confirmed</p>
        <p className="card default-card">已發起 Created</p>
        <p className="card custom-card">SAD</p>
      </div>
    </div>
  );
}
