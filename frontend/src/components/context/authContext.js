import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from 'react';

const TokenContext = createContext();

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);

  const saveToken = (newToken) => {
    setToken(newToken);
  };

  useEffect(() => {
    sessionStorage.setItem('token', token);
  }, [token]);

  const contextValue = useMemo(() => ({ token, saveToken }), [token, saveToken]);

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContext;
