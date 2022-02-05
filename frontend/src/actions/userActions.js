import axios from 'axios';
import {USER_LOGIN_REQUEST, 
        USER_LOGIN_SUCCESS, 
        USER_LOGIN_FAIL,
        USER_LOGOUT,
        USER_REGISTER_REQUEST,
        USER_REGISTER_SUCCESS,
        USER_REGISTER_FAIL,
        USER_DETAILS_REQUEST,
        USER_DETAILS_SUCCESS,
        USER_DETAILS_FAIL,
        USER_DELETE_REQUEST,
	      USER_DELETE_SUCCESS,
      	USER_DELETE_FAIL,
        USER_UPDATE_PROFILE_FAIL,
        USER_UPDATE_PROFILE_REQUEST,
        USER_UPDATE_PROFILE_SUCCESS,
        USER_DETAILS_RESET,
        USER_LIST_REQUEST,
        USER_LIST_SUCCESS,
        USER_LIST_FAIL,
        USER_LIST_RESET,
        USER_DELETE_ADMIN_REQUEST,
        USER_DELETE_ADMIN_SUCCESS,
        USER_DELETE_ADMIN_FAIL,
        USER_UPDATE_REQUEST,
        USER_UPDATE_SUCCESS,
        USER_UPDATE_FAIL,
        USER_EMAIL_VERIFICATION_REQUEST,
        USER_EMAIL_VERIFICATION_SUCCESS,
        USER_EMAIL_VERIFICATION_FAIL,
        USER_CONFIRM_REQUEST,
        USER_CONFIRM_SUCCESS,
        USER_CONFIRM_FAIL,
        USER_RESET_PASSWORD_REQUEST,
	      USER_RESET_PASSWORD_SUCCESS,
	      USER_RESET_PASSWORD_FAIL,
        USER_EMAIL_SENT_REQUEST,
        USER_EMAIL_SENT_SUCCESS,
        USER_EMAIL_SENT_FAIL,
} from '../constants/userConstants';
import {ORDER_LIST_MY_RESET} from '../constants/orderConstants';


export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/users/login',
            {email,password},
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
        localStorage.removeItem('promptEmailVerfication')
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })

    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type:USER_DETAILS_RESET})
    dispatch({type:ORDER_LIST_MY_RESET})
    dispatch({type:USER_LIST_RESET})
}

export const register = (name, email, password) => async(dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/users',
            {name, email, password},
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        })
    }
}


export const sendVerificationEmail = (email) => async (dispatch) => {
	try {
		dispatch({ type: USER_EMAIL_VERIFICATION_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/users/confirm',
			{ email },
			config
		);
		dispatch({ type: USER_EMAIL_VERIFICATION_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: USER_EMAIL_VERIFICATION_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};


export const confirmUser =
	(emailToken, alreadyLoggedIn = false) =>
	async (dispatch,getState) => {
		try {
			dispatch({ type: USER_CONFIRM_REQUEST });
			const { data } = await axios.get(
				`/api/users/confirm/${emailToken}`
			);

			
			localStorage.removeItem('promptEmailVerfication');
			dispatch({ type: USER_CONFIRM_SUCCESS, payload: true });

			if (alreadyLoggedIn) {
				dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
				localStorage.setItem('userInfo', JSON.stringify(data));
			}

			localStorage.removeItem('promptEmailVerfication');
		} catch (error) {
			dispatch({
				type: USER_CONFIRM_FAIL,
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};


export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/users/${id}`, config)
  
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: message,
      })
    }
  }


  
  export const deleteUser = (id) => async (dispatch, getState) => {

    try {
      dispatch({
        type: USER_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
     await axios.delete(`/api/users/${id}`, config)
      
      dispatch({
        type: USER_DELETE_SUCCESS,
      })
  
      dispatch(logout())
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: USER_DELETE_FAIL,
        payload: message,
      })
    }
  }


  export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(`/api/users/profile`, user, config)
  
      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      })
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: message,
      })
    }
  }

  export const listUsers = (user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/users`,config)
  
      dispatch({
        type: USER_LIST_SUCCESS,
        payload: data,
      })
      
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: USER_LIST_FAIL,
        payload: message,
      })
    }
  }


  export const deleteAdminUser = (id) => async (dispatch, getState) => {

    try {
      dispatch({
        type: USER_DELETE_ADMIN_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
       await axios.delete(`/api/users/${id}`, config)
  
      dispatch({
        type: USER_DELETE_ADMIN_SUCCESS,
      })
  
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: USER_DELETE_ADMIN_FAIL,
        payload: message,
      })
    }
  }

  export const updateUser = (user) => async (dispatch, getState) => {

    try {
      dispatch({
        type: USER_UPDATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const {data} =  await axios.put(`/api/users/${user._id}`, user,config)
  
      dispatch({
        type: USER_UPDATE_SUCCESS,
      })
     
      dispatch({type: USER_DETAILS_SUCCESS,payload:data})

      
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: message,
      })
    }
  }

  
 // Reset the password after the click on the link sent to the user email
  export const resetUserPassword = (passwordToken,password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_RESET_PASSWORD_REQUEST,
      })

      

          
      const config = {
        headers: {
          'Content-Type': 'application/json',
      }
    }

      const {data} =  await axios.put('/api/users/reset',{passwordToken,password},config)

      dispatch({
        type: USER_RESET_PASSWORD_SUCCESS,
        payload: data,
      })

    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: USER_RESET_PASSWORD_FAIL,
        payload: message,
      })
    }
  }







export const sentEmail = (email) => async (dispatch) => {
  try {
    dispatch({ 
      type: USER_EMAIL_SENT_REQUEST 
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/reset',
      { email },
      config
    );
    

    dispatch({ 
      type: USER_EMAIL_SENT_SUCCESS, 
      payload: data 
    });
  } catch (error) {
    dispatch({
      type: USER_EMAIL_SENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}