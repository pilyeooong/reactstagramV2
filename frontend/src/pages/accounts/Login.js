import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Input, Button, notification, Card } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAppContext, setToken } from "stores/store";

function Login () {
  const { dispatch } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const [fieldErrors, setFieldErrors] = useState({});
  const { from: loginRedirectUrl } = location.state || { from: { pathname: "/" }};

  const onFinish = (value) => {
    async function handleLogin() {
      const { username, password } = value;
      const data = { username, password };
      const apiUrl = "http://localhost:8000/accounts/token/";
      try{
        const response = await axios.post(apiUrl, data);
        const { data: { token : jwtToken } } = response;
        dispatch(setToken(jwtToken));
        notification.open({
          message: "로그인 성공",
          icon: <SmileOutlined style={{ color : "108ee9" }} />
        });
        history.push(loginRedirectUrl);
      }
      catch(error){
        if(error.response){
          notification.open({
            message: "로그인 실패",
            description: "아이디/암호를 확인해주세요",
            icon: <FrownOutlined style={{ color : "ff3333" }} />
          });
          const { data: fieldErrorMessages } = error.response;
          console.log(error.response);
          setFieldErrors(
            Object.entries(fieldErrorMessages).reduce((acc, [fieldName, errors]) => {
              acc[fieldName] = {
                validateStatus: "error",
                help: errors.join(" ")
              };
              return acc;
            }, {})
          )
        }
      }
    }
    handleLogin();
  };

  return (
    <Card title="로그인">
    <Form {...layout} onFinish={onFinish}>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
        hasFeedback
        {...fieldErrors.username}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        {...fieldErrors.password}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Card>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


export default Login;