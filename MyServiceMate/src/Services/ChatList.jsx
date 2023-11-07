// ChatList.js
import React from 'react';

const ChatList = ({ chattedUsers, onSelectUser }) => {
  return (
    <div className="chat-list">
      {chattedUsers.map((user) => (
        <div key={user.id} onClick={() => onSelectUser(user)}>
          {user.username}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
