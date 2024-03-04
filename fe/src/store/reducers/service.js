/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../services/axios.service';
axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('accessToken') ?? '';
const initialState = {
  service: null,
};

const token =  localStorage.getItem('accessToken') ?? '';

localStorage.setItem('accessToken', token )

export const fetchServices = createAsyncThunk('service/fetchServices', async (payload) => {
  try {
    const response = await axiosInstance.get('services', {
      params: payload,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

// export const fetchServicesById = createAsyncThunk('owner/fetchServicesById', async (payload) => {
//   try {
//     const response = await axiosInstance.get(`/services/${payload}`)
//     return response.data.data;
//   } catch (error) {
//     throw error;
//   }
// });

export const fetchServicesById = createAsyncThunk('service/fetchServicesById', async (payload) => {
  try {
    const response = await axiosInstance.get(`/services/${payload}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

export const createNewService = createAsyncThunk('service/createNewService', async (serviceData) => {
  try {
    const response = await axiosInstance.post('services', serviceData);
    console.log(serviceData);
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

const ownerSlice = createSlice({
  name: 'service',
  initialState,

  reducers: {

  },

  extraReducers: (builder) => {
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.manageService = action.payload;
    });
    builder.addCase(fetchServicesById.fulfilled, (state, action) => {
      state.serviceByIdData = action.payload;
    });

  
  },
});
const serviceReducer = ownerSlice.reducer;
export default serviceReducer;
