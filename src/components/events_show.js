import React,{ Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'; // 入力フォーム
import { Link } from "react-router-dom";

import RaisedButtton from 'material-ui/RaisedButton'
import TextField from "material-ui/TextField";

import { getEvent, deleteEvent, putEvent } from '../actions'

class EventsShow extends Component{
  
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  // 一覧画面から遷移せずに、直でURLを叩いて詳細画面に来た場合、メモリに何の情報も保持していないので、レンダリング時にAPIを叩いて情報を取得する
  componentDidMount() {
    const { id } = this.props.match.params
    // URLのパラメータからIDを取得し、データを取得する
    if (id) this.props.getEvent(id)
  }

  // Fieldコンポーネントの値が渡ってくる
  renderField(field) {
    // 必要な情報を取得する(metaはredux-form特有のメタ情報)
    const { input, label, type, meta: { touched, error } } = field
    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        type={type}
        errorText={touched && error}
        {...input}
        fullWidth={true}
      />   
    )
  }

  // 送信ボタン押下
  async onSubmit(values) {
    // フォームに入力した内容をpostする
    await this.props.putEvent(values)
    // 初期画面に戻す
    this.props.history.push('/')
  }

  // 削除ボタン押下
  async onDeleteClick() {
    const { id }  = this.props.match.params
    await this.props.deleteEvent(id)
    this.props.history.push('/')
  }

  render(){
    // pristine(=何も手がつけられていない状態)
    // submiting(=submitボタンが押されたときtrueになる)
    const { handleSubmit, pristine, submitting, invalid } = this.props
    const style = { margin : 12 }
    return (
      
      <form onSubmit={ handleSubmit(this.onSubmit)}>
        {/* Fieldコンポーネントに諸々渡す → {this.renderField}でinputタグを作成 */}
        <div><Field label="Title" name="title" type="text" component={this.renderField} /></div>
        <div><Field label="Body" name="body" type="text" component={this.renderField} /></div>
        <div>  
        <RaisedButtton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid}/>
        <RaisedButtton label="Cancel" style={style} containerElement={<Link to="/"/>}/>
        <RaisedButtton label="Delete" style={style} onClick={this.onDeleteClick}/>
        </div>
      </form>
    )
  }
}

// formのバリデーション
const validate = values => {
  const errors = {}

  if ( !values.title ) {
    errors.title = "Enter a title, please."
  }

  if ( !values.body ) {
    errors.body = "Enter a body, please."
  }

  return errors
}

const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent })
const mapStateToProps = (state, ownProps) => {
  // idに紐づく情報を取得する
  const event = state.events[ownProps.match.params.id]
  // initialValuesで初期状態を設定
  return { initialValues: event, event }
}


export default connect(mapStateToProps, mapDispatchToProps)(
  /* reduxFormでラッピングする（validate関数とフォーム名)
      enableReinitialize : フォームに初期データを入れておきたい場合はtrueにする
  */
  reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow)
)