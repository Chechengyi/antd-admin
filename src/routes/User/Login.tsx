import * as React from 'react'
import styles from './Login.less'
import {
  Form,
  Input,
  Button,
  Alert
} from 'antd'
import { UserOutlined, LockFilled } from '@ant-design/icons'
import { FormProps } from 'antd/lib/form/Form'
import { connect } from 'dva'
import { RouteComponentProps } from 'react-router-dom'
import { LoginModalState, ConnectState } from '../../models/connect'


interface LoginProps extends RouteComponentProps, LoginModalState {
  dispatch: (e) => Promise<void>;
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const validateMessages = {
  required: '${label} 不能为空',
};

const Login: React.FC<LoginProps> = (props) => {

  const [form] = Form.useForm()

  const onSubmit = () => {
    form.validateFields()
      .then(values => {
        console.log(values)
        props.dispatch({
          type: 'login/login',
          payload: {
            username: values.username,
            password: values.password
          }
        })
          .then(res => {
            console.log(res)
          })
      })
  }

  const renderMessage = (message: string) => {
    return (
      <Alert
        message={message}
        type="error"
        showIcon
      />
    );
  };

  return (
    <div className={styles.main}>
      <Form
        form={form}
        {...formItemLayout}
        validateMessages={validateMessages}
      >
        {props.loginStatus === 'ERROR' && <Form.Item wrapperCol={{ span: 18, offset: 4 }}>
          {renderMessage('用户名或密码错误')}
        </Form.Item>}
        <Form.Item label='用户名' name='username' rules={[{ required: true }]}>
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item label='密码' name='password' rules={[{ required: true }]}>
          <Input type='password' prefix={<LockFilled />} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 18, offset: 4 }}>
          <Button loading={props.loading} type='primary' className={styles.submit} onClick={onSubmit}>登录</Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default connect((state: ConnectState) => ({
  loading: state.login.loading,
  loginStatus: state.login.loginStatus
}))(Login)
