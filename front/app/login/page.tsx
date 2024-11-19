"use client";
import React, { useState } from "react";
import { Tabs, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-400 via-sky-300 to-indigo-500 p-6">
      <div className="bg-yellow-300 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          <Tabs defaultActiveKey="1">
            {/* Вкладка "Вход" */}
            <TabPane tab="Вход" key="1">
              <Form
                name="login"
                onFinish={() => {}}
                layout="vertical"
                requiredMark={false}
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Введите имя пользователя!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Имя пользователя"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[{ required: true, message: "Введите пароль!" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Пароль"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  loading={false}
                  style={{ background: "black" }}
                >
                  Войти
                </Button>
              </Form>
            </TabPane>

            {/* Вкладка "Регистрация" */}
            <TabPane tab="Регистрация" key="2">
              <Form
                name="register"
                onFinish={() => {}}
                layout="vertical"
                requiredMark={false}
              >
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Введите email!",
                      type: "email",
                    },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: "Введите имя пользователя!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Имя пользователя"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Введите пароль!" },
                    {
                      min: 6,
                      message: "Пароль должен быть минимум 6 символов!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Пароль"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full"
                  loading={false}
                >
                  Зарегистрироваться
                </Button>
              </Form>
            </TabPane>
          </Tabs>
        </h2>
      </div>
    </div>
  );
};

export default LoginPage;
