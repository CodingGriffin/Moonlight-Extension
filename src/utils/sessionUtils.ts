// sessionUtils.ts

export interface SessionData {
    data: {
      name: string;
      token: string;
    };
    expirationTime: number; // Timestamp in milliseconds
  }
  
  export const saveSessionData = (newData: { name?: string; token?: string }, expirationMinutes: number): void => {
    chrome.storage.local.get(['sessionData'], (result) => {
      const existingSessionData: SessionData | undefined = result.sessionData;
  
      const expirationTime = Date.now() + expirationMinutes * 60 * 1000; // Convert minutes to milliseconds
      const sessionData: SessionData = {
        data: {
          name: existingSessionData?.data.name || newData.name || '',
          token: existingSessionData?.data.token || newData.token || '',
        },
        expirationTime,
      };
  
      // Update with new values if provided
      if (newData.name) {
        sessionData.data.name = newData.name;
      }
      if (newData.token) {
        sessionData.data.token = newData.token;
      }
  
      chrome.storage.local.set({ sessionData }, () => {
        console.log('Session data updated with expiration:', sessionData);
      });
    });
  };
  
  export const getSessionData = (callback: (sessionData: SessionData | null) => void): void => {
    chrome.storage.local.get(['sessionData'], (result) => {
      const sessionData: SessionData | undefined = result.sessionData;
  
      if (sessionData) {
        const currentTime = Date.now();
        if (currentTime < sessionData.expirationTime) {
          callback(sessionData);
        } else {
          console.log('Session has expired.');
          chrome.storage.local.remove('sessionData', () => {
            console.log('Expired session data removed.');
          });
          callback(null); // Return null if expired
        }
      } else {
        console.log('No session data found.');
        callback(null); // Return null if no data found
      }
    });
  };
  