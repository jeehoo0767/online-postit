import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostitValues } from '../../models/postModel';

interface InitialTypes {
  isLoading: boolean;
  data: any; // string key로 객체에 접근하기를 실패하여 data의 type을 any로 설정
  error: any;
  selectedPostIdForFocus: number | null; // 생성된 포스트 제목 포커스를 위한 상태
  selectedTitleForEffect: number | null; // 선택된 포스트에 해당하는 header의 제목에 효과를 주기위한 상태
}

const initialState: InitialTypes = {
  isLoading: false,
  data: null,
  error: null,
  selectedPostIdForFocus: null,
  selectedTitleForEffect: null,
};

const defaultPostData = { id: 0, title: '', description: '', isFoldPost: false, x: 10, y: 10, width: 250, height: 250, isVisible: false };

const reducers = {
  loadPost: (state = initialState) => {
    state.isLoading = true;
  },
  loadPostSuccess: (state = initialState, { payload: postList }: { payload: PostitValues[] }) => {
    state.isLoading = false;
    state.data = postList;
    state.error = null;
  },
  loadPostFail: (state = initialState, { payload: error }: { payload: any }) => {
    state.isLoading = false;
    state.data = [];
    state.error = error;
  },
  /**
   * handlePostChange
   * @param state
   * @param action key = e.target.name , content: e.target.value
   * 이러한 액션을 받으면서 이벤트가 일어난 id와 일치하는 데이터에서
   * action.payload.key의 이름을 가진 키의 value를 action.payload.content로 설정
   */
  handlePostChange: (state = initialState, action: PayloadAction<{ id: number; key: string; content: string }>) => {
    // 포스트 내용 수정 액션
    const findKey = action.payload.key;
    const selectedPostIndex = state.data?.findIndex((item: PostitValues) => item.id === action.payload.id);
    const selectedPost = state.data[selectedPostIndex];
    selectedPost[findKey] = action.payload.content;
  },
  addPost: (state = initialState) => {
    // 포스트 추가 액션
    if (state.data.length === 0) {
      state.data.push(defaultPostData);
      // 만약 addPost가 dispatch 시 데이터가 없다면 id를 0부터 추가
    } else {
      // 아니라면 데이터의 마지막 인덱스에 id에 1을 더한값으로 추가
      state.data.push({
        id: state.data[state.data.length - 1].id + 1,
        title: '',
        description: '',
        isFoldPost: false,
        x: 200,
        y: 0,
        width: 250,
        height: 250,
        isVisible: false,
      });
    }
  },
  deletePost: (state = initialState, action: PayloadAction<{ id: number }>) => {
    // 포스트 삭제 액션
    const findKey = action.payload.id; // 전달받은 id
    state.data = state.data.filter((item: PostitValues) => item.id !== findKey); // 전달받은 아이디와 같지 않은것들만 state로 설정
  },
  handleDragPost: (state = initialState, action: PayloadAction<{ id: number; x: number; y: number }>) => {
    // 포스트 드래그 액션
    const findKey = action.payload.id; // 전달받은 id
    const selectedItemIndex = state.data.findIndex((item: PostitValues) => item.id === findKey); // 전달받은 id와 data에서 일치하는 객체의 인덱스
    const selectedPost = state.data[selectedItemIndex]; // data에서 해당 인덱스의 원소
    selectedPost.x = action.payload.x; // x좌표값 설정
    selectedPost.y = action.payload.y; // y좌표값 설정
  },
  handleResizePost: (state = initialState, action: PayloadAction<{ id: number; width: number; height: number }>) => {
    // 포스트 리사이즈 액션
    const findKey = action.payload.id; // 전달받은 id
    const selectedItemIndex = state.data.findIndex((item: PostitValues) => item.id === findKey);
    const selectedPost = state.data[selectedItemIndex];
    selectedPost.width = action.payload.width; // width설정
    selectedPost.height = action.payload.height; // height 설정
  },
  handleFoldPost: (state = initialState, action: PayloadAction<{ id: number }>) => {
    // 포스트 접기 액션
    const findKey = action.payload.id; // 전달받은 id
    const selectedItemIndex = state.data.findIndex((item: PostitValues) => item.id === findKey);
    const selectedPost = state.data[selectedItemIndex];
    if (selectedPost.isFoldPost) {
      // 만약 접혀있던 상태라면
      (selectedPost.isFoldPost = false), (selectedPost.height = 250); // 높이를 250으로 설정
    } else {
      // 만약 펼쳐진 상태 였다면
      (selectedPost.isFoldPost = true), (selectedPost.height = 40); // 높이를 40으로 설정
    }
  },
  setFocus: (state = initialState, action: PayloadAction<{ id: number }>) => {
    // 생성된 포스트 제목에 포커스를 위한 액션
    state.selectedPostIdForFocus = action.payload.id; // 포커스 할 id
  },
  selectedTitleMakeEffect: (state = initialState, action: PayloadAction<{ id: number | null }>) => {
    // 포스트 제목 포커스 시 우측 목록에 선택한 포스트에 대한 제목에 효과 생성을 위한 액션
    state.selectedTitleForEffect = action.payload.id; // 선택된 제목에 효과가 들어갈 id
  },
};

const name = 'postListReducer';

const postSlice = createSlice({
  // redux-toolkit 제공 slice
  name,
  initialState,
  reducers,
});

export const postList = postSlice.name;
export const postListReducer = postSlice.reducer;
export const postListActions = postSlice.actions;
