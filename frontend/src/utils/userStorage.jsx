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

const clearUserId = () => {
  localStorage.removeItem('userId');
};

const userStorage = { getUserId, clearUserId };

export default userStorage;