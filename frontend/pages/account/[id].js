import { useRouter } from "next/router";
import { Row, Col, Form, Typography, Button, Input, DatePicker } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/config";
import moment from "moment";
import withAuth from "../../components/withAuth";

const Account = ({ token }) => {
  const router = useRouter();
  const { id } = router.query;
  const [account, setAccount] = useState({
    id: undefined,
    name: undefined,
    transactionDate: undefined,
    description: undefined,
    value: undefined,
    type: undefined,
  });

  const getAccountById = async () => {
    const accountId = id ? id : window.location.pathname.split("/account/")[1];
    const res = await axios.get(`${config.URL}/account/${accountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      setAccount(res.data);
    }
  };

  const updateAccount = async () => {
    const res = await axios.put(
      `${config.URL}/account/${account.id}`,
      { ...account },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      setAccount(res.data);
    }
  };

  const onChangeDate = async (dateTime, dateString) => {
    if (dateString) {
      setAccount({
        ...account,
        transactionDate: dateString,
      });
    }
    setAccount({
      ...account,
      transactionDate: undefined,
    });
  };

  useEffect(() => {
    getAccountById();
  }, []);
  return (
    <Row justify="center" style={{ fontFamily: "Kanit" }}>
      <Col
        span={20}
        style={{
          height: "100%",
          border: "1px solid #e1e1e1",
          borderRadius: "10px",
        }}
      >
        <Row
          justify="space-between"
          style={{
            backgroundColor: "#e1e1e1",
            borderRadius: "10px 10px 0px 0px",
            padding: "12px 0px",
          }}
        >
          <Typography.Text
            style={{
              color: "#292929",
              fontSize: "16px",
              paddingLeft: "24px",
              fontWeight: "bold",
            }}
          >
            รายละเอียดรายรับรายจ่าย
          </Typography.Text>
        </Row>
        <Row justify="center">
          <Col
            span={20}
            style={{
              padding: 20,
              width: "80%",
              height: "100%",
            }}
          >
            <Typography.Text>ชื่อรายการ</Typography.Text>
            <Input
              style={{ marginBottom: "1rem" }}
              value={account.name}
              onChange={(e) =>
                setAccount({
                  ...account,
                  name: e.target.value,
                })
              }
            />
            <Typography.Text>วันที่ทำรายการ</Typography.Text>
            <Row>
              <DatePicker
                style={{ marginBottom: "1rem", width: "25%" }}
                value={
                  account.transactionDate
                    ? moment(account.transactionDate, "YYYY-MM-DD")
                    : undefined
                }
                format={"YYYY-MM-DD"}
                onChange={onChangeDate}
              />
            </Row>
            <Typography.Text>รายละเอียดรายรับรายจ่าย</Typography.Text>
            <Input
              style={{ marginBottom: "1rem" }}
              value={account.description}
              onChange={(e) =>
                setAccount({
                  ...account,
                  description: e.target.value,
                })
              }
            />
            <Typography.Text>จำนวนเงิน</Typography.Text>
            <Input
              style={{ marginBottom: "1rem" }}
              value={account.value}
              onChange={(e) =>
                setAccount({
                  ...account,
                  value: e.target.value,
                })
              }
            />
            <Typography.Text>ประเภทการทำรายการ</Typography.Text>
            <Input
              style={{ marginBottom: "1rem" }}
              value={account.type}
              onChange={(e) =>
                setAccount({
                  ...account,
                  type: e.target.value,
                })
              }
            />
          </Col>
        </Row>
        <Row justify="end" style={{ marginTop: "3rem", marginRight: "3rem" }}>
          <Form.Item>
            <Button
              htmlType="button"
              className="back-btn"
              style={{
                color: "#000",
                boxShadow: "5px 4px 8px 1px rgba(0, 0, 0, 0.2)",
                width: "8rem",
                height: "2.5rem",
                fontSize: 16,
              }}
              onClick={() => router.push("/")}
            >
              ย้อนกลับ
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="button"
              style={{
                color: "#000",
                boxShadow: "5px 4px 8px 1px rgba(0, 0, 0, 0.2)",
                width: "8rem",
                height: "2.5rem",
                fontSize: 16,
                marginLeft: 20,
              }}
              onClick={updateAccount}
            >
              อัพเดท
            </Button>
          </Form.Item>
        </Row>
      </Col>
    </Row>
  );
};

export default withAuth(Account);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
