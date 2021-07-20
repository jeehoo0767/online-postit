export const getRandomLocation = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}; // 포스트 생성 시 랜덤한 좌표를 얻기 위한 함수
// x : 0 ~ 700
// y : 0 ~ 400
