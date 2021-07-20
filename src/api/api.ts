export const api = {
  getPostList() {
    return new Promise((resolve) => {
      if (
        (localStorage.getItem('noteList') as string) === '[]' ||
        localStorage.getItem('noteList') === 'null' ||
        localStorage.getItem('noteList') === null
      ) {
        return setTimeout(() => {
          return resolve(setPostItems());
        }, 400);
      }
      if (localStorage.getItem('noteList')) {
        return setTimeout(() => {
          return resolve(getLocalStorageItem());
        }, 400);
      }
    });
  },
};
// 요청 시 noteList이름의 localStorage 아이템이 있다면 해당 객체를 리턴, 아니면 빈 배열을 리턴

const getLocalStorageItem = () => {
  return JSON.parse(localStorage.getItem('noteList') as string);
};

const setPostItems = () => {
  return [{ description: '', height: 250, id: 0, isFoldPost: false, title: '', width: 250, x: 10, y: 10 }];
};
