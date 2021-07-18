export const api = {
  getPostList() {
    return new Promise((resolve) => {
      if (JSON.parse(localStorage.getItem('noteList') as string)) {
        resolve(JSON.parse(localStorage.getItem('noteList') as string));
      } else {
        resolve([]);
      }
    });
  },
};
// 요청 시 noteList이름의 localStorage 아이템이 있다면 해당 객체를 리턴, 아니면 빈 배열을 리턴
