import React, {useContext, createContext, useState} from 'react';

const AppContext = createContext(null);
function AppProvider({children}) {
  const [state, setState] = useState(null);
  return (
    <AppContext.Provider value={{state, setState}}>
      {children}
    </AppContext.Provider>
  );
}

const useApp = props => {
  return useContext(AppContext);
};

export {AppProvider};
export default useApp;
