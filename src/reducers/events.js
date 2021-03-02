import _ from "lodash"; //配列からオブジェクトに組み替えてくれる
import { READ_EVENTS } from '../actions'


export default (events = {},action) => {
  switch (action.type){
      case READ_EVENTS:
        return _.mapKeys(action.response.data,'id')
      default:
        return events
  }
}