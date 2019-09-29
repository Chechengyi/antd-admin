import * as React from 'react'
import styles from './Login.less'
import {
  Form,
  Input,
  Button,
  Icon,
  Alert
} from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import { connect } from 'dva'
import { RouteComponentProps } from 'react-router-dom'
import { ILoginModalState, ConnectState } from '../../models/connect'

const FormItem = Form.Item;

interface LoginProps extends FormComponentProps , RouteComponentProps, ILoginModalState {
  dispatch: (e) => Promise<void>;
}

@connect((state: ConnectState)=>({
  loginStatus: state.login.loginStatus,
  loading: state.login.loading
}))

class Login extends React.Component<LoginProps> {

  onSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (err) return;
        this.props.dispatch({
          type: 'login/login',
          payload: {
            username: values.username,
            password: values.password
          }
        })
          .then( res=> {
            console.log(res)
          })
        // this.props.history.push('/cont')
      }
    )
  };

  renderMessage = (message) => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={message}
        type="error"
        showIcon
      />
    );
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className={styles.main}>
        <Form onSubmit={this.onSubmit}>
          {
            this.props.loginStatus === 'ERROR'  && this.renderMessage('账户或密码错误')
          }
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: '请输入账户名！',
              }],
            })(
              <Input
                size="large"
                prefix={<Icon type="user" className={styles.prefixIcon} />}
                placeholder="username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入密码',
              }],
            })(
              <Input
                size="large"
                prefix={<Icon type="lock" className={styles.prefixIcon} />}
                placeholder="password"
                type='password'
              />
            )}
          </FormItem>
          <Button loading={this.props.loading} size='large' type='primary' className={styles.submit} htmlType='submit'>登录</Button>
        </Form>
      </div>
    )
  }
}

export default connect((state: ConnectState)=>({
  loginStatus: state.login.loginStatus,
  loading: state.login.loading
}))(
  Form.create<LoginProps>()(Login)
)
