import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { api } from '../../api/api';
import { postListActions } from '../feature/postSlice';

function* workerPostList(): Generator<any, any, any> {
  const { loadPostSuccess, loadPostFail } = postListActions;

  try {
    const postList = yield call(api.getPostList);
    yield delay(400); //  비동기로 받아오는 모션처럼
    yield put(loadPostSuccess(postList));
  } catch (err) {
    yield put(loadPostFail(err));
  }
}

export function* watchSaga() {
  const { loadPost } = postListActions;
  yield takeLatest(loadPost, workerPostList);
} // 워커 사가를 바라보는 워치 사가 - 루트 사가에선 이 워치 사가를 실행 시키며 yield를 바라보고 있음
// dispatch시 워커사가를 실행 하며 차례로 dispatch가 이루어짐
