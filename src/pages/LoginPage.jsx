import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginWithEmailAndPassword, signInWithGoogle } from "../../firebase/auth";
import React from "react";

function LoginPage() {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const onSuccess = () => {
        navigate("/landing");
    };

    const onFail = (_error) => {
        console.log("LOGIN FAILED, Try Again");
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        await loginWithEmailAndPassword({ userData: formData, onSuccess, onFail });
    };

    const onChange = (event) => {
        setFormData((oldData) => ({
            ...oldData,
            [event.target.name]: event.target.value,
        }));
    };

    const handleGoogleClick = async () => {
        await signInWithGoogle({
            onSuccess: () => navigate("/landing"),
        });
    };

    return(
      <div></div>
    )
}

export default LoginPage;
