import React, {useContext} from 'react';
import styles from "./Reviews.module.css";
import Navbar from "../../components/Navbar/Navbar";
import ContactUsSvg from "../../components/svg/ContactUsSvg";
import {Rate} from "antd";
import rateSvg from '../../assets/image/rateSvg.svg'
import {useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {MainContext} from "../../contexts/MainProvider";
import Loading from "../../components/Loader/Loading";
import dayjs from "dayjs";
import {dateFormat} from "../../utils/utils";

const Reviews = () => {
  const {userData} = useContext(MainContext);

  const [reviews] = useTypedQuery({
    query: {
      userReviews: {
        __args: {
          user_id: userData?.id || 0
        },
        id: true,
        review: true,
        rate: true,
        dish_name: true,
        date_created: true,
      },
    },
    requestPolicy: 'cache-and-network',
  });

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.infoContainer}>
        <div className={styles.titleContainer}>
          <ContactUsSvg color='#1C1C1C'/>
          <p>You've left {reviews?.data?.userReviews?.length || 0} comments</p>
        </div>
        {reviews.fetching ?
          <Loading/> :
          <div className={styles.commentsList}>
            {reviews.data?.userReviews.map(review => (
              <div key={review.id} className={styles.commentsContainer}>
                <p className={styles.commentsDate}>
                  {dayjs(review?.date_created).format(dateFormat.DATE)}
                </p>
                <div className={styles.commentsText}>
                  <div className={styles.headerContainer}>
                    <p>{review.dish_name}</p>
                    <Rate character={<img src={rateSvg} alt='review'/>} disabled count={review.rate}/>
                  </div>
                  <span>{review.review}</span>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default Reviews;
