const {google} = require('googleapis');

const CLIENT_ID = "804132829876-jqdm4j68idkao61ek07u9ut4356jhpf5.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
const REFRESH_TOKEN = "1//04Kx4vk9j0y80CgYIARAAGAQSNwF-L9IrTJqM5bySmrSXnO8QQW-Az_aYo7KKdYnx_7RHUMnrE6NTKAu7bjZuAKW0Wi1q6D6lun4"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);


const scopes = [
    'https://www.googleapis.com/auth/user.birthday.read',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    
  ];


  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
  
    // If you only need one scope you can pass it as a string
    scope: scopes
  });
  

// This will provide an object with the access_token and refresh_token.
// Save these somewhere safe so they can be used at a later time.
const {tokens} = await oauth2Client.getToken(code)
oauth2Client.setCredentials(tokens);