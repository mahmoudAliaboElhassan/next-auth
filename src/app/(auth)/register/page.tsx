import Link from "next/link";
import React from "react";
import RegisterForm from "./RegisterForm";

function Register() {
  return (
    <div>
      <section className="w-2/5">
        <div className="bg-white shadow-md rounded-md p-5">
          <RegisterForm />
          <p>
            have an account? <Link href="login">login</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
export default Register;
