const getUserId = () => {
  let userId = localStorage.getItem('userId');
  userId = 1
  if (!userId) {
    // Redirect or show a message to ask the user to log in
    window.location.href = '/login'; // Redirect to login page
    return null;
  }
  return userId;
};

const getUserRole = () => {
  return localStorage.getItem('userRole');
};

const clearUserId = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('userRole');
};

const userStorage = { getUserId, getUserRole, clearUserId };

export default userStorage;