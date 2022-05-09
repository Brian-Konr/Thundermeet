import './Avatar.css';

export default function Avatar({ userName, userID }) {
  return (
    <div className="box">
      <p className="avatar">{userName.charAt(0)}</p>
      <p className="user-name">{userName}</p>
      <p className="user-id">{userID}</p>
    </div>
  );
}
