import _ from "lodash"; //配列からオブジェクトに組み替えてくれる
import { READ_EVENTS, DELETE_EVENT } from '../actions'


export default ( events = {}, action) => {
  switch (action.type){
      case READ_EVENTS:
        return _.mapKeys( action.response.data, 'id')
      case DELETE_EVENT:
        // 下記がないと、APIではDleteできているが、画面上は古い情報が残ったままになってしまう
        delete events[action.id]
        // スプレッド演算子を使うと、最新のeventsオブジェクトを返してくれる
        return { ...events }
      default:
        return events
  }
}