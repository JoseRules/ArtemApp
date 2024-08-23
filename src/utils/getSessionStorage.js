const storageName = 'artem';


export const getSessionStorage = () => {
  const storage = sessionStorage.getItem(storageName);
  if(storage) return storage;
}

export const saveSessionStorage = (userState) => {
  sessionStorage.setItem(storageName, JSON.stringify(userState));
}
