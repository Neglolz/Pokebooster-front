export default {
  clientId: `${process.env.VUE_APP_GOOGLE_CLIENT_ID}.apps.googleusercontent.com`,
  scope: "profile email",
  prompt: "select_account",
};
