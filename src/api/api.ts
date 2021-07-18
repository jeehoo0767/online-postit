export const api = {
  getPostList() {
    return new Promise((resolve) => {
      if ((localStorage.getItem('noteList') as string) === '[]' || localStorage.getItem('noteList') === null) {
        return resolve([{ description: '', height: 250, id: 0, isFoldPost: false, isVisible: false, title: '', width: 250, x: 10, y: 10 }]);
      }
      if (localStorage.getItem('noteList')) {
        return resolve(JSON.parse(localStorage.getItem('noteList') as string));
      }
    });
  },
};
// 요청 시 noteList이름의 localStorage 아이템이 있다면 해당 객체를 리턴, 아니면 빈 배열을 리턴
