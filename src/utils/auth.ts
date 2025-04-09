export const isAuthenticated = () => {
    const user = localStorage.getItem("user");
    if (!user) return false;
  
    try {
      const parsed = JSON.parse(user);
      return !!parsed.token;
    } catch (e) {
      return false;
    }
  };
  