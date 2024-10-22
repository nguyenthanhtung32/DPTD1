import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = ({ setIsLogin }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const defaultUser = "Admin";
    const defaultPassword = "Dream@123";

    if (user === defaultUser && password === defaultPassword) {
      message.success("Đăng nhập thành công");
      localStorage.setItem("token", "fake_token"); // Lưu token giả vào localStorage
      setIsLogin(true);
      window.location.href = "/recruitment"; // Chuyển hướng đến trang recruitment
    } else {
      message.error("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  return (
    <div className="mt-40 md:mt-40 h-full">
      <title>Đăng nhập</title>
      <div className="py-14 flex items-center justify-center">
        <Form
          onSubmit={handleSubmit}
          className="p-4 sm:p-8 shadow-2xl border border-gray sm:w-1/2"
        >
          <h2 className="mt-2 font-bold text-3xl text-center">Đăng nhập</h2>
          <h4 className="mt-1 py-1 text-black opacity-40 text-center">
            Nhập thông tin đăng nhập để có thể truy cập tài khoản
          </h4>

          <Form.Item name="user" className="mx-12 pt-2">
            <Input
              type="text"
              id="user"
              value={user}
              onChange={handleUserChange}
              className="h-12"
              prefix={<UserOutlined  className="mr-2 text-lg text-primary" />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item name="password" className="mx-12">
            <Input.Password
              className="h-12"
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              prefix={<LockOutlined className="mr-2 text-lg text-primary" />}
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item className="text-center mx-12">
            <Button
              type="submit"
              htmlType="submit"
              onClick={handleSubmit}
              className="w-full bg-black hover:bg-gray hover:text-black text-white p-2 h-12"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
