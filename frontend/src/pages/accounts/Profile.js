import React, { useState, useEffect } from "react";
import { useAppContext } from "stores/store";
import { useAxios, axiosInstance } from "utils/api";
import { getBase64FromFile } from "utils/base64";
import AppLayout from "components/Layout/AppLayout";
import { Form, Input, Button, notification, Select, Upload, Modal } from "antd";
import { SmileOutlined, PlusOutlined } from "@ant-design/icons";

function Profile() {
  const {
    store: { jwtToken },
  } = useAppContext();
  const [userProfile, setUserProfile] = useState([]);
  const headers = { Authorization: `JWT ${jwtToken} ` };
  const [fileList, setFileList] = useState([]);
  const [previewPhoto, setPreviewPhoto] = useState({
    visible: false,
    base64: null,
  });
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handlePreviewPhoto = async (file) => {
    if (!file.url && !FileReader.preview) {
      file.preview = await getBase64FromFile(file.originFileObj);
    }

    setPreviewPhoto({
      visible: true,
      base64: file.url || file.preview,
    });
  };

  const [{ data: profileData }] = useAxios({
    url: "accounts/profile",
    headers,
  });
  const { Option } = Select;

  useEffect(() => {
    setUserProfile(profileData);
  }, [profileData]);

  const onFinish = async (values) => {
      const { username, email, phone_number, gender, bio } = values;
      const data = { username, email, phone_number, gender, bio };
      const headers = { Authorization: `JWT ${jwtToken} ` };
      try {
        await axiosInstance.patch("/accounts/profile/", data, { headers });
        notification.open({
          message: "프로필 수정 완료",
          description: "프로필을 업데이트 하였습니다.",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <>
      {userProfile && (
        <AppLayout username={userProfile.username}>
          <Form {...layout} onFinish={onFinish} style={{ paddingTop: "20px" }}>
            <Form.Item label="아이디" name="username">
              <Input defaultValue={userProfile.username} disabled />
            </Form.Item>
            <Form.Item label="이메일" name="email">
              <Input defaultValue={userProfile.email} />
            </Form.Item>
            <Form.Item label="프로필 사진" name="avatar">
              <Upload
                listType="picture-card"
                fileList={fileList}
                beforeUpload={() => {
                  return false;
                }}
                onChange={handleUploadChange}
                onPreview={handlePreviewPhoto}
              >
                {fileList.length > 0 ? null : (
                  <div>
                    <PlusOutlined />
                    <div className="ant-upload-text">Upload</div>
                  </div>
                )}
              </Upload>
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

            <Modal
              visible={previewPhoto.visible}
              footer={null}
              onCancel={() => setPreviewPhoto({ visible: false })}
            >
              <img
                src={previewPhoto.base64}
                style={{ width: "100%" }}
                alt="Preview"
              />
            </Modal>
          </Form>
        </AppLayout>
      )}
    </>
  );
}

const layout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 22, span: 24 },
};

export default Profile;
