"use client";

import { MedioRecursoMultimedia } from "@/utils/types";
import { useEffect } from "react";
import {
  FacebookEmbed,
  InstagramEmbed,
  LinkedInEmbed,
  TikTokEmbed,
  XEmbed,
  YouTubeEmbed,
} from "react-social-media-embed";
import SELink from "./skill-exchange/SELink";

const SocialMediaRender = ({
  link,
  onRender,
}: {
  link: string;
  onRender: (medio: MedioRecursoMultimedia) => void;
}) => {
  let medio: MedioRecursoMultimedia | null = null;
  if (link.startsWith("https://www.facebook.com/")) {
    medio = "facebook";
  } else if (link.startsWith("https://www.instagram.com/")) {
    medio = "instagram";
  } else if (link.startsWith("https://www.tiktok.com")) {
    medio = "tiktok";
  } else if (link.startsWith("https://www.youtube.com/")) {
    medio = "youtube";
  } else if (link.startsWith("https://twitter.com/")) {
    medio = "twitter";
  } else if (link.startsWith("https://www.linkedin.com/")) {
    medio = "linkedin";
  } else {
    medio = "web-externa";
  }

  useEffect(() => {
    if (medio) {
      onRender(medio);
    }
  }, [medio, onRender]);

  switch (medio) {
    case "facebook":
      return <FacebookEmbed url={link} width={550} />;
    case "instagram":
      return <InstagramEmbed url={link} width={328} />;
    case "tiktok":
      return <TikTokEmbed url={link} width={325} />;
    case "youtube":
      return <YouTubeEmbed url={link} width={325} height={220} />;
    case "twitter":
      return <XEmbed url={link} width={325} />;
    case "linkedin":
      return <LinkedInEmbed url={link} width={325} height={570} />;
    default:
      return <SELink link={link} label={link} />;
  }
};

export default SocialMediaRender;
