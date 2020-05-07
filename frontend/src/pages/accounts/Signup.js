import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { axiosInstance } from "utils/api";

function Singup() {
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  const onFinish = (values) => {
    async function handleSignUp() {
      const { username, password } = values;
      const data = { username, password };
      try {
        await axiosInstance.post("/accounts/signup/", data);
        notification.open({
          message: "회원가입 성공",
          description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        history.push("login");
      } catch (error) {
        if(error.response){
          notification.open({
            message: "회원가입 실패",
            description: "아이디/암호를 확인해주세요",
            icon: <FrownOutlined style={{ color : "ff3333" }} />
          });
          const { data: fieldErrorMessages } = error.response;
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
    handleSignUp();
  };
  return (
    <Form {...layout} onFinish={onFinish}>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: "Please input your username!" },
          { min: 3, message: "3글자 이상을 입력해 주세요."}
        ]}
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
  );
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default Singup;
