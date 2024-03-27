/* eslint-disable no-unused-vars */
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import GroupCard from "../components/GroupCard";
import { useEffect, useState } from "react";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import styles from "../components/UserPage.module.css";
import { checkSubscription } from "../services/checkSubscription";

function UserPage() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupsCollection = collection(db, "agrupaciones");
        const groupsQuery = query(groupsCollection);
        const groupDataSnapshot = await getDocs(groupsQuery);
        const groupData = groupDataSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGroups(groupData);
      } catch (error) {
        console.error("Error al cargar los datos de agrupaciones:", error);
      }
    };

    fetchGroupData();
  }, []); // Se ejecuta solo una vez al montar el componente

  console.log(groups);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {groups.map((group) => (
          <div key={group.id} className={styles.card}>
            <GroupCard
              key={group.id}
              group={group}
              checkSubscription={checkSubscription}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default UserPage;
