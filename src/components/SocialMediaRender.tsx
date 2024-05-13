"use client";

import LinkData from "@/interfaces/registro-servicio/LinkData";
import { useState } from "react";
import { FacebookEmbed, InstagramEmbed, LinkedInEmbed, TikTokEmbed, TwitterEmbed, YouTubeEmbed } from "react-social-media-embed";

const SocialMediaRender = ({ link, onRender }: {
    link: string,
    onRender: (linkData: LinkData) => void
}) => {
    if (link.startsWith("https://www.facebook.com/")) {
        onRender({
            link,
            medio: "facebook"
        });
        return <FacebookEmbed url={link} width={550} />
    } else if (link.startsWith("https://www.instagram.com/")) {
        onRender({
            link,
            medio: "instagram"
        });
        return <InstagramEmbed url={link} width={328} />
    } else if (link.startsWith("https://www.tiktok.com")) {
        onRender({
            link,
            medio: "tiktok"
        });
        return <TikTokEmbed url={link} width={325} />
    } else if (link.startsWith("https://www.youtube.com/")) {
        onRender({
            link,
            medio: "youtube"
        });
        return <YouTubeEmbed url={link} width={325} height={220} />
    } else if (link.startsWith("https://twitter.com/")) {
        onRender({
            link,
            medio: "twitter"
        });
        return <TwitterEmbed url={link} width={325} />
    } else if (link.startsWith("https://www.linkedin.com/")) {
        onRender({
            link,
            medio: "linkedin"
        });
        return <LinkedInEmbed
            url={link}
            width={325}
            height={570}
        />
    } else {
        onRender({
            link,
            medio: "web-externa"
        });
        return <a href={link}>{link}</a>
    }
};

export default SocialMediaRender;