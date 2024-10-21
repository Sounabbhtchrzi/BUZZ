import { useState } from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton
} from 'react-share';
import {
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    LinkedinIcon
} from 'react-share';

interface ShareButtonProps {
    postId: string;
}

export default function ShareButton({ postId }: ShareButtonProps) {
    const shareUrl = `https://buzz-s3.vercel.app/post/${postId}`;
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col lg:w-[500px] w-[300px] max-w-md p-6 bg-white   shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-orange-500 text-center">Share the Buzz!</h2>

            {/* Copy link section */}
            <div className="flex items-center justify-between p-2 bg-gray-100 rounded-full overflow-hidden">
                <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-grow bg-transparent outline-none text-sm px-4 py-2"
                />
                <button
                    onClick={handleCopyLink}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                >
                    {copied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Social Media Share Buttons */}
            <div className="flex justify-evenly space-x-4">
                <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={50} round className="hover:scale-110 transition duration-300" />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl} title="Check out this funky post on BUZZ!">
                    <TwitterIcon size={50} round className="hover:scale-110 transition duration-300" />
                </TwitterShareButton>
                <WhatsappShareButton url={shareUrl} title="Check out this funky post on BUZZ!">
                    <WhatsappIcon size={50} round className="hover:scale-110 transition duration-300" />
                </WhatsappShareButton>
                <LinkedinShareButton url={shareUrl}>
                    <LinkedinIcon size={50} round className="hover:scale-110 transition duration-300" />
                </LinkedinShareButton>
            </div>
            <p className="text-center text-gray-700 text-sm animate-bounce">
                Spread the fun! 🎈🎉
            </p>
        </div>
    );
}