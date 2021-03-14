import axios from 'axios';
export const READ_EVENTS = 'READ_EVENTS'
export const READ_EVENT = 'READ_EVENT'
export const GET_EVENTS = 'GET_EVENT'
export const CREATE_EVENT = 'CREATE_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'

const ROOT_URL = 'https://udemy-utils.herokuapp.com/api/v1'
const QUERYSTRING = '?token=token123'

// thunkの説明記事 https://qiita.com/hiroya8649/items/c202742c99d2cc6159b8

// APIを叩いてEventsを取得する
export const readEvents = () => async dispatch => {
    // actionCreatorは純粋関数でなくてはならないため、通常APIとの接続処理を書いてはいけないが、それを可能にしたのがthunk
    const response = await axios.get( `${ROOT_URL}/events${QUERYSTRING}` )
    dispatch({ type: READ_EVENTS, response })
}

// 特定のEventを取得する
export const getEvent = (id) => async dispatch => {
    const response = await axios.get( `${ROOT_URL}/events/${id}${QUERYSTRING}` )
    dispatch({ type: READ_EVENT, response })
}

// eventを登録する
export const postEvents = values => async dispatch => {
    const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values)
    dispatch({ type: CREATE_EVENT, response})
}

// eventを更新する
export const putEvent = values => async dispatch => {
    const response = await axios.put( `${ROOT_URL}/events/${values.id}${QUERYSTRING}`, values )
    dispatch({ type: UPDATE_EVENT, response})
}

// eventをdeleteする
export const deleteEvent = id => async dispatch => {
    await axios.delete(`${ROOT_URL}/events/${id}${QUERYSTRING}`)
    dispatch({ type: DELETE_EVENT, id })
}