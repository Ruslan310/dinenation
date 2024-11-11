import React from 'react';
import styles from './ProductImage.module.css';
import {Image} from 'antd'

interface Props {
  className?: string;
  image: string;
  placeholder: string;
}

const ProductImage = ({className, image, placeholder}: Props) => (
  <Image
    preview={false}
    src={image}
    loading="lazy"
    rootClassName={`${styles.imageWrapper} ${className}`}
    placeholder={placeholder &&
      <img src={placeholder} alt='placeholder' className={`${styles.imagePlaceholder} ${className}`}/>
    }
  />
)

export default ProductImage;
