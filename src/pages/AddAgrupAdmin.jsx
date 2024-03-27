import React, { useState } from 'react';
import f from './firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import '../App.css';

const bd = getFirestore(f);

const AddAgrupAdmin = () => {
  // Estados para los campos del nuevo club
  const [nuevoClubCorreo, setNuevoClubCorreo] = useState("");
  const [nuevoClubRedSocial, setNuevoClubRedSocial] = useState("");
  const [nuevoClubMision, setNuevoClubMision] = useState("");
  const [nuevoClubNombre, setNuevoClubNombre] = useState("");
  const [nuevoClubVision, setNuevoClubVision] = useState("");

  // Función para agregar un nuevo club
  const handleAgregarClub = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    try {
      const nuevoClubData = {
        correo: nuevoClubCorreo,
        red_social: nuevoClubRedSocial,
        mision: nuevoClubMision,
        nombre: nuevoClubNombre,
        vision: nuevoClubVision
      };
      await addDoc(collection(bd, 'agrupaciones'), nuevoClubData);
      console.log("Nueva agrupacion agregada a Firebase.");
      // Limpiar campos del formulario después de agregar el club
      setNuevoClubCorreo("");
      setNuevoClubRedSocial("");
      setNuevoClubMision("");
      setNuevoClubNombre("");
      setNuevoClubVision("");
    } catch (error) {
      console.error("Error al agregar una nueva agrupacion:", error);
    }
  };

  return (
    <div className='container'>
      {/* Formulario para agregar un nuevo club */}
      <form onSubmit={handleAgregarClub}>
        <input
          type="text"
          placeholder="Correo"
          value={nuevoClubCorreo}
          onChange={(e) => setNuevoClubCorreo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Red Social"
          value={nuevoClubRedSocial}
          onChange={(e) => setNuevoClubRedSocial(e.target.value)}
        />
        <textarea
          placeholder="Misión"
          value={nuevoClubMision}
          onChange={(e) => setNuevoClubMision(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={nuevoClubNombre}
          onChange={(e) => setNuevoClubNombre(e.target.value)}
        />
        <textarea
          placeholder="Visión"
          value={nuevoClubVision}
          onChange={(e) => setNuevoClubVision(e.target.value)}
        />
        <button type="submit">Agregar Agrupacion</button>
      </form>
    </div>
  );
};

export default AddAgrupAdmin;
