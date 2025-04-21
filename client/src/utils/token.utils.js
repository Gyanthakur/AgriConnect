import ls from "localstorage-slim";
const TOKEN_NAME = "token";
export function setToken(token) {
  ls.set(TOKEN_NAME, token, {
    ttl: 86400 * 7,
  });
}

export function getToken() {
  const token = ls.get(TOKEN_NAME);
  return token ?? null;
}

export function removeToken() {
  ls.remove(TOKEN_NAME);
}

export function handleSignOut() {
  removeToken();
  window.location.reload();
}
