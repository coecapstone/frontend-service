import axios from 'axios';

export const CHANGE_LOGIN = 'login/CHANGE_LOGIN';

const changeLogin = (profile) => ({
    type: CHANGE_LOGIN,
    value: true,
    data: profile
})

export const login = (profile) => {
    return (dispatch) => {
        const data = {
            "email": profile.email, 
            "name": profile.name, 
            "imageUrl": profile.imageUrl, 
        }
        const options = {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        console.log(data)
        console.log(options)
        fetch('http://localhost:8080/api/login', options)
            .then(res => {
                console.log(res)
                dispatch(changeLogin(profile))
                // save to session story
                //dispatch(submitFormAction())
            })
            .catch(error => {
                console.log(error)
            })
    }
}

// const getFormListAction = (data) => ({
//     type: GET_FORMLIST,
//     data: fromJS(data)
// });