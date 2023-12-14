export async function signUp(userData: User) {
  try {
    const userRes = await fetch('http://localhost:3000/auth/signup', { method: 'POST', body: JSON.stringify(userData) });
    const user = await userRes.json();

    const userDataProcessed = {
      ...user,
      id: user.user_id,
    };
    
    return userDataProcessed;
  } catch (error) {
    console.log('Error by adding a user:' + error);
  }
}

export default signUp;
