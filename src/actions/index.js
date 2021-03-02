import axios from 'axios';
export const READ_EVENTS = 'READ_EVENTS'

const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1'
const QUERYSTRING = '?token=token123'

// actionCreatorは純粋関数でなくてはならないため、通常APIとの接続処理を書いてはいけないが、それを可能にしたのがthunk
export const  readEvents = () => async dispatch => {
    const response = await axios.get(`${ROOT_URL}/events${QUERYSTRING}`)
    dispatch({ type: READ_EVENTS, response})
}