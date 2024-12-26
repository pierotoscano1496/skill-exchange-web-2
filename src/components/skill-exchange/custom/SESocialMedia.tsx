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
}: SocialMediaProps) => {
  const socialMediaText: string = capitalizeFirstLetter(socialMedia);

  switch (type) {
    case "link":
      return (
        <SELink
          link={link!}
          icon={icon}
          label={socialMediaText}
          className={linkClassName}
        />
      );
    case "container":
      return (
        <SEContainer className={containerClassName}>
          <FontAwesomeIcon
            icon={
              (socialMedia === "facebook" && faFacebook) ||
              (socialMedia === "twitter" && faTwitter) ||
              (socialMedia === "instagram" && faInstagram) ||
              (socialMedia === "linkedin" && faLinkedin) ||
              (socialMedia === "tiktok" && faTiktok) ||
              faYoutube
            }
            className={classNames("mr-auto")}
          />
          {socialMediaText}
        </SEContainer>
      );
    case "text":
      return (
        <SEParragraph className={textClassName}>socialMediaText</SEParragraph>
      );
  }
};

const capitalizeFirstLetter = (socialMedia: SocialMedia): string => {
  if (!socialMedia) return socialMedia;
  return socialMedia.charAt(0).toUpperCase() + socialMedia.slice(1);
};

export default SESocialMedia;
