import React, {CSSProperties} from 'react';
import {colorTheme} from "../../utils/theme";

const ADDRESS = 'ADDRESS';
const PHONE = 'PHONE';
const EMAIL = 'EMAIL';
const SOCIAL = 'SOCIAL';
const CONTACT = 'CONTACT';
const FACEBOOK = 'FACEBOOK';
const INSTAGRAM = 'INSTAGRAM';

interface Props {
  type: string;
  color?: string;
  className?: string;
  style?: CSSProperties;
}
const ContactSvg = ({color = '#1C1C1C', type, className, style}: Props) => {
  switch (type) {
    case ADDRESS:
      return (
        <svg className={className} width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.74731 6.42896C11.6227 4.55359 14.1661 3.5 16.8184 3.5C19.4706 3.5 22.014 4.55359 23.8894 6.42896C25.7648 8.30432 26.8184 10.8478 26.8184 13.5C26.8184 22.5 16.8184 29.5 16.8184 29.5C16.8184 29.5 6.81836 22.5 6.81836 13.5C6.81836 10.8478 7.87195 8.30432 9.74731 6.42896ZM14.5961 16.8259C15.2539 17.2654 16.0272 17.5 16.8184 17.5C17.8793 17.5 18.8966 17.0786 19.6467 16.3284C20.397 15.5782 20.8184 14.5609 20.8184 13.5C20.8184 12.7089 20.5837 11.9355 20.1443 11.2777C19.7047 10.6199 19.08 10.1072 18.3491 9.80444C17.6182 9.50171 16.814 9.42249 16.038 9.5769C15.2621 9.7312 14.5493 10.1122 13.99 10.6716C13.4305 11.231 13.0496 11.9437 12.8953 12.7196C12.7408 13.4956 12.8201 14.2998 13.1228 15.0308C13.4255 15.7616 13.9382 16.3864 14.5961 16.8259Z"
            fill={colorTheme.navbar}
          />
          <path
            d="M7.81836 30.5H25.8184C26.3706 30.5 26.8184 30.0523 26.8184 29.5C26.8184 28.9477 26.3706 28.5 25.8184 28.5H7.81836C7.26607 28.5 6.81836 28.9477 6.81836 29.5C6.81836 30.0523 7.26607 30.5 7.81836 30.5Z"
            fill={color}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.8184 8.5C16.8184 8.5 18.8894 8.5 20.3539 9.96447C20.3539 9.96447 21.8184 11.4289 21.8184 13.5C21.8184 13.5 21.8184 15.5711 20.3539 17.0355C20.3539 17.0355 18.8894 18.5 16.8184 18.5C16.8184 18.5 14.7473 18.5 13.2828 17.0355C13.2828 17.0355 11.8184 15.5711 11.8184 13.5C11.8184 13.5 11.8184 11.4289 13.2828 9.96447C13.2828 9.96447 14.7473 8.5 16.8184 8.5ZM16.8184 10.5C16.8184 10.5 15.5757 10.5 14.697 11.3787C14.697 11.3787 13.8184 12.2574 13.8184 13.5C13.8184 13.5 13.8184 14.7426 14.697 15.6213C14.697 15.6213 15.5757 16.5 16.8184 16.5C16.8184 16.5 18.061 16.5 18.9397 15.6213C18.9397 15.6213 19.8184 14.7426 19.8184 13.5C19.8184 13.5 19.8184 12.2574 18.9397 11.3787C18.9397 11.3787 18.061 10.5 16.8184 10.5Z"
            fill={color}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.981 9.29048C26.981 9.29048 27.8184 11.312 27.8184 13.5C27.8184 13.5 27.8184 19.499 22.573 25.5312C22.573 25.5312 20.961 27.385 19.0285 29.0276C19.0285 29.0276 18.0553 29.8548 17.3918 30.3192C17.0475 30.5603 16.5892 30.5603 16.2449 30.3192C16.2449 30.3192 15.5815 29.8548 14.6082 29.0276C14.6082 29.0276 12.6757 27.385 11.0638 25.5312C11.0638 25.5312 5.81836 19.499 5.81836 13.5C5.81836 13.5 5.81836 11.312 6.65568 9.29048C6.65568 9.29048 7.49301 7.269 9.04018 5.72183C9.04018 5.72183 10.5874 4.17465 12.6088 3.33733C12.6088 3.33733 14.6303 2.5 16.8184 2.5C16.8184 2.5 19.0064 2.5 21.0279 3.33733C21.0279 3.33733 23.0494 4.17465 24.5965 5.72182C24.5965 5.72182 26.1437 7.269 26.981 9.29048ZM25.8184 13.5C25.8184 13.5 25.8184 11.7098 25.1333 10.0558C25.1333 10.0558 24.4482 8.40191 23.1823 7.13604C23.1823 7.13604 21.9165 5.87017 20.2625 5.18508C20.2625 5.18508 18.6086 4.5 16.8184 4.5C16.8184 4.5 15.0281 4.5 13.3742 5.18508C13.3742 5.18508 11.7203 5.87017 10.4544 7.13604C10.4544 7.13604 9.18853 8.40191 8.50344 10.0558C8.50344 10.0558 7.81836 11.7098 7.81836 13.5C7.81836 13.5 7.81836 18.751 12.573 24.2188C12.573 24.2188 14.086 25.9588 15.9035 27.5037C15.9035 27.5037 16.4108 27.9349 16.8184 28.2535C16.8184 28.2535 17.2259 27.9349 17.7332 27.5037C17.7332 27.5037 19.5508 25.9588 21.0638 24.2188C21.0638 24.2188 25.8184 18.751 25.8184 13.5Z"
            fill={color}
          />
        </svg>
      );
    case PHONE:
      return (
        <svg className={className} width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M24.8184 5.5V27.5C24.8184 28.6046 23.9229 29.5 22.8184 29.5H10.8184C9.71387 29.5 8.81836 28.6046 8.81836 27.5L8.81836 5.5C8.81836 4.39539 9.71387 3.5 10.8184 3.5L22.8184 3.5C23.9229 3.5 24.8184 4.39539 24.8184 5.5Z"
            fill={colorTheme.navbar}/>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.8184 2.5C22.8184 2.5 24.061 2.5 24.9397 3.37868C24.9397 3.37868 25.8184 4.25736 25.8184 5.5V27.5C25.8184 27.5 25.8184 28.7426 24.9397 29.6213C24.9397 29.6213 24.061 30.5 22.8184 30.5H10.8184C10.8184 30.5 9.57572 30.5 8.69704 29.6213C8.69704 29.6213 7.81836 28.7426 7.81836 27.5V5.5C7.81836 5.5 7.81836 4.25736 8.69704 3.37868C8.69704 3.37868 9.57572 2.5 10.8184 2.5L22.8184 2.5ZM22.8184 4.5L10.8184 4.5C10.8184 4.5 10.4041 4.5 10.1113 4.79289C10.1113 4.79289 9.81836 5.08579 9.81836 5.5L9.81836 27.5C9.81836 27.5 9.81836 27.9142 10.1113 28.2071C10.1113 28.2071 10.4041 28.5 10.8184 28.5H22.8184C22.8184 28.5 23.2326 28.5 23.5255 28.2071C23.5255 28.2071 23.8184 27.9142 23.8184 27.5L23.8184 5.5C23.8184 5.5 23.8184 5.08579 23.5255 4.79289C23.5255 4.79289 23.2326 4.5 22.8184 4.5Z"
            fill={color}
          />
          <path
            d="M18.3184 8C18.3184 8.82837 17.6467 9.5 16.8184 9.5C15.99 9.5 15.3184 8.82837 15.3184 8C15.3184 7.17163 15.99 6.5 16.8184 6.5C17.6467 6.5 18.3184 7.17163 18.3184 8Z"
            fill={color}
          />
        </svg>
      );
    case EMAIL:
      return (
        <svg className={className} width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M28.8184 16.5C28.8184 23.1274 23.4458 28.5 16.8184 28.5C10.1909 28.5 4.81836 23.1274 4.81836 16.5C4.81836 9.87259 10.1909 4.5 16.8184 4.5C23.4458 4.5 28.8184 9.87259 28.8184 16.5Z"
            fill={colorTheme.navbar}/>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.8184 10.5C16.8184 10.5 19.3036 10.5 21.061 12.2574C21.061 12.2574 22.8184 14.0147 22.8184 16.5C22.8184 16.5 22.8184 18.9853 21.061 20.7426C21.061 20.7426 19.3036 22.5 16.8184 22.5C16.8184 22.5 14.3331 22.5 12.5757 20.7426C12.5757 20.7426 10.8184 18.9853 10.8184 16.5C10.8184 16.5 10.8184 14.0147 12.5757 12.2574C12.5757 12.2574 14.3331 10.5 16.8184 10.5ZM16.8184 12.5C16.8184 12.5 15.1615 12.5 13.9899 13.6716C13.9899 13.6716 12.8184 14.8431 12.8184 16.5C12.8184 16.5 12.8184 18.1569 13.9899 19.3284C13.9899 19.3284 15.1615 20.5 16.8184 20.5C16.8184 20.5 18.4752 20.5 19.6468 19.3284C19.6468 19.3284 20.8184 18.1569 20.8184 16.5C20.8184 16.5 20.8184 14.8431 19.6468 13.6716C19.6468 13.6716 18.4752 12.5 16.8184 12.5Z"
            fill={color}
          />
          <path
            d="M22.8186 16.5003V11.5003C22.8186 10.948 22.3708 10.5003 21.8186 10.5003C21.2663 10.5003 20.8186 10.948 20.8186 11.5003V16.5003C20.8186 19.015 21.7818 20.5642 21.7818 20.5642C22.9856 22.5003 25.3186 22.5003 25.3186 22.5003C27.6515 22.5003 28.8553 20.5642 28.8553 20.5642C29.8186 19.015 29.8186 16.5003 29.8186 16.5003C29.8175 12.0306 27.0684 8.50673 27.0684 8.50673C24.3192 4.98284 19.9843 3.89445 19.9843 3.89445C15.6495 2.80605 11.5618 4.61334 11.5618 4.61334C7.47407 6.42062 5.36188 10.3594 5.36188 10.3594C3.24969 14.2983 4.00609 18.7032 4.00609 18.7032C4.76249 23.1081 8.06766 26.1167 8.06766 26.1167C11.3728 29.1253 15.8293 29.4654 15.8293 29.4654C20.2852 29.8055 24.0084 27.3339 24.0084 27.3339L24.0092 27.3334C24.2883 27.1481 24.4561 26.8353 24.4561 26.5003L24.456 26.4932C24.4547 26.2988 24.3967 26.1091 24.2892 25.9471C24.1039 25.668 23.7911 25.5003 23.4561 25.5003L23.449 25.5003C23.2546 25.5017 23.0649 25.5597 22.9029 25.6672C19.7523 27.759 15.9815 27.4712 15.9815 27.4712C12.2106 27.1834 9.41395 24.6377 9.41395 24.6377C6.61727 22.092 5.97724 18.3647 5.97724 18.3647C5.33721 14.6375 7.12445 11.3046 7.12445 11.3046C8.91169 7.97177 12.3705 6.44253 12.3705 6.44253C15.8293 4.91329 19.4973 5.83424 19.4973 5.83424C23.1653 6.75519 25.4915 9.73694 25.4915 9.73694C27.8177 12.7187 27.8186 16.5003 27.8186 16.5003C27.8186 18.4439 27.1568 19.5082 27.1568 19.5082C26.54 20.5003 25.3186 20.5003 25.3186 20.5003C24.0971 20.5003 23.4803 19.5082 23.4803 19.5082C22.8186 18.4439 22.8186 16.5003 22.8186 16.5003Z"
            fill={color}
          />
        </svg>
      );
    case SOCIAL:
      return (
        <svg className={className} width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.8184 20.5H24.8184C26.1445 20.5 27.4162 19.9732 28.3539 19.0355C29.2916 18.0978 29.8184 16.8261 29.8184 15.5C29.8184 14.1739 29.2916 12.9022 28.3539 11.9645C27.4162 11.0268 26.1445 10.5 24.8184 10.5H19.8184V20.5Z"
            fill="black"
            fillOpacity="0.1"
          />
          <path
            d="M25.7886 20.7423L25.7888 20.7417C25.8085 20.6626 25.8184 20.5815 25.8184 20.5C25.8184 20.4836 25.818 20.4672 25.8172 20.4508C25.8091 20.2861 25.7604 20.126 25.6754 19.9847C25.5388 19.7574 25.3174 19.5937 25.0601 19.5296C24.981 19.51 24.8999 19.5 24.8184 19.5C24.8069 19.5 24.7953 19.5002 24.7837 19.5006C24.3377 19.5161 23.9559 19.8252 23.848 20.2583L23.8479 20.259L22.1987 26.8808L20.8214 25.9668C20.8195 25.9656 20.8184 25.965 20.8184 25.965L20.8184 10.5C20.8184 9.94772 20.3707 9.5 19.8184 9.5C19.2661 9.5 18.8184 9.94772 18.8184 10.5L18.8184 25.9533C18.8138 26.4632 19.0551 26.9123 19.0551 26.9123C19.2964 27.3614 19.7155 27.6332 19.7155 27.6332L21.0881 28.5442C21.4936 28.8149 21.9782 28.8686 21.9782 28.8686C22.4627 28.9224 22.9177 28.7471 22.9177 28.7471C23.3726 28.5719 23.6958 28.2069 23.6958 28.2069C24.0191 27.8419 24.1388 27.3667 24.1388 27.3667L25.7886 20.7423Z"
            fill={color}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.8184 21.4998C19.8184 21.4998 19.4502 21.4998 18.7665 21.5789C18.7665 21.5789 17.3593 21.7417 15.8558 22.1507C15.8558 22.1507 11.0237 23.465 7.09339 26.7577C7.09339 26.7577 6.64736 27.1268 6.07313 27.2006C6.07313 27.2006 5.49891 27.2743 4.97407 27.03C4.97407 27.03 4.44924 26.7856 4.13611 26.2986C4.13611 26.2986 3.82298 25.8117 3.81836 25.2248L3.81839 5.76688C3.81839 5.76688 3.82298 5.18796 4.13611 4.701C4.13611 4.701 4.44924 4.21405 4.97407 3.96966C4.97407 3.96966 5.49891 3.72527 6.07313 3.79903C6.07313 3.79903 6.64736 3.87279 7.09806 4.24577C7.09806 4.24577 11.0237 7.53461 15.8558 8.84893C15.8558 8.84893 17.3593 9.25787 18.7665 9.42069C18.7665 9.42069 19.4502 9.49981 19.8184 9.49981H24.8184C24.8184 9.49981 27.3036 9.49981 29.061 11.2572C29.061 11.2572 30.8184 13.0145 30.8184 15.4998C30.8184 15.4998 30.8184 17.9851 29.061 19.7424C29.061 19.7424 27.3036 21.4998 24.8184 21.4998H19.8184ZM19.8184 19.4998H24.8184C24.8184 19.4998 26.4752 19.4998 27.6468 18.3282C27.6468 18.3282 28.8184 17.1567 28.8184 15.4998C28.8184 15.4998 28.8184 13.843 27.6468 12.6714C27.6468 12.6714 26.4752 11.4998 24.8184 11.4998H19.8184C19.8184 11.4998 17.9817 11.4998 15.3309 10.7788C15.3309 10.7788 10.0784 9.35016 5.81833 5.78275L5.81836 25.2169C5.81836 25.2169 10.0755 21.6502 15.3309 20.2208C15.3309 20.2208 17.9817 19.4998 19.8184 19.4998Z"
            fill={color}
          />
        </svg>
      );
    case CONTACT:
      return (
        <svg className={className} width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.3311 22.4877C12.7716 23.7438 13.4857 24.8863 14.4216 25.8327C15.3576 26.7792 16.4921 27.5059 17.7432 27.9604C18.9943 28.4149 20.3307 28.5858 21.6559 28.4608C22.9811 28.3359 24.262 27.9181 25.4061 27.2377L28.5186 28.1252C28.6468 28.1613 28.7823 28.1625 28.9112 28.1288C29.0401 28.0951 29.1577 28.0277 29.2519 27.9335C29.3461 27.8393 29.4135 27.7217 29.4471 27.5929C29.4808 27.464 29.4796 27.3284 29.4435 27.2002L28.556 24.0877C29.3484 22.7577 29.7838 21.2456 29.8199 19.6979C29.8561 18.1502 29.4919 16.6194 28.7626 15.2539C28.0333 13.8883 26.9636 12.7343 25.6572 11.9036C24.3508 11.073 22.8521 10.5938 21.306 10.5127C21.6489 11.4713 21.8223 12.4822 21.8185 13.5002C21.8185 15.8871 20.8704 18.1763 19.1825 19.8642C17.4947 21.552 15.2055 22.5002 12.8185 22.5002L12.3311 22.4877Z"
            fill={colorTheme.navbar}/>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.23162 20.9258L4.00422 18.2162C4.00422 18.2162 2.32974 15.1253 2.9935 11.623C2.9935 11.623 3.69842 7.90353 6.68785 5.58087C6.68785 5.58087 9.67728 3.25821 13.4556 3.49441C13.4556 3.49441 17.2339 3.7306 19.9108 6.40749C19.9108 6.40749 22.5877 9.08438 22.8239 12.8627C22.8239 12.8627 23.0601 16.641 20.7374 19.6304C20.7374 19.6304 18.4148 22.6199 14.6953 23.3248C14.6953 23.3248 11.1929 23.9886 8.10207 22.3141L5.3925 23.0867C5.3925 23.0867 4.93198 23.2162 4.47274 23.0961C4.47274 23.0961 4.0135 22.9761 3.67786 22.6404C3.67786 22.6404 3.34221 22.3048 3.22217 21.8456C3.22217 21.8456 3.10214 21.3863 3.23061 20.9293L3.23162 20.9258ZM7.95657 20.2758L5.27896 21.0393L6.04245 18.3617C6.11785 18.0973 6.08105 17.8135 5.94071 17.5771C5.94071 17.5771 4.39442 14.9719 4.95852 11.9954C4.95852 11.9954 5.52264 9.01891 7.91493 7.1602C7.91493 7.1602 10.3072 5.30149 13.3308 5.49051C13.3308 5.49051 16.3544 5.67953 18.4966 7.8217C18.4966 7.8217 20.6388 9.96389 20.8278 12.9875C20.8278 12.9875 21.0168 16.0111 19.1581 18.4034C19.1581 18.4034 17.2994 20.7957 14.3229 21.3598C14.3229 21.3598 11.3463 21.9239 8.7412 20.3776C8.50477 20.2372 8.22098 20.2004 7.95657 20.2758Z"
            fill={color}
          />
          <path
            d="M26.1938 11.0598C23.9792 9.65165 21.3585 9.51407 21.3585 9.51407C21.341 9.51315 21.3235 9.5127 21.3061 9.5127C21.2625 9.5127 21.219 9.51554 21.1759 9.5212C20.6979 9.58395 20.3327 9.97883 20.3074 10.4603C20.3065 10.4777 20.3061 10.4952 20.3061 10.5127C20.3061 10.5562 20.3089 10.5997 20.3146 10.6429C20.3773 11.1209 20.7722 11.486 21.2536 11.5113C23.3496 11.6214 25.1207 12.7475 25.1207 12.7475C26.8918 13.8736 27.8805 15.725 27.8805 15.725C28.8693 17.5763 28.8202 19.6745 28.8202 19.6745C28.7711 21.7728 27.697 23.5759 27.697 23.5759C27.5559 23.8126 27.5188 24.097 27.5944 24.3619L28.3579 27.0395L25.6803 26.276C25.4252 26.2033 25.1517 26.2349 24.9199 26.3638L24.8949 26.3782L24.8932 26.3792C23.3497 27.2967 21.562 27.4653 21.562 27.4653C19.7733 27.634 18.0846 27.0205 18.0846 27.0205C16.396 26.407 15.1327 25.1296 15.1327 25.1296C13.8693 23.8521 13.2747 22.1567 13.2747 22.1567C13.1869 21.9065 13.0033 21.7013 12.7643 21.5864C12.6291 21.5214 12.481 21.4877 12.3311 21.4877L12.3119 21.4879C12.2056 21.4899 12.1004 21.5089 12.0001 21.5441C11.7498 21.6318 11.5447 21.8154 11.4298 22.0545C11.3648 22.1897 11.3311 22.3377 11.3311 22.4877L11.3312 22.5069C11.3333 22.6131 11.3522 22.7184 11.3874 22.8187C12.131 24.9386 13.7106 26.5359 13.7106 26.5359C15.2903 28.1332 17.4017 28.9003 17.4017 28.9003C19.5132 29.6674 21.7498 29.4564 21.7498 29.4564C23.7663 29.2663 25.5342 28.3141 25.5342 28.3141L28.2479 29.0879C28.7049 29.2163 29.1641 29.0963 29.1641 29.0963C29.6233 28.9763 29.959 28.6406 29.959 28.6406C30.2946 28.305 30.4147 27.8457 30.4147 27.8457C30.5347 27.3865 30.4052 26.926 30.4052 26.926L29.6326 24.2165C30.7635 22.1236 30.8197 19.7213 30.8197 19.7213C30.881 17.0977 29.6447 14.7828 29.6447 14.7828C28.4084 12.4679 26.1938 11.0598 26.1938 11.0598Z"
            fill={color}
          />
        </svg>
      );
    case FACEBOOK:
      return (
        <svg style={style} className={className} width="33" height="33" viewBox="0 0 33 33" fill={color} xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.8184 3.5C16.8184 3.5 19.4625 3.5 21.8789 4.52201C21.8789 4.52201 24.212 5.50884 26.0107 7.30761C26.0107 7.30761 27.8095 9.10638 28.7963 11.4395C28.7963 11.4395 29.8184 13.8558 29.8184 16.5C29.8184 16.5 29.8184 19.1442 28.7963 21.5605C28.7963 21.5605 27.8095 23.8936 26.0107 25.6924C26.0107 25.6924 24.212 27.4912 21.8789 28.478C21.8789 28.478 19.4625 29.5 16.8184 29.5C16.8184 29.5 14.1742 29.5 11.7579 28.478C11.7579 28.478 9.42474 27.4912 7.62597 25.6924C7.62597 25.6924 5.8272 23.8936 4.84037 21.5605C4.84037 21.5605 3.81836 19.1442 3.81836 16.5C3.81836 16.5 3.81836 13.8558 4.84038 11.4395C4.84038 11.4395 5.82721 9.10638 7.62597 7.30761C7.62597 7.30761 9.42474 5.50884 11.7579 4.52201C11.7579 4.52201 14.1742 3.5 16.8184 3.5ZM16.8184 5.5C16.8184 5.5 14.5798 5.5 12.537 6.36402C12.537 6.36402 10.5631 7.19889 9.04019 8.72182C9.04019 8.72182 7.51725 10.2448 6.68238 12.2186C6.68238 12.2186 5.81836 14.2614 5.81836 16.5C5.81836 16.5 5.81836 18.7386 6.68238 20.7814C6.68238 20.7814 7.51725 22.7552 9.04018 24.2782C9.04018 24.2782 10.5631 25.8011 12.537 26.636C12.537 26.636 14.5798 27.5 16.8184 27.5C16.8184 27.5 19.057 27.5 21.0998 26.636C21.0998 26.636 23.0736 25.8011 24.5965 24.2782C24.5965 24.2782 26.1195 22.7552 26.9543 20.7814C26.9543 20.7814 27.8184 18.7386 27.8184 16.5C27.8184 16.5 27.8184 14.2614 26.9543 12.2186C26.9543 12.2186 26.1195 10.2448 24.5965 8.72183C24.5965 8.72183 23.0736 7.19889 21.0998 6.36402C21.0998 6.36402 19.057 5.5 16.8184 5.5Z"
          />
          <path
            d="M15.8184 14.5V28.5C15.8184 29.0523 16.2661 29.5 16.8184 29.5C17.3706 29.5 17.8184 29.0523 17.8184 28.5V14.5C17.8167 14.0983 17.9681 13.7308 17.9681 13.7308C18.1194 13.3632 18.4005 13.0821 18.4005 13.0821C18.6816 12.801 19.0491 12.6497 19.0491 12.6497C19.4167 12.4984 19.8142 12.5 19.8142 12.5L21.8184 12.5C22.3707 12.5 22.8184 12.0523 22.8184 11.5C22.8184 10.9477 22.3707 10.5 21.8184 10.5L19.8226 10.5C19.0251 10.4967 18.2876 10.8003 18.2876 10.8003C17.5502 11.104 16.9863 11.6679 16.9863 11.6679C16.4224 12.2318 16.1187 12.9693 16.1187 12.9693C15.8151 13.7067 15.8184 14.5 15.8184 14.5Z"
          />
          <path
            d="M12.8184 19.5H20.8184C21.3706 19.5 21.8184 19.0523 21.8184 18.5C21.8184 17.9477 21.3706 17.5 20.8184 17.5H12.8184C12.2661 17.5 11.8184 17.9477 11.8184 18.5C11.8184 19.0523 12.2661 19.5 12.8184 19.5Z"
          />
        </svg>
      );
    case INSTAGRAM:
      return (
        <svg className={className} width="33" height="33" viewBox="0 0 33 33" fill={color} xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.8184 10.5C16.8184 10.5 19.3036 10.5 21.061 12.2574C21.061 12.2574 22.8184 14.0147 22.8184 16.5C22.8184 16.5 22.8184 18.9853 21.061 20.7426C21.061 20.7426 19.3036 22.5 16.8184 22.5C16.8184 22.5 14.3331 22.5 12.5757 20.7426C12.5757 20.7426 10.8184 18.9853 10.8184 16.5C10.8184 16.5 10.8184 14.0147 12.5757 12.2574C12.5757 12.2574 14.3331 10.5 16.8184 10.5ZM16.8184 12.5C16.8184 12.5 15.1615 12.5 13.9899 13.6716C13.9899 13.6716 12.8184 14.8431 12.8184 16.5C12.8184 16.5 12.8184 18.1569 13.9899 19.3284C13.9899 19.3284 15.1615 20.5 16.8184 20.5C16.8184 20.5 18.4752 20.5 19.6468 19.3284C19.6468 19.3284 20.8184 18.1569 20.8184 16.5C20.8184 16.5 20.8184 14.8431 19.6468 13.6716C19.6468 13.6716 18.4752 12.5 16.8184 12.5Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.31836 11C4.31836 11 4.31836 8.10051 6.36861 6.05025C6.36861 6.05025 8.41886 4 11.3184 4H22.3184C22.3184 4 25.2179 4 27.2681 6.05025C27.2681 6.05025 29.3184 8.1005 29.3184 11V22C29.3184 22 29.3184 24.8995 27.2681 26.9497C27.2681 26.9497 25.2179 29 22.3184 29H11.3184C11.3184 29 8.41886 29 6.36861 26.9497C6.36861 26.9497 4.31836 24.8995 4.31836 22V11ZM6.31836 11L6.31836 22C6.31836 22 6.31836 24.0711 7.78283 25.5355C7.78283 25.5355 9.24729 27 11.3184 27H22.3184C22.3184 27 24.3894 27 25.8539 25.5355C25.8539 25.5355 27.3184 24.0711 27.3184 22V11C27.3184 11 27.3184 8.92893 25.8539 7.46447C25.8539 7.46447 24.3894 6 22.3184 6L11.3184 6C11.3184 6 9.24729 6 7.78283 7.46447C7.78283 7.46447 6.31836 8.92893 6.31836 11Z"
          />
          <path
            d="M24.8184 10C24.8184 10.8284 24.1468 11.5 23.3184 11.5C22.4899 11.5 21.8184 10.8284 21.8184 10C21.8184 9.17163 22.4899 8.5 23.3184 8.5C24.1468 8.5 24.8184 9.17163 24.8184 10Z"
          />
        </svg>
      );
    default:
      return null;
  }
}

export default ContactSvg;
