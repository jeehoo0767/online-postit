export const api = {
  getPostList() {
    return new Promise((resolve) => {
      resolve(JSON.parse(localStorage.getItem('noteList') as string));
    });
  },
};
