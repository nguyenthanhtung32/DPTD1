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

const apiName = "/employee";

function Schedule() {
  const [data, setData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const router = useRouter();
  const [refresh, setRefresh] = useState(0);

  //   const handleLogout = () => {
  //     localStorage.removeItem("token");
  //     router.push("/");
  //   };

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       alert("Vui lòng đăng nhập để xem nội dung.");
  //       window.location.href = "/viet-nam";
  //     } else {
  //       setIsLogin(true);
  //     }
  //   }, []);

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

  //   const onFinish = (values) => {
  //     const payload = {
  //       title: values.title || "",
  //       titleVietnamese: values.titleVietnamese || "",
  //       quantity: Number(values.quantity) || 0,
  //       location: values.location || "",
  //       deadline: values.deadline || "",
  //       summary: values.summary ? values.summary.split("\n") : [],
  //       responsibilities: values.responsibilities
  //         ? values.responsibilities.split("\n")
  //         : [],
  //     };
  //     axiosClient
  //       .post(apiName, payload)
  //       .then(() => {
  //         setRefresh((f) => f + 1);
  //         createForm.resetFields();
  //         message.success("Thêm mới thành công", 1.5);
  //         setShowTable(true);
  //       })
  //       .catch((err) => {
  //         console.error(err.response.data);
  //         message.error("Thêm mới không thành công", 1.5);
  //       });
  //   };

  //   const onUpdateFinish = (values) => {
  //     const payload = {
  //       title: values.title || "",
  //       titleVietnamese: values.titleVietnamese || "",
  //       quantity: Number(values.quantity) || 0,
  //       location: values.location || "",
  //       deadline: values.deadline || "",
  //       summary: values.summary ? values.summary.split("\n") : [],
  //       responsibilities: values.responsibilities
  //         ? values.responsibilities.split("\n")
  //         : [],
  //     };

  //     axiosClient
  //       .patch(`${apiName}/${updateId}`, payload)
  //       .then(() => {
  //         setRefresh((f) => f + 1);
  //         updateForm.resetFields();
  //         message.success("Cập nhật thành công", 1.5);
  //         setOpen(false);
  //       })
  //       .catch((err) => {
  //         console.error(err.response.data);
  //       });
  //   };

  //   const handleDelete = (_id) => {
  //     axiosClient
  //       .delete(`${apiName}/${_id}`)
  //       .then(() => {
  //         setRefresh((f) => f + 1);
  //         message.success("Xóa thành công", 1.5);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   };

  //   const handleUpdateClick = (item) => {
  //     setOpen(true);
  //     setUpdateId(item._id);
  //     updateForm.setFieldsValue({
  //       title: item.title,
  //       titleVietnamese: item.titleVietnamese,
  //       quantity: item.quantity,
  //       location: item.location,
  //       deadline: item.deadline.slice(0, 10),
  //       summary: item.summary.join("\n"),
  //       responsibilities: item.responsibilities.join("\n"),
  //     });
  //   };

  return (
    <table className="min-w-full mb-10 mt-60">
      <thead className="bg-black text-yellow font-roboto">
        <tr>
          <th className="border w-1/12 py-3">STT</th>
          <th className="border w-1/6 py-3">Employee ID</th>
          <th className="border w-1/6 py-3">Full Name</th>
          <th className="border w-1/12 py-3">English Nickname</th>
          <th className="border w-1/12 py-3">Department</th>
          <th className="border w-1/12 py-3">Position</th>
          <th className="border w-1/12 py-3">Status</th>
        </tr>
      </thead>
      <tbody>
    
            <tr>
              <td className="border text-left px-4 text-ellipsis overflow-hidden whitespace-nowrap">
                1
              </td>
              <td className="border text-left px-4 text-ellipsis overflow-hidden whitespace-nowrap">
                DP00051
              </td>
              <td className="border text-center">Nguyễn Thanh Tùng</td>
              <td className="border text-left px-4 text-ellipsis overflow-hidden whitespace-nowrap">
                Liam
              </td>
              <td className="border text-center">Central Services</td>
              <td className="border text-left px-4 max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap">
                Technical Specialist
              </td>
              <td className="border text-left px-4 max-w-[150px] text-ellipsis overflow-hidden whitespace-nowrap">
                FT_Probation
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
      </tbody>
    </table>
  );
}

export default Schedule;
