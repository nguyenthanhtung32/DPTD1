import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Login from "./login";

function Admin() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
      router.push("/recruitment");
    }
  }, [router]);

  return (
    <>
      {isLogin ? (
        <div className="flex justify-center mt-4">
          <Link href="/recruitment">
            <button className="mx-2 px-4 py-2 rounded bg-blue-500 text-white">
              Tuyển Dụng
            </button>
          </Link>
          <Link href="/hot">
            <button className="mx-2 px-4 py-2 rounded bg-blue-500 text-white">
              Tuyển Dụng Gấp
            </button>
          </Link>
        </div>
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
    </>
  );
}

export default Admin;
