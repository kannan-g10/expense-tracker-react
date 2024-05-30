import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchExpenses',
  async userId => {
    try {
      const res = await fetch(
        `https://expense-tracker-b84b4-default-rtdb.firebaseio.com/users/${userId}/expenses.json`
      );
      const data = await res.json();
      const result = data
        ? Object.keys(data)?.map(id => ({
            id,
            ...data[id],
          }))
        : [];
      return result;
    } catch (err) {
      toast.error('Something went wrong!');
      console.error(err);
      throw err;
    }
  }
);

export const postExpenses = createAsyncThunk(
  'expenses/postExpense',
  async ({ userId, data }) => {
    try {
      const res = await fetch(
        `https://expense-tracker-b84b4-default-rtdb.firebaseio.com/users/${userId}/expenses.json`,
        {
          method: 'post',
          body: JSON.stringify(data),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }
      );

      const result = await res.json();
      toast.success('Successfully Expense Added!');

      const newExpense = {
        id: result.name,
        ...data,
      };

      return newExpense;
    } catch (err) {
      toast.error('Something went wrong!');
      console.error(err);
      throw err;
    }
  }
);

export const deleteExpense = createAsyncThunk(
  'expenses/deleteExpense',
  async ({ userId, id }) => {
    try {
      const res = await fetch(
        `https://expense-tracker-b84b4-default-rtdb.firebaseio.com/users/${userId}/expenses/${id}.json`,
        {
          method: 'delete',
        }
      );

      if (res.status === 200) {
        toast.success('Successfully Expense Deleted!');
        return id;
      } else {
        throw new Error('Failed to delete expense');
      }
    } catch (err) {
      toast.error('Something went wrong!');
      throw err;
    }
  }
);

export const updateExpense = createAsyncThunk(
  'expenses/updateExpense',
  async ({ userId, id, newExpense }) => {
    try {
      const res = await fetch(
        `https://expense-tracker-b84b4-default-rtdb.firebaseio.com/users/${userId}/expenses/${id}.json`,
        {
          method: 'PUT',
          body: JSON.stringify(newExpense),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        }
      );

      if (res.ok) {
        toast.success('Successfully Updated The Expense');
        return newExpense;
      } else {
        toast.error('Cannot Update Expense!');
        throw new Error('Failed to update expense');
      }
    } catch (err) {
      toast.error('Cannot Update Expense!');
      throw err;
    }
  }
);

const expenseSlice = createSlice({
  name: 'Expenses',
  initialState: {
    expenses: [],
    isEditing: false,
    loading: false,
    error: null,
    description: '',
    amount: '',
    category: '',
    updateId: '',
  },
  reducers: {
    setEditValues: (state, action) => {
      state.description = action.payload.description;
      state.amount = action.payload.amount;
      state.category = action.payload.category;
      state.updateId = action.payload.id;
      state.isEditing = true;
    },
    clearEditValues: state => {
      state.description = '';
      state.amount = '';
      state.category = '';
      state.isEditing = false;
      state.updateId = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchExpenses.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postExpenses.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(postExpenses.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses.push(action.payload);
        state.totalAmount += Number(action.payload.amount);
      })
      .addCase(postExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteExpense.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = state.expenses.filter(
          expense => expense.id !== action.payload
        );
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateExpense.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.loading = false;
        const updatedExpense = action.payload;
        state.expenses = state.expenses.map(expense =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        );
        console.log('Updated state after updateExpense:', state);
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setEditValues, clearEditValues } = expenseSlice.actions;

export default expenseSlice.reducer;
