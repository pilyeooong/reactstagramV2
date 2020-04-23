import React, { useState, useEffect } from "react";
import { useAppContext } from "stores/store";
import { useAxios, axiosInstance } from "utils/api";
import { Form, Input, Button, notification, Select } from "antd";
import AppLayout from "components/AppLayout";
import { SmileOutlined } from "@ant-design/icons";

function Profile() {
  const {
    store: { jwtToken },
  } = useAppContext();
  const [userProfile, setUserProfile] = useState([]);
  const headers = { Authorization: `JWT ${jwtToken} ` };
  const [{ data: profileData }] = useAxios({
    url: "accounts/profile-edit",
    headers,
  });
  const { Option } = Select;
  useEffect(() => {
    setUserProfile(profileData);
  }, [profileData]);

  const onFinish = (values) => {
    async function editProfile() {
      const { username, email, phone_number, gender, bio } = values;
      const data = { username, email, phone_number, gender, bio };
      const headers = { Authorization: `JWT ${jwtToken} ` };
      try {
        await axiosInstance.patch("/accounts/profile-edit/", data, { headers });
        notification.open({
          message: "프로필 수정 완료",
          description: "프로필을 업데이트 하였습니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />
        })
      }
      catch(error){
        console.log(error);
      }
    }
    editProfile();
  };

  return (
    <AppLayout>
      {userProfile &&
      <Form {...layout} onFinish={onFinish} style={{ paddingTop: "20px" }}>
        <Form.Item label="아이디" name="username">
          <Input defaultValue={userProfile.username} disabled/>
        </Form.Item>
        <Form.Item label="이메일" name="email">
          <Input defaultValue={userProfile.email} />
        </Form.Item>
        <Form.Item label="휴대폰 번호" name="phone_number">
          <Input defaultValue={userProfile.phone_number} />
        </Form.Item>
        <Form.Item label="성별" name="gender">
          <Select name="gender" id="" defaultValue={userProfile.gender}>
            <Option value="">---------</Option>
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Else">Else</Option>
          </Select>
        </Form.Item>
        <Form.Item label="자기소개" name="bio">
          <Input defaultValue={userProfile.bio} />
        </Form.Item>
        <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          수정
        </Button>
      </Form.Item>
      </Form>}
    </AppLayout>
  )
}

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 22, span: 24 },
};


export default Profile;
