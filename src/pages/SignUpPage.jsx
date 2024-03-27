import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { registerWithEmailAndPassword, signInWithGoogle } from "../../firebase/auth";
import { useState, useEffect } from "react";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import React from "react";

function SignUpPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        favoritegame: "",
        membresias: [],
    });

    const [availableGames, setAvailableGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            const db = getFirestore();
            const gamesRef = collection(db, "videojuegos");
            const querySnapshot = await getDocs(gamesRef);

            const gamesList = [];
            querySnapshot.forEach((doc) => {
                gamesList.push(doc.data().titulo);
            });

            setAvailableGames(gamesList);
        };

        fetchGames();
    }, []);

    const handleOnchange = (event) =>{
        setFormData((oldData) => ({
            ...oldData,
            [event.target.name]: event.target.value,
        }));
    };

    const onSuccess = () => {
        navigate("/user");
    };

    const onFail = (_error) => {
        console.log("REGISTER FAILED, Try Again");
    };

    const handleGoogleClick = async () => {
        await signInWithGoogle({
            onSuccess: () => navigate("/landing"),
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        if (availableGames.includes(formData.favoritegame)) {
            await registerWithEmailAndPassword({ userData: formData, onSuccess, onFail });
        } else {
            alert("El juego favorito no se encuentra en la base de datos. No se puede registrar.");
        }
    };

  // Contenido del componente de inicio de sesión
  return <div> Contenido del formulario de sign-up, etc.</div>;
}

export default SignUpPage;