import React, { useEffect, useState } from "react";
import { Popconfirm, Form, Modal, Input, message, Button } from "antd";
import axiosClient from "@/libraries/axiosClient";
import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  EditOutlined,
  DeleteOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { LogOut } from "lucide-react";

const apiName = "/recruitment";

function Recruitment() {
  const [data, setData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const router = useRouter();
  const [refresh, setRefresh] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Vui lòng đăng nhập để xem nội dung.");
      window.location.href = "/viet-nam";
    } else {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    axiosClient
      .get(apiName)
      .then((response) => {
        const { data } = response;
        setData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  const onFinish = (values) => {
    const payload = {
      title: values.title || "",
      titleVietnamese: values.titleVietnamese || "",
      quantity: Number(values.quantity) || 0,
      location: values.location || "",
      deadline: values.deadline || "",
      summary: values.summary ? values.summary.split("\n") : [],
      responsibilities: values.responsibilities
        ? values.responsibilities.split("\n")
        : [],
    };
    axiosClient
      .post(apiName, payload)
      .then(() => {
        setRefresh((f) => f + 1);
        createForm.resetFields();
        message.success("Thêm mới thành công", 1.5);
        setShowTable(true);
      })
      .catch((err) => {
        console.error(err.response.data);
        message.error("Thêm mới không thành công", 1.5);
      });
  };

  const onUpdateFinish = (values) => {
    const payload = {
      title: values.title || "",
      titleVietnamese: values.titleVietnamese || "",
      quantity: Number(values.quantity) || 0,
      location: values.location || "",
      deadline: values.deadline || "",
      summary: values.summary ? values.summary.split("\n") : [],
      responsibilities: values.responsibilities
        ? values.responsibilities.split("\n")
        : [],
    };

    axiosClient
      .patch(`${apiName}/${updateId}`, payload)
      .then(() => {
        setRefresh((f) => f + 1);
        updateForm.resetFields();
        message.success("Cập nhật thành công", 1.5);
        setOpen(false);
      })
      .catch((err) => {
        console.error(err.response.data);
      });
  };

  const handleDelete = (_id) => {
    axiosClient
      .delete(`${apiName}/${_id}`)
      .then(() => {
        setRefresh((f) => f + 1);
        message.success("Xóa thành công", 1.5);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateClick = (item) => {
    setOpen(true);
    setUpdateId(item._id);
    updateForm.setFieldsValue({
      title: item.title,
      titleVietnamese: item.titleVietnamese,
      quantity: item.quantity,
      location: item.location,
      deadline: item.deadline.slice(0, 10),
      summary: item.summary.join("\n"),
      responsibilities: item.responsibilities.join("\n"),
    });
  };

  return (
    <div className="mt-32 h-screen">
      <title>Danh Sách Tuyển Dụng</title>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />

      <div className="flex justify-center mb-4">
        <Link href="/recruitment">
          <button
            className={`mx-2 px-4 py-2 rounded ${
              router.pathname === "/recruitment"
                ? "bg-black text-white"
                : "bg-white text-black border border-black"
            }`}
          >
            Tuyển dụng
          </button>
        </Link>
        <Link href="/hot">
          <button
            className={`mx-2 px-4 py-2 rounded ${
              router.pathname === "/hot"
                ? "bg-black text-white"
                : "bg-white text-black border border-black"
            }`}
          >
            Tuyển dụng gấp
          </button>
        </Link>
        <button
          className="mx-2 px-4 py-2 rounded flex border"
          onClick={handleLogout}
        >
          Đăng xuất
          <LogOut className="cursor-pointer ml-2" />
        </button>
      </div>

      {isLogin && (
        <>
          {showTable ? (
            <>
              <h1 className="text-2xl text-center mt-3">
                Danh Sách Vị Trí Tuyển Dụng
              </h1>
              <div className="flex justify-end pr-2">
                <button
                  className="flex items-center py-1 px-1 mb-2 rounded-md border-2 border-black hover:bg-black hover:text-white"
                  onClick={() => setShowTable(false)}
                >
                  <span>Thêm Vị Trí Tuyển Dụng</span>
                </button>
              </div>
              <table className="min-w-full mb-10">
                <thead className="bg-black text-yellow font-roboto">
                  <tr>
                    <th className="border w-1/12 py-3">STT</th>
                    <th className="border w-1/6 py-3">Title</th>
                    <th className="border w-1/6 py-3">Title (Vietnamese)</th>
                    <th className="border w-1/12 py-3">Quantity</th>
                    <th className="border w-1/12 py-3">Location</th>
                    <th className="border w-1/12 py-3">Deadline</th>
                    <th className="border w-1/6 py-3 max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap">
                      Summary
                    </th>
                    <th className="border w-1/6 py-3 max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap">
                      Responsibilities
                    </th>
                    <th className="border w-1/6 py-3">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 &&
                    data.map((item, index) => (
                      <tr key={item._id}>
                        <td className="border text-center">{index + 1}</td>
                        <td className="border text-left px-4 text-ellipsis overflow-hidden whitespace-nowrap">
                          {item.title}
                        </td>
                        <td className="border text-left px-4 text-ellipsis overflow-hidden whitespace-nowrap">
                          {item.titleVietnamese}
                        </td>
                        <td className="border text-center">{item.quantity}</td>
                        <td className="border text-left px-4 text-ellipsis overflow-hidden whitespace-nowrap">
                          {item.location}
                        </td>
                        <td className="border text-center">
                          {new Date(item.deadline).toLocaleDateString()}
                        </td>
                        <td className="border text-left px-4 max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap">
                          {item.summary.join(", ")}
                        </td>
                        <td className="border text-left px-4 max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap">
                          {item.responsibilities.join(", ")}
                        </td>
                        <td className="border text-center">
                          <button
                            className="mr-2 flex justify-center items-center text-white bg-blue-500 w-full rounded  my-1"
                            onClick={() => handleUpdateClick(item)}
                          >
                            <EditOutlined /> Sửa
                          </button>
                          <Popconfirm
                            title="Xác nhận xóa?"
                            onConfirm={() => handleDelete(item._id)}
                            okText="Có"
                            cancelText="Không"
                            okButtonProps={{
                              style: {
                                backgroundColor: "black",
                                color: "white",
                              },
                            }}
                            overlayStyle={{
                              width: "300px", 
                              padding: "20px", 
                            }}
                          >
                            <button className="mr-2 flex justify-center items-center text-white bg-red w-full rounded my-1">
                              <DeleteOutlined /> Xóa
                            </button>
                          </Popconfirm>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <Modal
                open={open}
                onCancel={() => setOpen(false)}
                cancelText="Hủy"
                okText="Cập nhật"
                okButtonProps={{
                  style: {
                    color: "white",
                    background: "black",
                  },
                }}
                onOk={() => updateForm.submit()}
                title="Sửa Vị Trí Tuyển Dụng"
                className="text-center"
              >
                <Form
                  form={updateForm}
                  name="update-form"
                  onFinish={onUpdateFinish}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                >
                  <Form.Item label="Tiêu đề" name="title">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Tiêu đề (Vietnamese)"
                    name="titleVietnamese"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label="Số lượng" name="quantity">
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item label="Địa điểm" name="location">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Hạn nộp" name="deadline">
                    <Input type="date" />
                  </Form.Item>
                  <Form.Item label="Tóm tắt" name="summary">
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item label="Trách nhiệm" name="responsibilities">
                    <Input.TextArea />
                  </Form.Item>
                </Form>
              </Modal>
            </>
          ) : (
            <>
              <div style={{ textAlign: "left" }}>
                <button
                  className="mt-3 ml-3"
                  onClick={() => setShowTable(true)}
                >
                  <RollbackOutlined /> Quay lại danh sách
                </button>
              </div>
              <h1 className="text-center text-2xl pb-3">Thêm Danh Mục</h1>
              <Form
                className="w-4/5"
                form={createForm}
                name="create-form"
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Form.Item
                  label="Tiêu đề"
                  name="title"
                  rules={[{ required: true, message: "Hãy điền tiêu đề" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item label="Tiêu đề (Vietnamese)" name="titleVietnamese">
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Số lượng"
                  name="quantity"
                  rules={[{ required: true, message: "Hãy điền số lượng" }]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Địa điểm"
                  name="location"
                  rules={[{ required: true, message: "Hãy điền địa điểm" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Hạn nộp"
                  name="deadline"
                  rules={[{ required: true, message: "Hãy điền hạn nộp" }]}
                >
                  <Input type="date" />
                </Form.Item>
                <Form.Item label="Tóm tắt" name="summary">
                  <Input.TextArea />
                </Form.Item>
                <Form.Item label="Trách nhiệm" name="responsibilities">
                  <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button htmlType="submit" className="bg-black text-white">
                    Thêm Mới
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Recruitment;
