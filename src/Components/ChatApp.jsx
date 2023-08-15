import React, { useState, useEffect, useRef } from 'react';
import './ChatApp.css';

function ChatApp({ senderName, receiverName }) {
  const [messages, setMessages] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const clickOutsideRef = useRef();
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  const dummyMessages = [
    { id: 1, text: "Hey, how's it going?", sender: 'sender', timestamp: '2023-08-15T10:30:00' },
    { id: 2, text: 'Hi there! I\'m doing well, thanks.', sender: 'receiver', timestamp: '2023-08-15T10:35:00' },
    { id: 3, text: "What did you do over the weekend?", sender: 'sender', timestamp: '2023-08-15T11:20:00' },
    { id: 4, text: 'I went hiking and relaxed.', sender: 'receiver', timestamp: '2023-08-15T11:25:00' },
    { id: 5, text: 'Sounds like a great way to spend the weekend!', sender: 'sender', timestamp: '2023-08-15T12:15:00' },
    { id: 6, text: 'Absolutely! Nature is so refreshing.', sender: 'receiver', timestamp: '2023-08-15T12:20:00' },
    { id: 7, text: 'Did you catch the latest movie?', sender: 'receiver', timestamp: '2023-08-15T13:10:00' },
    { id: 8, text: 'No, I haven\'t had a chance yet. How was it?', sender: 'sender', timestamp: '2023-08-15T13:15:00' },
    { id: 9, text: 'It was fantastic! You should definitely watch it.', sender: 'receiver', timestamp: '2023-08-15T14:05:00' },
    { id: 10, text: 'That sounds intriguing. I\'ll check it out!', sender: 'sender', timestamp: '2023-08-15T14:10:00' },
    // Add more dummy messages here
  ];
  
  


  useEffect(() => {
    setMessages(dummyMessages);
  }, []);

  const handleLongPress = (messageId) => {
    setShowDeleteButton(messageId);
  };

  const handleDeleteMessage = (messageId) => {
    const updatedMessages = messages.filter((message) => message.id !== messageId);
    setMessages(updatedMessages);
    if (showDeleteButton === messageId) {
      setShowDeleteButton(null);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    const newMessageObj = { id: Date.now(), text: newMessage, sender: 'sender' };
    const updatedMessages = [...messages, newMessageObj];
    setMessages(updatedMessages);
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleClickOutside = (e) => {
    if (clickOutsideRef.current && !clickOutsideRef.current.contains(e.target)) {
      setShowDeleteButton(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const renderMessage = (message) => (
    <div
      key={message.id}
      className={`message ${message.sender} ${showDeleteButton === message.id ? 'active' : ''}`}
      onContextMenu={(e) => {
        e.preventDefault();
        handleLongPress(message.id);
      }}
    >
      <div className={`message-sender ${message.sender}`}>
        {message.sender === 'sender' ? senderName : receiverName}
      </div>
      <div className="message-content">
        {message.text}
      </div>
      <div className="message-timestamp">{formatTimestamp(message.timestamp)}</div>
      {showDeleteButton === message.id && (
        <button onClick={() => handleDeleteMessage(message.id)}>Delete</button>
      )}
    </div>
  );
  

  return (
    <div className='body'>
    <div className="chat-container">
      <div className="chat">
        {messages.map((message) => (
          <div key={message.id} className="message-wrapper">
            {renderMessage(message)}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div ref={clickOutsideRef}></div>
    </div>
    </div>

  );
}

export default ChatApp;
