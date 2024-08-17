import React from 'react';
import styles from "./Reviews.module.css";
import Navbar from "../../components/Navbar/Navbar";
import ContactUsSvg from "../../components/svg/ContactUsSvg";

const Reviews = () => {
  const comments = [
    {
      date: '02.04.2024',
      dishName: 'Mussel and Prawns Curry Ragout',
      comment: "Quasi quo sit suscipit tempora aperiam rerum placeat id. Voluptatem praesentium excepturi id. Repudiandae incidunt doloremque. Error est et ullam.",
    },
    {
      date: '05.04.2024',
      dishName: 'Pelmeni Potato & Mushrooms',
      comment: "Quasi quo sit suscipit tempora aperiam rerum placeat id. Voluptatem praesentium excepturi id. Repudiandae incidunt doloremque. Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy  text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It has survived not  only five centuries, but also the leap into electronic typesetting,  remaining essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum passages, and more  recently with desktop publishing software like Aldus PageMaker  including versions of Lorem Ipsum.",
    },
    {
      date: '14.05.2024',
      dishName: 'Pelmeni Chicken',
      comment: "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy  text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It has survived not  only five centuries, but also the leap into electronic typesetting,  remaining essentially unchanged. It was popularised in the 1960s with  the release of Letraset sheets containing Lorem Ipsum passages, and more  recently with desktop publishing software like Aldus PageMaker  including versions of Lorem Ipsum.",
    },
    {
      date: '18.06.2024',
      dishName: 'Mexican Chilli Beans',
      comment: "Quasi quo sit suscipit tempora aperiam rerum placeat id. Voluptatem praesentium excepturi id. Repudiandae incidunt doloremque. Error est et ullam.",
    },
    {
      date: '23.02.2024',
      dishName: 'Greek Salad',
      comment: "Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy  text ever since the 1500s, when an unknown printer took a galley of  type and scrambled it to make a type specimen book. It has survived not  only five centuries, but also the leap into electronic typesetting,  remaining essentially unchanged. It was popularised in the 1960s with  the release of ",
    },
  ]

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <ContactUsSvg color='#1C1C1C'/>
          <p>You've left {comments.length} comments</p>
        </div>
        {comments && comments.map(comment => (
          <div className={styles.commentsContainer}>
            <p className={styles.commentsDate}>{comment.date}</p>
            <div className={styles.commentsText}>
              <p>{comment.dishName}</p>
              <span>{comment.comment}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
