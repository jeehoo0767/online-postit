import { all, fork } from 'redux-saga/effects';
import { watchSaga } from './postSaga';

// rootSaga를 만들어줘서 store에 추가
export default function* rootSaga() {
  yield all([fork(watchSaga)]);
}
