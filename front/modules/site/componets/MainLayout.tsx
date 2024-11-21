"use client";
import { PhotoProvider } from "@/modules/photos/components/context/Photos";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const { Header, Sider, Content } = Layout;

type Props = {
  children?: ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <PhotoProvider>
      <Layout className="min-h-screen">
        {/* Хэдер */}
        <Header className="bg-blue-500 text-white flex items-center justify-between px-6">
          <div className="text-xl font-bold">PhotoShare</div>
          <Menu
            theme="dark"
            mode="horizontal"
            className="bg-blue-500"
            items={[
              { key: "1", label: <Link href="/">Поиск</Link> },
              { key: "2", label: <Link href="/about">Профиль</Link> },
              {
                key: "3",
                label: (
                  <Link href="/login" onClick={() => router.push("/login")}>
                    Выход
                  </Link>
                ),
              },
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
                { key: "1", label: <Link href="/dashboard">Фото</Link> },
                { key: "2", label: <Link href="/settings">Чат</Link> },
                { key: "3", label: <Link href="/profile">Настройки</Link> },
              ]}
            />
          </Sider>

          {/* Контент */}
          <Content
            className="bg-gray-100"
            style={{
              // padding: "12px 12px", // Добавляем отступы слева и справа
              maxWidth: "1200px",
              margin: "12px auto",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </PhotoProvider>
  );
};

export default MainLayout;
