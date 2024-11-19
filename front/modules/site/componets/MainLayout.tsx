"use client";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { ReactNode } from "react";

const { Header, Sider, Content } = Layout;

type Props = {
  children?: ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      {/* Хэдер */}
      <Header className="bg-blue-500 text-white flex items-center justify-between px-6">
        <div className="text-xl font-bold">Мое Приложение</div>
        <Menu
          theme="dark"
          mode="horizontal"
          className="bg-blue-500"
          items={[
            { key: "1", label: <Link href="/">Главная</Link> },
            { key: "2", label: <Link href="/about">О нас</Link> },
            { key: "3", label: <Link href="/contact">Контакты</Link> },
          ]}
        />
      </Header>

      {/* Основной Layout */}
      <Layout>
        {/* Сайдбар */}
        <Sider
          width={200}
          className="bg-gray-800 text-white"
          breakpoint="lg"
          collapsedWidth="80"
        >
          <Menu
            theme="dark"
            mode="inline"
            className="bg-gray-800 h-full"
            items={[
              { key: "1", label: <Link href="/dashboard">Панель</Link> },
              { key: "2", label: <Link href="/settings">Настройки</Link> },
              { key: "3", label: <Link href="/profile">Профиль</Link> },
            ]}
          />
        </Sider>

        {/* Контент */}
        <Content className="bg-gray-100 p-6">
          <div className="bg-white rounded-lg shadow-lg p-6">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
