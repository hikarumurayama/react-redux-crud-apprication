import _ from "lodash"; //配列からオブジェクトに組み替えてくれる
import { CREATE_EVENT,READ_EVENTS, READ_EVENT, DELETE_EVENT, UPDATE_EVENT } from '../actions'


export default ( events = {}, action) => {
  switch (action.type){
      case CREATE_EVENT:
      case READ_EVENT:
      case UPDATE_EVENT:
        const data = action.response.data
        return { ...events, [data.id]: data }
      case READ_EVENTS:
        return _.mapKeys( action.response.data, 'id')
      case DELETE_EVENT:
        // 下記がないと、APIではDleteできているが、画面上は古い情報が残ったままになってしまう
        delete events[action.id]
        // スプレッド演算子を使うと、最新のeventsオブジェクトを返してくれる
        return { ...events }
      case UPDATE_EVENT:
      default:
        return events
  }
}