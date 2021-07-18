import { call, put, takeLatest } from 'redux-saga/effects';
import { api } from '../../api/api';
import { postListActions } from '../feature/postSlice';

function* workerPostList(): Generator<any, any, any> {
  const { loadSuccess, loadFail } = postListActions;

  try {
    const postList = yield call(api.getPostList);

    yield put(loadSuccess(postList));
  } catch (err) {
    yield put(loadFail(err));
  }
}

export function* watchSaga() {
  const { load } = postListActions;
  yield takeLatest(load, workerPostList);
}
