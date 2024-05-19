import { INITIAL_APP_STORE } from '@/constants';
import { IAnswer } from '@/models';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const API_BASE_URL = 'http://localhost:4000/api/v1/answers';

export const createAnswer = createAsyncThunk('answers/createAnswer', async (answerData: IAnswer, { rejectWithValue }) => {
  try {
    const response = await fetch(API_BASE_URL + '/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answerData),
    });
    if (!response.ok) {
      throw new Error('Failed to create answer');
    }
    const data = await response.json();
    return data.answer;
  } catch (error) {
    return rejectWithValue('Failed to create answer');
  }
});

export const fetchAnswerById = createAsyncThunk('answers/fetchAnswerById', async (answerId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(API_BASE_URL + `/${answerId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch answer');
    }
    const data = await response.json();
    return data.answer;
  } catch (error) {
    return rejectWithValue('Failed to fetch answer');
  }
});

export const updateAnswerById = createAsyncThunk(
  'answers/updateAnswerById',
  async ({ answerId, answerData }: { answerId: string; answerData: IAnswer }, { rejectWithValue }) => {
    try {
      const response = await fetch(API_BASE_URL + `/${answerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(answerData),
      });
      if (!response.ok) {
        throw new Error('Failed to update answer');
      }
      const data = await response.json();
      return data.answer;
    } catch (error) {
      return rejectWithValue('Failed to update answer');
    }
  }
);

export const deleteAnswerById = createAsyncThunk('answers/deleteAnswerById', async (answerId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(API_BASE_URL + `/${answerId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete answer');
    }
    return answerId;
  } catch (error) {
    return rejectWithValue('Failed to delete answer');
  }
});

const answerSlice = createSlice({
  name: 'answers',
  initialState: INITIAL_APP_STORE.answer,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAnswer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAnswer.fulfilled, (state, action) => {
        state.loading = false;
        state.answers.push(action.payload);
      })
      .addCase(createAnswer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAnswerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnswerById.fulfilled, (state, action) => {
        state.loading = false;
        state.answers = [action.payload];
      })
      .addCase(fetchAnswerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateAnswerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAnswerById.fulfilled, (state, action) => {
        state.loading = false;
        const updatedAnswer = action.payload;
        const index = state.answers.findIndex((answer) => answer.id === updatedAnswer.id);
        if (index !== -1) {
          state.answers[index] = updatedAnswer;
        }
      })
      .addCase(updateAnswerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteAnswerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnswerById.fulfilled, (state, action) => {
        state.loading = false;
        state.answers = state.answers.filter((answer) => answer.id !== action.payload);
      })
      .addCase(deleteAnswerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectAnswers = (state: RootState) => state.answers.answers;
export const selectLoading = (state: RootState) => state.answers.loading;
export const selectError = (state: RootState) => state.answers.error;

export default answerSlice.reducer;
