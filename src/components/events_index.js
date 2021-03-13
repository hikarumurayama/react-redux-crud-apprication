import React,{ Component } from 'react'
import { connect } from 'react-redux'
import _ from "lodash";
import { Link } from "react-router-dom";

import { readEvents } from '../actions'

class EventsIndex extends Component{

  // componentが初めにmountされたときに呼ばれるメソッド
  componentDidMount() {　
    // 最初にActionのreadsEventsを実行する（eventを取得する) = APIを叩く
    this.props.readEvents()
  }

  // Eventsをレンダリングする
  renderEvents(){
    return _.map(this.props.events, event =>(
      <tr key = {event.id}>
        <td>{event.id}</td>
        <td>{event.title}</td>
        <td>{event.body}</td>
      </tr>
    ))
  }

  render(){
    return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>BODY</th>
          </tr>
        </thead>
        <tbody>
          {this.renderEvents()}
        </tbody>
      </table>
      <Link to='/events/new'>New Event</Link>
    </>
    )
  }
}

const mapStateToProps = state => ({ events: state.events })

const mapDispatchToProps = ({ readEvents })

export default connect( mapStateToProps, mapDispatchToProps )(EventsIndex)