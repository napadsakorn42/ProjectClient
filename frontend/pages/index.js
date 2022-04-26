import MainLayout from "../components/layout";
import React, { useState, useEffect } from "react";
import { Row, Col, Table, Typography, Button } from "antd";
import axios from "axios";
import config from "../config/config";
import { useRouter } from "next/router";

export default function Home({ token }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [tableSetting, setTableSetting] = useState({
    current: 1,
    pageSize: 10,
    total: null,
    defaultPageSize: 10,
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableSetting({
      ...tableSetting,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const deleteAccount = async (id) => {
    const res = await axios.delete(`${config.URL}/account/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      listAccount();
    }
  };

  const listAccount = async () => {
    const sumPage = tableSetting.current * tableSetting.pageSize;
    const skip = sumPage - tableSetting.pageSize;
    const take = tableSetting.pageSize;

    const res = await axios.get(`${config.URL}/accounts/${skip}/${take}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setIsLoading(false);
    setTableSetting({
      ...tableSetting,
      total: res.data.totalItems,
    });
    setAccounts(res.data.items);
    setRevenue(res.data.revenue);
    setExpenses(res.data.expenses);
  };

  const columns = [
    {
      title: "ชื่อรายการ",
      dataIndex: "name",
    },
    {
      title: "วันที่ทำรายการ",
      dataIndex: "transactionDate",
    },
    {
      title: "รายละเอียด",
      dataIndex: "description",
      render: (text, record) => {
        if (text.length) {
          return (
            <Row justify="center">
              <Typography.Text style={{ fontSize: "1rem" }}>
                {text}
              </Typography.Text>
            </Row>
          );
        }
        return (
          <Row justify="center">
            <Typography.Text style={{ fontSize: "2rem" }}>-</Typography.Text>
          </Row>
        );
      },
    },
    { title: "จำนวนเงิน", dataIndex: "value" },
    {
      title: "ประเภทการทำรายการ",
      dataIndex: "type",
      render: (text, record) => {
        if (text === "add") {
          return (
            <Row justify="center">
              <Typography.Text style={{ fontSize: "1rem" }}>
                รายรับ
              </Typography.Text>
            </Row>
          );
        }
        return (
          <Row justify="center">
            <Typography.Text style={{ fontSize: "1rem" }}>
              รายจ่าย
            </Typography.Text>
          </Row>
        );
      },
    },
    {
      fixed: "right",
      render: (text, record) => (
        <Row>
          <Button
            className="btn-detail"
            onClick={() => router.push(`account/${record.id}`)}
          >
            ดูรายละเอียด
          </Button>
          <Button onClick={() => deleteAccount(record.id)} className="btn-qr">
            ลบ
          </Button>
        </Row>
      ),
    },
  ];

  useEffect(() => {
    listAccount();
  }, []);

  return (
    <MainLayout>
      <Row style={{ width: "100%" }}>
        <Col style={{ width: "100%" }}>
          <Row justify="start" style={{ padding: "1rem 0" }}>
            <Typography.Title level={1}>รายการรายรับรายจ่าย</Typography.Title>
          </Row>
          <Row style={{ marginBottom: 30 }}>
            <Button type="primary" href="/account/create">
              สร้างบันทึกรายรับรายจ่าย
            </Button>
          </Row>
          <Row style={{ marginBottom: 30 }}>
            <Typography.Text
              style={{ paddingRight: "5rem", fontWeight: "bold" }}
            >
              ยอดรวมรายรับ : {revenue}
            </Typography.Text>
            <Typography.Text style={{ fontWeight: "bold" }}>
              ยอดรวมรายจ่าย : {expenses}
            </Typography.Text>
          </Row>
          <Table
            columns={columns}
            dataSource={accounts}
            loading={isLoading}
            pagination={{
              current: tableSetting.current,
              total: tableSetting.total,
              defaultPageSize: tableSetting.defaultPageSize,
            }}
            onChange={handleTableChange}
            scroll={{ x: 1500 }}
          />
        </Col>
      </Row>
    </MainLayout>
  );
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
