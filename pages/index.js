import React, { memo, useState, useEffect, useRef } from "react";
import {
  CheckCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Carousel, Modal } from "antd";
import axiosClient from "@/libraries/axiosClient";
import Moment from "moment";

const CustomArrow = ({ onClick, direction }) => (
  <div
    onClick={onClick}
    style={{
      color: "black",
      fontSize: "24px",
      cursor: "pointer",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      [direction === "prev" ? "left" : "right"]: "10px",
      zIndex: 1,
    }}
  >
    {direction === "prev" ? <LeftOutlined /> : <RightOutlined />}
  </div>
);

function Home() {
  const [jobDescriptions1, setJobDescriptions1] = useState({});
  const [jobDescriptions2, setJobDescriptions2] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const fileInputRef = useRef(null);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedJob(null);
  };

  useEffect(() => {
    const fetchJobDescriptions = async () => {
      try {
        const response1 = await axiosClient.get("/hot");
        setJobDescriptions1(response1.data);

        const response2 = await axiosClient.get("/recruitment");
        setJobDescriptions2(response2.data);
      } catch (error) {
        console.error("Error fetching job descriptions:", error);
      }
    };

    fetchJobDescriptions();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    birthdate: "",
    phone: "",
    email: "",
    position: "",
    cv: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      cv: e.target.files[0],
    }));
  };

  const handleDateChange = (e) => {
    let input = e.target.value;
    input = input.replace(/\D/g, "");
    if (input.length >= 2) input = input.slice(0, 2) + "/" + input.slice(2);
    if (input.length >= 5) input = input.slice(0, 5) + "/" + input.slice(5, 9);

    setFormData({
      ...formData,
      birthdate: input,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("birthdate", formData.birthdate);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("position", formData.position);
    formDataToSend.append("cv", formData.cv);

    try {
      const response = await axiosClient.post(
        "/recruitment/send-email",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
        setFormData({
          name: "",
          birthdate: "",
          phone: "",
          email: "",
          position: "",
          cv: null,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        alert("Có lỗi xảy ra khi gửi email.");
      }
    } catch (error) {
      console.error("Error sending email: ", error);
      alert("Error sending email: " + error.toString());
    }
  };

  return (
    <>
      <title>Tuyển Dụng Dream Poker Đà Nẵng</title>
      <div className="relative">
        <img
          src="/img/background.jpg"
          className="w-full h-[calc(100vh-150px)] object-cover"
          alt="Background"
        />
        <div className="flex flex-wrap absolute top-[70%] left-1/2 transform -translate-x-1/2 border border-white bg-white rounded-lg max-w-7xl w-full p-4">
          {[
            { img: "/img/aboutus.png", title: "ABOUT US", id: "about-us" },
            { img: "/img/section.jpg", title: "SECTION", id: "section" },
            {
              img: "/img/recruitment.png",
              title: "RECRUITMENT",
              id: "recruitment",
            },
            { img: "/img/news.png", title: "NEWS", id: "news" },
          ].map(({ img, title, id }, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center py-5 flex-1 mx-2 transition-transform transform hover:scale-125 hover:bg-purplelight hover:text-white rounded-lg p-4"
            >
              <div className="flex flex-col items-center mb-4">
                <img src={img} className="w-10 h-10 opacity-80" alt={title} />
                <span className="text-lg font-bold mt-2">{title}</span>
              </div>
              <button
                className="rounded-full font-bold text-white border-none bg-yellow px-7"
                onClick={() => {
                  const target = document.getElementById(id);
                  if (target) {
                    const targetPosition =
                      target.getBoundingClientRect().top + window.scrollY - 90;
                    window.scrollTo({
                      top: targetPosition,
                      behavior: "smooth",
                    });
                  } else {
                    console.error(`Element with id "${id}" not found.`);
                  }
                }}
              >
                FINDING
              </button>
            </div>
          ))}
        </div>
      </div>
      <div id="about-us" className="py-8 px-4 md:px-0 mt-32 md:mt-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="md:hidden md:w-3/4 w-full md:pl-8 mb-8 mt-10">
              <div className="flex flex-col justify-center items-center container">
                <h1 className="text-3xl md:text-4xl font-bold text-left w-full">
                  VISION
                </h1>
                <h2 className="text-xl font-bold text-center mt-1">&</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-right w-full">
                  MISSION
                </h3>
              </div>
              <div className="mt-4">
                <p className="text-justify leading-normal text-gray-700">
                  Dream Poker Da Nang Club aims to create a healthy and
                  professional playing environment for all poker enthusiasts. We
                  offer world-class tournament structures, a top-notch
                  restaurant, premium gaming tables, and an elegant atmosphere
                  to provide an unparalleled experience for all players. Our
                  goal is to bring the intellectual game of poker closer to
                  players in Vietnam and create a platform for international
                  players.
                </p>
                <p className="text-justify leading-normal text-gray-700 mt-4">
                  With our Slogan 'Nothing is impossible', we are committed to
                  pushing the boundaries of poker entertainment. Our mission is
                  to deliver unprecedented experiences that align with global
                  trends.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-3/4">
              <div className="bg-white p-4 shadow-lg">
                <img
                  src="/img/TRED-1.jpg"
                  alt="Poker event at Da Nang"
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-white p-4 shadow-lg transform md:translate-y-10">
                <img
                  src="/img/TRED-2.jpg"
                  alt="Poker players at a table"
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-white p-4 shadow-lg">
                <img
                  src="/img/TRED-3.jpg"
                  alt="Dream Poker logo with a person"
                  className="w-full h-auto"
                />
                <p className="text-center font-bold mt-2">
                  You have the power to determine your income
                </p>
              </div>
              <div className="bg-white p-4 shadow-lg transform md:translate-y-10">
                <img
                  src="/img/TRED-4.jpg"
                  alt="Poker tables in a room"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="hidden md:block md:w-3/4 w-full md:pl-24 mt-5">
              <div className="flex flex-col justify-center items-center container">
                <h1 className="text-3xl md:text-4xl font-bold text-left w-full">
                  VISION
                </h1>
                <h2 className="text-xl font-bold text-center mt-1">&</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-right w-full">
                  MISSION
                </h3>
              </div>
              <div className="mt-4">
                <p className="text-justify leading-normal text-gray-700">
                  Dream Poker Da Nang Club aims to create a healthy and
                  professional playing environment for all poker enthusiasts. We
                  offer world-class tournament structures, a top-notch
                  restaurant, premium gaming tables, and an elegant atmosphere
                  to provide an unparalleled experience for all players. Our
                  goal is to bring the intellectual game of poker closer to
                  players in Vietnam and create a platform for international
                  players.
                </p>
                <p className="text-justify leading-normal text-gray-700 mt-4">
                  With our Slogan 'Nothing is impossible', we are committed to
                  pushing the boundaries of poker entertainment. Our mission is
                  to deliver unprecedented experiences that align with global
                  trends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="section"
        className="max-w-7xl mx-auto my-10 p-6 bg-white rounded-lg shadow-2xl"
      >
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex flex-col md:flex-row items-start">
            <div className="md:w-2/3">
              <h1>
                <span className="text-4xl font-bold text-blue-800 block">
                  HUMAN
                </span>
                <span className="text-5xl font-bold text-blue-600 block ml-24">
                  POLICY
                </span>
              </h1>
              <div className="flex items-center mt-4">
                <div className="flex-shrink-0">
                  <div className="border border-gray rounded-full p-1">
                    <div className="w-12 h-12 bg-yellow text-white flex items-center justify-center rounded-full text-xl font-bold">
                      01
                    </div>
                  </div>
                </div>
                <h3 className="ml-4 text-2xl font-bold">
                  TRAINING AND DEVELOPMENT
                </h3>
              </div>
              <p className="mt-4 text-gray text-justify">
                To help employees continuously develop themselves and maximize
                their potential, Dream Poker Da Nang Club always prioritizes
                training and professional development.
              </p>
              <p className="mt-2 text-gray text-justify">
                Nhằm giúp các nhân sự ngày càng phát triển bản thân, phát huy
                tối đa các tiềm năng của bản thân. Công ty luôn chú trọng đến
                vấn đề đào tạo và nâng cao nghiệp vụ cho nhân sự.
              </p>
            </div>
            <div className="md:w-1/3 mt-12 md:mt-0 md:ml-6 flex-shrink-0 relative">
              <img
                src="/img/TRED-4.jpg"
                alt="People playing poker at a table"
                className="rounded-lg shadow-lg transform translate-x-5 -translate-y-8"
              />
              <img
                src="/img/TRED-5.jpg"
                alt="Poker table with cards and chips"
                className="absolute top-0 right-0 transform -translate-x-1 -translate-y-2 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 bg-darkblue text-white p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div className="w-full md:w-auto mr-4 mb-4 md:mb-0">
              <img
                src="/img/TRED-3.jpg"
                alt="Working environment at Dream Poker Da Nang"
                className="rounded-lg shadow-lg w-full md:w-96"
              />
            </div>
            <div className="border border-white rounded-full p-1 mt-4 md:mt-10 ml-0 md:ml-5">
              <div className="w-12 h-12 bg-yellow text-white flex items-center justify-center rounded-full text-xl font-bold">
                02
              </div>
            </div>
            <div className="ml-0 md:ml-4 flex-grow mt-4 md:mt-10">
              <h2 className="text-xl font-bold">Working environment</h2>
              <ul className="mt-2 space-y-2">
                <li>
                  <CheckCircleOutlined className="text-yellow mr-2" />
                  Collaboration - Innovation - Youthful energy - Dynamism
                </li>
                <li className="ml-6">
                  Chia sẻ - Hợp tác - Trẻ trung - Năng động
                </li>
                <li>
                  <CheckCircleOutlined className="text-yellow mr-2" />
                  High potential for career growth
                </li>
                <li className="ml-6">Cơ hội thăng tiến cao trong công việc</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-darkblue text-white p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-start">
            <div className="flex-shrink-0 flex justify-start w-full md:w-auto mb-4 md:mb-0">
              <div className="border border-white rounded-full p-1">
                <div className="w-12 h-12 bg-yellow text-white flex items-center justify-center rounded-full text-xl font-bold">
                  03
                </div>
              </div>
            </div>
            <div className="ml-0 md:ml-4 flex-grow">
              <h2 className="text-xl font-bold">BENEFITS</h2>
              <ul className="mt-2 space-y-2 text-justify">
                <div className="flex">
                  <CheckCircleOutlined className="text-yellow mr-2" />
                  <li>Excellent career advancement opportunities</li>
                </div>
                <li className="ml-6">Cơ hội thăng tiến cao trong công việc</li>
                <div className="flex">
                  <CheckCircleOutlined className="text-yellow mr-2 mb-5" />
                  <li>
                    Employees are eligible for salary increases based on their
                    performance and the company's performance.
                  </li>
                </div>
                <li className="ml-6">
                  Chế độ nâng lương: được xem xét và thỏa thuận điểm đánh giá
                  nhân viên theo quy định của Công ty.
                </li>
                <div className="flex">
                  <CheckCircleOutlined className="text-yellow mr-2 mb-5" />
                  <li>
                    Employees are enrolled in social insurance, health
                    insurance, and unemployment insurance in accordance with the
                    Labor Code.
                  </li>
                </div>
                <li className="ml-6">
                  Tham gia BHXH, BHYT, BHTN theo Luật Lao động
                </li>
                <div className="flex">
                  <CheckCircleOutlined className="text-yellow mr-2" />
                  <li>
                    Attractive benefits package including performance-based
                    bonuses.
                  </li>
                </div>
                <li className="ml-6">
                  Các chế độ phúc lợi: Thưởng, các chế độ phúc lợi khác theo quy
                  định công ty
                </li>
              </ul>
            </div>
            <div className="w-full md:w-auto ml-0 md:ml-4 mt-4 md:mt-10">
              <img
                src="/img/TRED-6.jpg"
                alt="Benefits at Dream Poker Da Nang"
                className="rounded-lg shadow-lg w-full md:w-auto"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-blue-600">
            ĐẾN VỚI NHAU LÀ MỘT SỰ KHỞI ĐẦU
          </h2>
          <p className="mt-2 text-gray">
            LÀM VIỆC VỚI NHAU LÀ SỰ TIẾN BỘ. GIỮ ĐƯỢC CHÂN NHAU LÀ THÀNH CÔNG.
          </p>
          <p className="mt-2 text-gray">
            COLLABORATION IS THE FOUNDATION, TEAMWORK IS THE JOURNEY, AND
            SUSTAINED SUCCESS IS THE DESTINATION.
          </p>
        </div>
      </div>
      <div id="recruitment" className="container mx-auto p-4">
        <div className="overflow-hidden">
          <h1 className="text-2xl md:text-4xl mb-10 font-bold whitespace-nowrap animate-slide text-center">
            VỊ TRÍ ĐANG TUYỂN DỤNG
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <Carousel
              autoplay
              arrows
              prevArrow={<CustomArrow direction="prev" />}
              nextArrow={<CustomArrow direction="next" />}
              dots={false}
            >
              {Object.keys(jobDescriptions1).map((key) => (
                <div key={key} className="rounded-lg shadow-md">
                  <div className="relative flex justify-center items-center bg-gradient-to-b from-purple to-purplelight">
                    <span className="absolute left-0 ml-4 flex items-center text-red animate-blink-fast text-4xl">
                      🔥
                    </span>
                    <div className="flex flex-col items-center">
                      <h3 className="text-3xl font-bold text-white text-center">
                        {jobDescriptions1[key].title}
                      </h3>
                      <p className="text-2xl font-medium text-white">
                        {jobDescriptions1[key].titleVietnamese || "\u00A0"}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2 px-10">
                    <li>
                      <CheckCircleOutlined className="text-darkblue" /> Số
                      lượng:
                      <span className="ml-2">
                        {jobDescriptions1[key].quantity}
                      </span>
                    </li>
                    <li>
                      <CheckCircleOutlined className="text-darkblue" /> Địa điểm
                      làm việc:
                      <span className="ml-2">
                        {jobDescriptions1[key].location}
                      </span>
                    </li>
                    <li>
                      <CheckCircleOutlined className="text-darkblue" /> Hạn nộp
                      hồ sơ:
                      <span className="ml-2">
                        {Moment(jobDescriptions1[key].deadline).format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                    </li>
                  </ul>

                  <button
                    className="my-4 py-2 px-4 ml-10 rounded-full border"
                    onClick={() => handleJobClick(jobDescriptions1[key])}
                  >
                    Xem chi tiết
                  </button>
                </div>
              ))}
            </Carousel>
          </div>
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <Carousel
              autoplay
              arrows
              prevArrow={<CustomArrow direction="prev" />}
              nextArrow={<CustomArrow direction="next" />}
              dots={false}
            >
              {Object.keys(jobDescriptions2).map((key) => (
                <div key={key} className="rounded-lg shadow-md">
                  <div className="bg-gradient-to-b from-purple to-purplelight text-center">
                    <h3 className="text-3xl font-bold text-white">
                      {jobDescriptions2[key].title}
                    </h3>
                    <p className="text-2xl font-medium text-white">
                      {jobDescriptions2[key].titleVietnamese || "\u00A0"}
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2 px-10">
                    <li>
                      <CheckCircleOutlined className="text-darkblue" /> Số
                      lượng:
                      <span className="ml-2">
                        {jobDescriptions2[key].quantity}
                      </span>
                    </li>
                    <li>
                      <CheckCircleOutlined className="text-darkblue" /> Địa điểm
                      làm việc:
                      <span className="ml-2">
                        {jobDescriptions2[key].location}
                      </span>
                    </li>
                    <li>
                      <CheckCircleOutlined className="text-darkblue" /> Hạn nộp
                      hồ sơ:
                      <span className="ml-2">
                        {Moment(jobDescriptions2[key].deadline).format(
                          "DD/MM/YYYY"
                        )}
                      </span>
                    </li>
                  </ul>

                  <button
                    className="my-4 py-2 px-4 ml-10 rounded-full border"
                    onClick={() => handleJobClick(jobDescriptions2[key])}
                  >
                    Xem chi tiết
                  </button>
                </div>
              ))}
            </Carousel>
          </div>

          <div>
            <Modal
              title={null}
              open={isModalVisible}
              onOk={handleOk}
              onCancel={handleOk}
              footer={null}
              width={800}
              bodyStyle={{
                backgroundColor: "#5166c7",
                maxHeight: "600px",
                overflowY: "auto",
                borderRadius: "8px",
              }}
            >
              <div
                className="text-center text-white bg-yellow"
                style={{
                  width: "50%",
                  margin: "0 auto",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                  padding: "16px 0",
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="text-3xl">{selectedJob?.title}</div>
                  <div className="text-xl">{selectedJob?.titleVietnamese}</div>
                </div>
              </div>

              {selectedJob && (
                <div className="mt-4">
                  {selectedJob.summary && selectedJob.summary.length > 0 && (
                    <>
                      <h4 className="font-semibold">
                        <u className="text-yellow ml-5 text-xl">
                          Job Summary: Tóm tắt công việc
                        </u>
                      </h4>
                      <ul className="list-none pl-5 mt-2">
                        {selectedJob.summary.map((item, index) => (
                          <li
                            className="text-white text-justify mx-5 leading-relaxed"
                            key={index}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {selectedJob.responsibilities &&
                    selectedJob.responsibilities.length > 0 && (
                      <>
                        <h4 className="font-semibold">
                          <u className="text-yellow ml-5 text-xl">
                            Key Responsibilities: Trách nhiệm chính
                          </u>
                        </h4>
                        <ul className="list-none pl-5 mt-2">
                          {selectedJob.responsibilities.map((item, index) => (
                            <li
                              className="text-white text-justify mx-5 leading-relaxed"
                              key={index}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                </div>
              )}
            </Modal>
          </div>
        </div>

        <div className="flex justify-center mt-20 px-4">
          <div className="bg-darkblue w-full md:w-9/12 p-4 md:p-8 rounded-lg shadow-lg flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 rounded-lg transform -translate-y-10 md:-translate-y-20 bg-purple p-4 md:p-8">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-4 text-center">
                ỨNG TUYỂN ONLINE:
              </h2>
              <p className="text-white mb-4">
                Yêu cầu ứng viên điền đúng và đủ thông tin theo mẫu:
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Họ và tên"
                  className="w-full p-2 rounded"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="birthdate"
                  value={formData.birthdate}
                  placeholder="Ngày tháng năm sinh"
                  className="w-full p-2 rounded"
                  onFocus={(e) => (e.target.placeholder = "dd/mm/yyyy")}
                  onBlur={(e) => (e.target.placeholder = "Ngày tháng năm sinh")}
                  onChange={handleDateChange}
                  maxLength={10}
                  required
                />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  placeholder="Số điện thoại"
                  className="w-full p-2 rounded"
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                  className="w-full p-2 rounded"
                  onChange={handleChange}
                  required
                />
                <select
                  name="position"
                  value={formData.position}
                  className="w-full p-2 rounded"
                  onChange={handleChange}
                  required
                >
                  <option value="">Vị trí ứng tuyển</option>

                  {/* Hiển thị các vị trí từ jobDescriptions1 */}
                  {Object.values(jobDescriptions1).map((job, index) => (
                    <option key={`job1-${index}`} value={job.title}>
                      {job.title} - {job.titleVietnamese}
                    </option>
                  ))}

                  {/* Sử dụng Set để loại bỏ các vị trí trùng lặp */}
                  {Object.values(jobDescriptions2)
                    .filter(
                      (job) =>
                        !new Set(
                          Object.values(jobDescriptions1).map((j) => j.title)
                        ).has(job.title)
                    )
                    .map((job, index) => (
                      <option key={`job2-${index}`} value={job.title}>
                        {job.title} - {job.titleVietnamese}
                      </option>
                    ))}
                </select>

                <input
                  type="file"
                  name="cv"
                  accept=".pdf, .doc, .docx"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="w-full rounded bg-white p-2"
                  required
                />
                <button
                  type="submit"
                  className="w-full p-2 bg-yellow text-white"
                >
                  GỬI
                </button>
              </form>
              {showSuccessMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-4 rounded shadow-md text-center">
                    <p className="text-green-500 text-lg">
                      Email đã được gửi thành công!
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0 md:ml-5">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-yellow self-start">HƯỚNG DẪN</span>
                  <span className="text-white self-end">NỘP HỒ SƠ</span>
                </div>
              </h2>
              <p className="text-yellow mb-4">
                Ứng viên có thể chọn 01 trong 03 hình thức nộp đơn ứng tuyển
                sau:
              </p>
              <ul className="text-white space-y-2">
                <li>
                  <CheckCircleOutlined className="text-yellow mr-2" />
                  Nộp trực tiếp hồ sơ xin việc tại văn phòng công ty. Hồ sơ bao
                  gồm:
                </li>
                <li>
                  <CheckCircleOutlined className="text-yellow mr-2" />
                  Nộp CV ứng tuyển qua địa chỉ email:
                  hrbp.dreampokerdanang@gmail.com
                </li>
                <li>
                  <CheckCircleOutlined className="text-yellow mr-2" />
                  Điền vào mẫu ứng tuyển online đính kèm tại đây:
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Home);
