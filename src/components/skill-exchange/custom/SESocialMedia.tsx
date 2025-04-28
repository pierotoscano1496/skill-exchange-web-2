import { SocialMedia } from "@/utils/types";
import SELink from "../SELink";
import React from "react";
import SEContainer from "../containers/SEContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTiktok,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import SEParragraph from "../text/SEParragraph";
import classNames from "classnames";

type SocialMediaRenderType = "link" | "container" | "text";

type SocialMediaClassNames<T extends string> = {
  [key in `${T}ClassName`]?: string;
};

interface SocialMediaProps
  extends SocialMediaClassNames<SocialMediaRenderType> {
  socialMedia: SocialMedia;
  link?: string;
  icon?: React.ReactNode;
  type?: SocialMediaRenderType;
}

const SESocialMedia: React.FC<SocialMediaProps> = ({
  socialMedia,
  icon,
  link,
  type = "container",
  containerClassName,
  linkClassName,
  textClassName,
}) => {
  const socialMediaText: string = capitalizeFirstLetter(socialMedia);

  const iconMap = {
    facebook: faFacebook,
    twitter: faTwitter,
    instagram: faInstagram,
    linkedin: faLinkedin,
    tiktok: faTiktok,
    youtube: faYoutube,
  } as Record<SocialMedia, any>;

  const selectedIcon = icon || (
    <FontAwesomeIcon icon={iconMap[socialMedia]} className="mr-2" />
  );

  switch (type) {
    case "link":
      return (
        <SELink link={link!} className={linkClassName}>
          {selectedIcon}
          {socialMediaText}
        </SELink>
      );
    case "container":
      return (
        <SEContainer className={containerClassName}>
          {selectedIcon}
          {socialMediaText}
        </SEContainer>
      );
    case "text":
      return (
        <SEParragraph className={textClassName}>{socialMediaText}</SEParragraph>
      );
    default:
      return null;
  }
};

const capitalizeFirstLetter = (text: string): string => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export default SESocialMedia;
