import React, { useState } from "react";
import { Form, Input, Button, notification, Card } from "antd";
import { useHistory, Link } from "react-router-dom";
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
        if (error.response) {
          notification.open({
            message: "회원가입 실패",
            description: "아이디/암호를 확인해주세요",
            icon: <FrownOutlined style={{ color: "ff3333" }} />,
          });
          const { data: fieldErrorMessages } = error.response;
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
    handleSignUp();
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
      <Card title="회원가입" style={{ width: 600, margin: "0 auto" }}>
        <Form {...layout} onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              { min: 3, message: "3글자 이상을 입력해 주세요." },
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
              회원가입
            </Button>
          </Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 3.5rem"}}>
            <h5>아이디가 이미 있으신가요 ? <Link to={"/accounts/login"}> 로그인</Link></h5>
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

export default Singup;
