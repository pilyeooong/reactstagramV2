import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Input, Button, notification, Card } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { axiosInstance } from "utils/api";
import { useAppContext, setToken } from "stores/store";

function Login() {
  const { dispatch } = useAppContext();
  const history = useHistory();
  const location = useLocation();
  const [fieldErrors, setFieldErrors] = useState({});
  const { from: loginRedirectUrl } = location.state || {
    from: { pathname: "/" },
  };

  const onFinish = (value) => {
    async function handleLogin() {
      const { username, password } = value;
      const data = { username, password };
      try {
        const response = await axiosInstance.post("/accounts/token/", data);
        const {
          data: { token: jwtToken },
        } = response;
        dispatch(setToken(jwtToken));
        notification.open({
          message: "로그인 성공",
          icon: <SmileOutlined style={{ color: "108ee9" }} />,
        });
        history.push(loginRedirectUrl);
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "로그인 실패",
            description: "아이디/암호를 확인해주세요",
            icon: <FrownOutlined style={{ color: "ff3333" }} />,
          });
          const { data: fieldErrorMessages } = error.response;
          console.log(error.response);
          setFieldErrors(
            Object.entries(fieldErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                acc[fieldName] = {
                  validateStatus: "error",
                  help: errors.join(" "),
                };
                return acc;
              },
              {}
            )
          );
        }
      }
    }
    handleLogin();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Card title="로그인" style={{ width: 600, margin: "0 auto" }}>
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

          <Form.Item {...tailLayout} style={{ display: "flex" }}>
            <Button type="primary" htmlType="submit">
              로그인
            </Button>
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "0 4rem",
            }}
          >
            <h5>
              아이디가 없으신가요 ?{" "}
              <Link to={"/accounts/signup"}> 회원가입</Link>
            </h5>
          </div>
        </Form>
      </Card>
    </div>
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 13 },
};
const tailLayout = {
  wrapperCol: { offset: 18, span: 16 },
};

export default Login;
