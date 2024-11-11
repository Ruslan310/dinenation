import React, {useState, useRef, useContext} from 'react';
import styles from './Avatar.module.css';
import ProfileSvg from "../svg/ProfileSvg";
import classNames from 'classnames';
import {colorTheme} from "../../utils/theme";
import axios from "axios";
import {Spin} from 'antd';
import {useTypedMutation} from "@dinenation-postgresql/graphql/urql";
import {MainContext} from "../../contexts/MainProvider";
import {useResize} from "../../hooks/useResize";
import {resizeImage} from "../../utils/handle";

interface Props {
  size?: number;
  image?: string | null | undefined;
  showFullName?: boolean;
  isEdit?: boolean;
  isActive?: boolean;
  click?: () => void;
  editIconColor?: string;
  classNamesContainer?: string;
  fullNameStyle?: string;
}

const Avatar = ({
                  size = 60,
                  showFullName,
                  fullNameStyle,
                  isEdit,
                  isActive,
                  click,
                  editIconColor = colorTheme.black,
                  classNamesContainer
                }: Props) => {
  const [uploading, setUploading] = useState(false);
  const {userData, setUserData} = useContext(MainContext);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fullName = `${userData?.first_name} ${userData?.last_name}`
  const {isScreenLg } = useResize();

  if (isScreenLg) {
    size = 36
  }

  const [_, updateUserImage] = useTypedMutation(
    (opts: {id: number, image: string}) => ({
      updateUserImage: {
        __args: opts,
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        address: true,
        phone: true,
        role: true,
        image: true,
        is_update: true,
        coupon: {
          id: true,
          title: true,
          address: true,
          check_order: true,
          hide_price: true,
          office: {
            id: true,
            title: true,
          },
          domain: {
            id: true,
            title: true,
          }
        },
      },
  }));
  const getInitials = (name: string) => {
    const words = name.split(' ');
    return words.map(word => word[0].toUpperCase()).join('');
  };

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const link = import.meta.env.VITE_GRAPHQL_URL.slice().slice(0, -8)
        const resizedFile = await resizeImage(file, 0.05);
        const {data} = await axios.post(`${link}/userImage`);
        const {url} = await fetch(data, {
          method: "PUT",
          headers: {
            "Content-Type": resizedFile.type
          },
          body: resizedFile
        })
        const imageUrl = url.split('?')[0]
        if (userData?.id) {
          const res = await updateUserImage({
            id: userData?.id,
            image: imageUrl
          });
          setUserData(res?.data?.updateUserImage);
        }
      } catch (error) {
        console.error('Error loading image:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className={`${styles.avatarContainer} ${classNamesContainer}`}>
      <div
        onClick={click}
        style={{ width: size, height: size }}
        className={classNames(styles.imageContainer, {
          [styles.activeAvatar]: isActive
        })}
      >
        {userData?.image
          ? <img src={userData.image} className={styles.avatar} alt="" />
          : <div className={styles.avatarImageInit}>
              <p>{getInitials(fullName)}</p>
            </div>
        }
      </div>
      {showFullName && <p className={`${styles.text} ${fullNameStyle}`}>{fullName}</p>}
      {isEdit &&
        <>
          {uploading ? (
            <Spin className={styles.editAvatar} style={{ width: size / 2.5, height: size / 2.5 }} />
          ) : (
            <ProfileSvg
              color={editIconColor}
              style={{ width: size / 2.5, height: size / 2.5, cursor: 'pointer' }}
              size={size / 4.3}
              className={styles.editAvatar}
              onClick={handleImageUpload}
            />
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{display: 'none'}}
            onChange={handleFileChange}
            disabled={uploading}
          />
        </>
      }
    </div>
  );
};

export default Avatar;
