import{createSlice}from '@reduxjs/toolkit';


const initialState={
    currentUser:null,
    error:null,
    loadings:false,

};


const userSlice=createSlice({
    name:'user',
    initialState,
    reducers: {
        signInStart:(state) => {
            state.loadings=true;
        },

        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loadings=false;
            state.error=null;
        },

        signInFailure:(state,action)=>{
            state.error=action.payload;
            state.loadings=false;    
        },

     // Action to set the current user
        setCurrentUser: (state, action) => {
        state.currentUser = action.payload;  // Setting user data from the payload
        },

        
    // Sign Out
        signOutStart:(state) => {
            state.loadings=true;
        },

        signOutSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loadings=false;
            state.error=null;
        },

        signOutFailure:(state,action)=>{
            state.error=action.payload;
            state.loadings=false;    
        },
    }

});  

export const {signInStart,signInSuccess,signInFailure,setCurrentUser, 
              signOutStart,signOutSuccess,signOutFailure
            }=userSlice.actions;

export default userSlice.reducer;