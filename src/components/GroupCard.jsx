/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import styles from "./GroupCard.module.css";

export default function GroupCard({ group, checkSubscription, user }) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const redSocial = group.contacto["Red Social"].slice(1);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (user) {
        const subscribed = await checkSubscription(user, group.id);
        setIsSubscribed(subscribed);
      }
    };

    fetchSubscriptionStatus();
  }, [checkSubscription, user, group.id]);

  const handleDetails = () => {
    navigate(`/agrupacion/${group.id}`);
    console.log(group.id);
  };

  return (
    <Card className={styles.cardContainer}>
      <CardContent>
        <div className={styles.cardTitle}>{group.nombre}</div>
        <h3>Contacto</h3>
        <div className={styles.cardContact}>
          <p>
            Correo:{" "}
            <a href={`mailto:${group.contacto.Correo}`}>
              {group.contacto.Correo}
            </a>
          </p>
        </div>
        <div className={styles.cardContact}>
          <p>
            Red Social:{" "}
            <a href={`https://www.instagram.com/${redSocial}`}>
              {"@"}
              {redSocial}
            </a>
          </p>
        </div>
        <div className={styles.cardSubscription}>
          {isSubscribed ? "Suscrito" : "No suscrito"}
        </div>
        <button className={styles.buttonGroup} onClick={handleDetails}>
          Ver agrupación estudiantil
        </button>
      </CardContent>
    </Card>
  );
}
