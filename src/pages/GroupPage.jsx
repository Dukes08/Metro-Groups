/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
    getDocs,
    getDoc,
    query,
    collection,
    where,
    doc,
    updateDoc,
  } from "firebase/firestore";
import styles from "./GroupPage.module.css";
//import AppLayout from "../layout/AppLayout.jsx";
import { useParams } from "react-router-dom";
//import { useUser } from "../context/user";


export default function GroupPage() {

  
  const [groupData, setGroupData] = useState();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { id } = useParams();
  const groupId = id;
  const user = null;

  useEffect(() => {
    const fetchGroupData = async () => {
      const groupDocRef = doc(db, "agrupaciones", groupId);
      const groupDocSnapshot = await getDoc(groupDocRef);

      if (groupDocSnapshot.exists()) {
        const groupDataFromFirebase = groupDocSnapshot.data();
        setGroupData(groupDataFromFirebase);

        //Buscar las imágenes..
        //const imagesIds = groupDataFromFirebase.fotos || [];
        //seImageIds(videojuegoIds);

        //const imageUrl = ``;
        
        //Fondo
        //setBackgroundImage();

      } else {
        console.log("El club no existe en Firebase");
      }
    };

    //verficar subscripción
    const checkSubscription = async () => {
        if (user) {
          try {
            const userQuerySnapshot = await getDocs(
              query(collection(db, "users"), where("email", "==", user.email))
            );
  
            if (userQuerySnapshot.size > 0) {
              const userDocSnapshot = userQuerySnapshot.docs[0];
              const userMemberships = userDocSnapshot.data()?.memberships || [];
  
              const subscribed = userMemberships.includes(groupId);
              setIsSubscribed(subscribed);
            }
          } catch (error) {
            console.error(
              "Error al verificar la suscripción del usuario al club:",
              error
            );
          }
        }
    };
    
    if (groupId) {
      fetchGroupData();
      checkSubscription();
    }
  }, [groupId, user]);

  //manejar subscripción
  const handleSubscribe = async () => {
    if (user) {
      try {
        const userQuerySnapshot = await getDocs(
          query(collection(db, "users"), where("email", "==", user.email))
        );

        if (userQuerySnapshot.size > 0) {
          const userDocSnapshot = userQuerySnapshot.docs[0];
          const userDocRef = doc(db, "users", userDocSnapshot.id);

          const userMemberships = userDocSnapshot.data()?.memberships || [];

          if (isSubscribed) {
            // Usuario está suscrito, proceder con cancelar suscripción
            const shouldUnsubscribe = window.confirm(
              "¿Estás seguro que deseas cancelar la suscripción a este club?"
            );

            if (shouldUnsubscribe) {
              const updatedMemberships = userMemberships.filter(
                (id) => id !== groupId
              );

              await updateDoc(userDocRef, { memberships: updatedMemberships });

              console.log(`Usuario canceló la suscripción a la agrupación ${groupId}`);
              setIsSubscribed(false);
            }
          } else {
            // Usuario no está suscrito, proceder con suscripción
            const shouldSubscribe = window.confirm(
              "¿Estás seguro que deseas unirte a esta agrupación?"
            );

            if (shouldSubscribe) {
              const updatedMemberships = [...userMemberships, groupId];

              await updateDoc(userDocRef, { memberships: updatedMemberships });

              console.log(`Usuario se unió a la agrupación ${groupId}`);
              setIsSubscribed(true);
            }
          }
        } else {
          console.error(
            "No se encontró un documento del usuario con ese correo electrónico"
          );
        }
      } catch (error) {
        console.error("Error al manejar la suscripción a la agrupación:", error);
      }
    }
  };

  //Función que maneja las calificaciones y reseñas
  const handleFeedback = async () => {
    console.log("enviar reseña")
  };

  //Función que maneja las donaciones
  const handleDonation = async () => {
    console.log("enviar a vista de donación")
  };

  return (
    <><div className={styles.container}>

          {groupData ? (
              <div className={styles.groupContainer}>
                  <div className={styles.text}>{groupData.nombre}</div>
                  {groupData.mision && (
                    <>
                        <div className={styles.subtitle}>Misión</div>
                        <p>{groupData.mision}</p>
                    </>
                )}
                {groupData.vision && (
                    <>
                        <div className={styles.subtitle}>Visión</div>
                        <p>{groupData.vision}</p>
                    </>
                )}
                {groupData.contacto && (
                    <>
                        <div className={styles.subtitle}>Contacto</div>
                        <div className={styles.cardContact}>
                            <p>
                                Correo:{" "}
                                <a href={`mailto:${groupData.contacto.Correo}`}>
                                    {groupData.contacto.Correo}
                                </a>
                            </p>
                        </div>
                        <div className={styles.cardContact}>
                            <p>
                                Red Social:{" "}
                                <a href={`https://www.instagram.com/${groupData.contacto["Red Social"].slice(1)}`}>
                                    {"@"}
                                    {groupData.contacto["Red Social"].slice(1)}
                                </a>
                            </p>
                        </div>
                    </>
                )}
                  {/* <div className={styles.imagesContainer}>
                      {imagesDetails.map((gameDetail) => (
                          <div key={gameDetail.id} className={styles.gameCard}>
                              <img
                                  src={juegos[gameDetail.id]}
                                  alt={`Game ${gameDetail.id}`}
                                  className={styles.gameImage} />
                              <h2>{gameDetail.name}</h2>
                              <p>{gameDetail.description}</p>
                          </div>
                      ))}
                  </div> */}
                <button
                    className={styles.subscribeButton}
                    style={{ backgroundColor: isSubscribed ? "#e74c3c" : "#2ecc71" }}
                    onClick={handleSubscribe}
                >
                    {isSubscribed ? "Cancelar suscripción" : "Suscribirse"}
                </button>

                {isSubscribed && (
                    <button className={styles.donateButton} onClick={handleDonation}>Donar a la Agrupación</button>
                )}
                <div className={styles.ratingsSection}>
                    <div className={styles.subtitle}>Calificaciones y Reseñas</div>
                    {/* Mostrar las reseñas existentes para todos los usuarios */}


                    {/* Lógica para habilitar la opción de escribir una reseña si el usuario está suscrito */}
                    {isSubscribed && ( 
                        <><textarea className={styles.reviewTextarea} placeholder="Escribe tu reseña aquí"></textarea>
                        <button className={styles.submitReviewButton} onClick={handleFeedback}>Enviar</button></>
                    )}
                </div>
                
            </div>
        ) : (
            <p>Cargando datos de la agrupación...</p>
        )}

      </div></>
  )
}
