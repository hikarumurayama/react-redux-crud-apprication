import React,{ Component} from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'; // 入力フォーム
import { Link } from "react-router-dom";
import RaisedButtton from 'material-ui/RaisedButton'
import TextField from "material-ui/TextField";

import { postEvents } from '../actions'
class EventsNew extends Component{
  
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
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

 async onSubmit(values) {
    // フォームに入力した内容をpostする
    await this.props.postEvents(values)
    // 初期画面に戻す
    this.props.history.push('/')
  }

  render(){
    // pristine(=何も手がつけられていない状態)
    // submiting(=submitボタンが押されたときtrueになる)
    const { handleSubmit, pristine, submitting, invalid} = this.props
    const style = { margin : 12 }
    return (
      
      <form onSubmit={ handleSubmit(this.onSubmit)}>
        {/* Fieldコンポーネントに諸々渡す → {this.renderField}でinputタグを作成 */}
        <div><Field label="Title" name="title" type="text" component={this.renderField} /></div>
        <div><Field label="Body" name="body" type="text" component={this.renderField} /></div>
        <RaisedButtton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid}/>
        <RaisedButtton label="Cancel" style={style} containerElement={<Link to="/"/>}/>
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

const mapDispatchToProps = ({ postEvents })

export default connect(null,　mapDispatchToProps)(
  // reduxFormでラッピングする（validate関数とフォーム名)
  reduxForm({ validate, form: 'eventNewForm' })(EventsNew)
)