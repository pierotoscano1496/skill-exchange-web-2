"use client";

import { MedioRecursoMultimedia } from "@/utils/types";
import { FacebookEmbed, InstagramEmbed, LinkedInEmbed, TikTokEmbed, TwitterEmbed, YouTubeEmbed } from "react-social-media-embed";

const SocialMediaRender = ({ link, setterMedio }: {
    link: string,
    setterMedio: (medio: MedioRecursoMultimedia) => void
}) => {
    if (link.startsWith("https://www.facebook.com/")) {
        setterMedio("facebook");
        return <FacebookEmbed url={link} width={550} />
    } else if (link.startsWith("https://www.instagram.com/")) {
        setterMedio("instagram");
        return <InstagramEmbed url={link} width={328} />
    } else if (link.startsWith("https://www.tiktok.com")) {
        setterMedio("tiktok");
        return <TikTokEmbed url={link} width={325} />
    } else if (link.startsWith("https://www.youtube.com/")) {
        setterMedio("youtube");
        return <YouTubeEmbed url={link} width={325} height={220} />
    } else if (link.startsWith("https://twitter.com/")) {
        setterMedio("twitter");
        return <TwitterEmbed url={link} width={325} />
    } else if (link.startsWith("https://www.linkedin.com/")) {
        setterMedio("linkedin");
        return <LinkedInEmbed
            url={link}
            width={325}
            height={570}
        />
    } else {
        setterMedio("web-externa");
        return <a href={link}>{link}</a>
    }
};

export default SocialMediaRender;