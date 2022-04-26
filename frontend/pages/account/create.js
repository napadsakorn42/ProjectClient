import { useRouter } from "next/router";
import {
  Row,
  Col,
  Form,
  Typography,
  Button,
  Input,
  DatePicker,
  Select,
} from "antd";
import { useState } from "react";
import axios from "axios";
import config from "../../config/config";
import withAuth from "../../components/withAuth";

const CreateAccount = ({ token }) => {
  const router = useRouter();
  const [account, setAccount] = useState({
    id: undefined,
    name: undefined,
    transactionDate: undefined,
    description: undefined,
    value: undefined,
    type: undefined,
  });

  const onChangeDate = async (dateTime, dateString) => {
    console.log(dateString);
    setAccount({
      ...account,
      transactionDate: dateString,
    });
  };

  const createAccount = async () => {
    const res = await axios.post(
      `${config.URL}/account`,
      { ...account },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      router.push("/");
    }
  };

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
            แบบฟอร์มรายรับรายจ่าย
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
                value={account.date}
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
            <Row>
              <Select
                placeholder="กรุณาเลือกประเภทการทำรายการ"
                style={{ marginBottom: "1rem" }}
                value={account.type}
                onChange={(e) =>
                  setAccount({
                    ...account,
                    type: e,
                  })
                }
              >
                <Select.Option key={1} value="add">
                  รายรับ
                </Select.Option>
                <Select.Option key={2} value="subtract">
                  รายจ่าย
                </Select.Option>
              </Select>
            </Row>
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
              ยกเลิก
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
              onClick={createAccount}
            >
              สร้าง
            </Button>
          </Form.Item>
        </Row>
      </Col>
    </Row>
  );
};
export default withAuth(CreateAccount);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
