import React, { createContext, useState, useContext } from 'react';

const MatchesContext = createContext();

export const MatchesProvider = ({ children }) => {
  const [matchedUsers, setMatchedUsers] = useState([
    { id: '1', name: 'Alice', profilePicture: 'https://via.placeholder.com/150', lastMessage: 'Hey! How are you?' },
    { id: '2', name: 'Bob', profilePicture: 'https://via.placeholder.com/150', lastMessage: 'What are your plans for the weekend?' },
    { id: '3', name: 'Charlie', profilePicture: 'https://via.placeholder.com/150', lastMessage: 'Let’s catch up soon!' },
  ]);

  return (
    <MatchesContext.Provider value={{ matchedUsers, setMatchedUsers }}>
      {children}
    </MatchesContext.Provider>
  );
};

export const useMatches = () => useContext(MatchesContext);
