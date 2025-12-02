import { createSlice } from "@reduxjs/toolkit";
import *as actions from './asyncAction'// Đúng, không cần `actions.getCategories`

export const appSlice = createSlice({
    name: "app",
    initialState: {
        categories: null,
        isLoading: false,
       
    },
    reducers: {
        logout:(state)=>{
            state.isLoading=false
        }
    }, // Không có reducers nào nên không cần export actions
    extraReducers: (builder) => {
        builder.addCase(actions.getCategories.pending, (state) => {
            state.isLoading = true;
            state.errorMessage = null;
        });

        builder.addCase(actions.getCategories.fulfilled, (state, action) => {
            state.isLoading = false;
            state.categories = action.payload; // Không cần `.productCategories` nữa
        });
        

        builder.addCase(actions.getCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload || "Có lỗi xảy ra khi lấy danh mục!";
        });
    },
});
export const{} =appSlice.actions
export default appSlice.reducer;
