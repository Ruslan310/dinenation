import React from 'react';
import styles from './Avatar.module.css'
import testAvatar from "../../assets/image/avatarExampl.png";
import ProfileSvg from "../svg/ProfileSvg";
import classNames from 'classnames';
import AvatarSvg from "../svg/AvatarSvg";


interface Props {
  size?: number;
  image?: string;
  fullName?: string;
  isText?: boolean;
  isEdit?: boolean;
  isActive?: boolean;
  isActiveFn?: () => void;
  editIconColor?: string;
  classNamesContainer?: string;
}

const Avatar = ({
                  size = 60,
                  image,
                  fullName,
                  isText,
                  isEdit,
                  isActive,
                  isActiveFn,
                  editIconColor = "#0C0C0C",
                  classNamesContainer
}: Props) => {
  const getInitials = (name: string) => {
    const words = name.split(' ');
    return words.map(word => word[0].toUpperCase()).join('');;
  };

  return (
    <div className={classNames(classNamesContainer, styles.avatarContainer)} >
      <div
        onClick={isActiveFn}
        style={{width: size, height: size}}
        className={isActive
          ? classNames(styles.imageContainer, styles.activeAvatar)
          : styles.imageContainer}
      >
        {image
            ? <img src={image || testAvatar} className={styles.avatar} alt=""/>
            : fullName
              ? <div className={styles.avatarImageInit}>
                <p>{getInitials(fullName)}</p>
              </div>
              : <div className={styles.avatarImageInit}>
                  <AvatarSvg />
                </div>

        }
      </div>
      {fullName && isText && <p className={styles.text}>{fullName}</p>}
      {isEdit &&
        <ProfileSvg
          color={editIconColor}
          style={{width: size / 2, height: size / 2}}
          size={size / 4.3}
          className={styles.editAvatar}
        />
      }
    </div>
  );
};

export default Avatar;
