const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

let tokenClient;
let gapiInited = false;
let gisInited = false;

export const initializeGoogleCalendar = () => {
  const script1 = document.createElement('script');
  script1.src = 'https://apis.google.com/js/api.js';
  script1.async = true;
  script1.defer = true;
  script1.onload = gapiLoaded;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.src = 'https://accounts.google.com/gsi/client';
  script2.async = true;
  script2.defer = true;
  script2.onload = gisLoaded;
  document.head.appendChild(script2);
};

function gapiLoaded() {
  window.gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
  await window.gapi.client.init({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
}

function gisLoaded() {
  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    scope: SCOPES,
    callback: '', // Defined later
  });
  gisInited = true;
}

export const addEventToCalendar = async (eventDetails) => {
  return new Promise((resolve, reject) => {
    if (!gapiInited || !gisInited) {
      reject(new Error('Google API not initialized'));
      return;
    }

    tokenClient.callback = async (response) => {
      if (response.error !== undefined) {
        reject(response);
        return;
      }

      try {
        const event = {
          summary: eventDetails.title,
          description: eventDetails.description,
          start: {
            dateTime: new Date(eventDetails.startDate).toISOString(),
            timeZone: 'Europe/Istanbul',
          },
          end: {
            dateTime: new Date(eventDetails.endDate).toISOString(),
            timeZone: 'Europe/Istanbul',
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 },
              { method: 'popup', minutes: 30 },
            ],
          },
        };

        const request = window.gapi.client.calendar.events.insert({
          calendarId: 'primary',
          resource: event,
        });

        const response = await request;
        resolve(response.result);
      } catch (err) {
        reject(err);
      }
    };

    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  });
};

export const getCalendarEvents = async (timeMin, timeMax) => {
  return new Promise((resolve, reject) => {
    if (!gapiInited || !gisInited) {
      reject(new Error('Google API not initialized'));
      return;
    }

    tokenClient.callback = async (response) => {
      if (response.error !== undefined) {
        reject(response);
        return;
      }

      try {
        const request = window.gapi.client.calendar.events.list({
          calendarId: 'primary',
          timeMin: timeMin.toISOString(),
          timeMax: timeMax.toISOString(),
          singleEvents: true,
          orderBy: 'startTime',
        });

        const response = await request;
        resolve(response.result.items);
      } catch (err) {
        reject(err);
      }
    };

    if (window.gapi.client.getToken() === null) {
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      tokenClient.requestAccessToken({ prompt: '' });
    }
  });
};
