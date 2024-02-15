"use client";

import React, { useState } from "react";
import ReactPlayer from "react-player";
import { FacebookEmbed, InstagramEmbed, LinkedInEmbed, TikTokEmbed, TwitterEmbed, YouTubeEmbed } from "react-social-media-embed";


const SocialMediaForm: React.FC = () => {
    const [socialMediaLink, setSocialMediaLink] = useState('');
    const [preview, setPreview] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSocialMediaLink(event.target.value);
    };

    const renderPreview = () => {
        if (socialMediaLink.includes('facebook.com')) {
            return <FacebookEmbed url="https://www.facebook.com/andrewismusic/posts/451971596293956" width={550} />
        } else if (socialMediaLink.includes('instagram.com')) {
            return <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width={328} />
        } else if (socialMediaLink.includes('tiktok.com')) {
            return <TikTokEmbed url="https://www.tiktok.com/@pierotoscano1496/video/7078154691087043846?is_from_webapp=1&sender_device=pc&web_id=7320697309019588101" width={325} />
        } else if (socialMediaLink.includes('youtube.com')) {
            return <YouTubeEmbed url="https://www.youtube.com/watch?v=HpVOs5imUN0" width={325} height={220} />
        } else if (socialMediaLink.includes('twitter.com')) {
            return <TwitterEmbed url="https://twitter.com/PixelAndBracket/status/1356633038717923333" width={325} />
        } else if (socialMediaLink.includes('linkedin.com')) {
            return <LinkedInEmbed
                url="https://www.linkedin.com/embed/feed/update/urn:li:share:6898694772484112384"
                postUrl="https://www.linkedin.com/posts/peterdiamandis_5-discoveries-the-james-webb-telescope-will-activity-6898694773406875648-z-D7"
                width={325}
                height={570}
            />
        } else {
            return <a href={socialMediaLink}>{socialMediaLink}</a>
        }
    }

    const handlePreview = () => {

    };

    const obtenerVideoId = (link: string): string | null => {
        // Implementa la lógica para obtener el ID del vídeo de YouTube
        const match = link.match(/[?&]v=([^&]+)/);
        return match && match[1];
    };

    return (
        <div>
            <label>Enlace de la publicación:</label>
            <input type="text" value={socialMediaLink} onChange={handleInputChange} />
            <button onClick={handlePreview}>Previsualizar</button>

            <div>
                {renderPreview()}
            </div>
        </div>
    );
}

export default SocialMediaForm;