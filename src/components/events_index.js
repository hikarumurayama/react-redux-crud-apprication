import React,{ Component } from 'react'
import { connect } from 'react-redux'
import _ from "lodash";
import { Link } from "react-router-dom";
import { Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn } from "material-ui/Table";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
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
      <TableRow key = {event.id}>
        <TableRowColumn>{event.id}</TableRowColumn>
        <Link to={`/events/${event.id}`}>
          <TableRowColumn>{event.title}</TableRowColumn>
        </Link>
        <TableRowColumn>{event.body}</TableRowColumn>
      </TableRow>
    ))
  }

  render(){
    const style = {
      position: "fixed",
      right: 12,
      bottom: 12
    }
    return (
    <>
      <FloatingActionButton style = { style } containerElement = { <Link to='/events/new'/>} >
        <ContentAdd />
      </FloatingActionButton >

      <Table>
        <TableHeader
          displaySelectAll={ false }
          adjustForCheckbox={ false }
        >
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>TITLE</TableHeaderColumn>
            <TableHeaderColumn>BODY</TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={ false }> 
          {this.renderEvents()}
        </TableBody>
      </Table>
    </>
    )
  }
}

const mapStateToProps = state => ({ events: state.events })

const mapDispatchToProps = ({ readEvents })

export default connect( mapStateToProps, mapDispatchToProps )(EventsIndex)