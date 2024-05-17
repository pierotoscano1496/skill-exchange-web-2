"use client";

import { MedioRecursoMultimedia } from "@/utils/types";
import { FacebookEmbed, InstagramEmbed, LinkedInEmbed, TikTokEmbed, TwitterEmbed, XEmbed, YouTubeEmbed } from "react-social-media-embed";

const SocialMediaRender = ({ link, onRender }: {
    link: string,
    onRender: (medio: MedioRecursoMultimedia) => void
}) => {
    if (link.startsWith("https://www.facebook.com/")) {
        onRender("facebook");
        return <FacebookEmbed url={link} width={550} />
    } else if (link.startsWith("https://www.instagram.com/")) {
        onRender("instagram");
        return <InstagramEmbed url={link} width={328} />
    } else if (link.startsWith("https://www.tiktok.com")) {
        onRender("tiktok");
        return <TikTokEmbed url={link} width={325} />
    } else if (link.startsWith("https://www.youtube.com/")) {
        onRender("youtube");
        return <YouTubeEmbed url={link} width={325} height={220} />
    } else if (link.startsWith("https://twitter.com/")) {
        onRender("twitter");
        return <XEmbed url={link} width={325} />
    } else if (link.startsWith("https://www.linkedin.com/")) {
        onRender("linkedin");
        return <LinkedInEmbed
            url={link}
            width={325}
            height={570}
        />
    } else {
        onRender("web-externa");
        return <a href={link}>{link}</a>
    }
};

export default SocialMediaRender;