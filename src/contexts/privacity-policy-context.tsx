import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import PrivacityPolicyPopUp from '../components/PrivacityPolicyPopUp';

interface PrivacityPolicyData {
  accepted: boolean;
  acceptCookies: () => void;
}

const PrivacityPolicyContext = createContext<PrivacityPolicyData>(
  {} as PrivacityPolicyData,
);

export const PrivacityPolicyProvider: React.FC = ({ children }) => {
  const [accepted, setAccepted] = useState(false);
  const [checked, setChecked] = useState(true);
  useEffect(() => {
    const areadChecked = localStorage.getItem('accepted_cookie_policy');
    if (areadChecked) {
      setChecked(true);
      setAccepted(Boolean(areadChecked));
    } else {
      setChecked(false);
    }
  }, [accepted]);
  const acceptCookies = useCallback(() => {
    localStorage.setItem('accepted_cookie_policy', 'true');
    setAccepted(true);
    setChecked(true);
  }, [accepted, checked]);
  return (
    <PrivacityPolicyContext.Provider value={{ accepted, acceptCookies }}>
      {children}
      {!checked && <PrivacityPolicyPopUp />}
    </PrivacityPolicyContext.Provider>
  );
};
export function usePrivacityPolicy(): PrivacityPolicyData {
  const context = useContext(PrivacityPolicyContext);

  if (!context) {
    throw new Error(
      'usePrivacityPolicy must be used within a privacity policy provider',
    );
  }

  return context;
}
