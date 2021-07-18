import { createSlice } from '@reduxjs/toolkit';
import { PostitValues } from '../../components/models/postModel';

interface InitialTypes {
  isLoading: boolean;
  data: PostitValues[] | null;
  error: any;
}

const initialState: InitialTypes = {
  isLoading: false,
  data: null,
  error: null,
};

const reducers = {
  load: (state = initialState) => {
    state.isLoading = true;
  },
  loadSuccess: (state = initialState, { payload: postList }: { payload: PostitValues[] }) => {
    state.isLoading = false;
    state.data = postList;
    state.error = null;
  },
  loadFail: (state = initialState, { payload: error }: { payload: any }) => {
    state.isLoading = false;
    state.data = null;
    state.error = error;
  },
};

const name = 'postListReducer';

const slice = createSlice({
  name,
  initialState,
  reducers,
});

export const postList = slice.name;
export const postListReducer = slice.reducer;
export const postListActions = slice.actions;
