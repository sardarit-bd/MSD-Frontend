"use client"

import Link from "next/link";
import ImageCard from "./components/ImageCard";
import ImageSlider from "./components/ImageSlider";
import ListBox from "./components/ListBox";
import TableCard from "./components/TableCard";
import { Pause, PlayCircle, Square, TextSearch, Volume2 } from "lucide-react";
import { chapters, topics } from "./data";
import { useRef, useState } from "react";
import usePageReader from "@/hooks/usePageReader";
import QRButton from "./components/QRButton";
import { useParams, useSearchParams } from "next/navigation";
import { slugToPascalCase } from "./SideBar";

const MultimediaIcon = () => (
    <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 21h8M12 17v4M10 10l4-2.5v5L10 10z" />
    </svg>
);


export function toPascalCaseAlpha(str) {
    return str
        ?.replace(/[^a-zA-Z\s]/g, " ")
        ?.split(/\s+/)
        ?.filter(Boolean)
        ?.map(word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        ?.join("");
}



export default function ArticleContent() {
    const containerRef = useRef(null);
    const reader = usePageReader(containerRef);
    const [showReaderControls, setShowReaderControls] = useState(false);
    const { chapter } = useParams()
    const ch = slugToPascalCase(chapter)
    console.log(ch)
    const otherTopics = chapters[ch]
    const searchParams = useSearchParams()
    const prm = searchParams?.get('topic') || otherTopics?.[0];

    const topic = toPascalCaseAlpha(prm)

    const article = topics[topic]

    const handlePlay = () => {
        setShowReaderControls(true);
        reader.startReading();
    };

    const handleStop = () => {
        reader.stop();
        setShowReaderControls(false);
    };
    return (
        <div ref={containerRef} className="max-w-3xl mx-auto bg-white px-4 py-6 font-sans">

            {/* Title + Button */}
            <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">{article?.title}</h1>
                <a href="#" className="flex-shrink-0 flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase px-4 py-3 rounded transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Patient Education
                </a>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3 mb-3">
                <TextSearch />
                <button onClick={handlePlay} className="hover:text-teal-700">
                    <Volume2 />
                </button>
                <QRButton title={article?.title} url={`/${article?.title?.toLowerCase().repeat(" ", '-')}`} />
            </div>

            {/* Authors */}
            <p className="text-sm text-gray-700 mb-1">
                By <Link href={"/"}>{article?.author?.name}</Link>, {article?.author?.designation}
            </p>
            <p className="text-sm text-gray-700 mb-1">
                Reviewed By <Link href={"/"}>Brian F. Mandell</Link>, MD, PhD, Cleveland Clinic Lerner College of Medicine at Case Western Reserve University
            </p>
            <p className="text-sm text-gray-500 italic mb-4">Reviewed/Revised Feb 2024 | Modified Oct 2025</p>

            {/* Topic Links */}
            <div className="flex items-center gap-3 text-sm font-medium mb-1">
                <Link href={"/"}>Immune Response</Link>
                <span className="text-gray-400">|</span>
                <Link href={"/"}>Geriatrics Essentials</Link>
                <span className="text-gray-400">|</span>
                <span className="text-red-700 cursor-pointer hover:underline flex items-center">
                    <MultimediaIcon />Multimedia
                </span>
            </div>
            <hr className="border-gray-300 mb-4" />

            {/* Intro paragraphs */}
            {article?.intro?.map((art) => {
                if (art?.type === 'text_block') return <div dangerouslySetInnerHTML={{ __html: art?.content }}></div>
                if (art?.type === 'image_card') return <ImageCard content={art?.content} />
            })}

            {article?.sections?.map(sec => {
                return <div className="mx-auto bg-white py-4 font-sans">

                    {/* Immune Response Section Header */}
                    <div className="bg-teal-700 text-white font-bold text-base px-4 py-2.5 mt-8 mb-4">
                        {sec?.title}
                    </div>

                    {sec?.blocks?.map(block => {
                        if (block?.type === "text_block") return <div dangerouslySetInnerHTML={{ __html: block?.content }}></div>
                        if (block?.type === 'image_card') return <ImageCard content={block?.content} />
                        if (block?.type === "table") return <TableCard content={block?.content} />
                        if (block?.type === "image_slider") return <ImageSlider data={block?.content} />
                        if (block?.type === "list_box") return <ListBox data={block?.content} />
                    })}

                </div>
            })}
            <div>



                {/* Bottom Cards */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="border border-gray-300 rounded p-4 flex items-center gap-4">
                        <svg className="w-10 h-10 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <div>
                            <p className="text-sm font-bold text-gray-900 uppercase mb-1">Test Your Knowledge</p>
                            <Link href="/">Take a quiz on this topic</Link>
                        </div>
                    </div>
                    <div className="border border-gray-300 rounded p-4 flex items-center gap-4">
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 flex items-center justify-center text-xs text-gray-400 border">QR</div>
                        <div>
                            <p className="text-sm font-bold text-gray-900 mb-2">Download the Free MSD Manuals App</p>
                            <div className="flex gap-2">
                                <span className="text-xs bg-black text-white px-2 py-1 rounded">App Store</span>
                                <span className="text-xs bg-black text-white px-2 py-1 rounded">Google Play</span>
                            </div>
                        </div>
                    </div>
                </div>
                {showReaderControls && (
                    <div className="fixed right-6 top-1/2 -translate-y-1/2 bg-white shadow-xl border rounded-xl p-2 flex flex-col gap-2 z-50 backdrop-blur-sm bg-white/95">

                        {/* Pause Button */}
                        <div className="relative group">
                            <button
                                onClick={reader.pause}
                                className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                aria-label="Pause"
                            >
                                <Pause size={20} className="text-gray-700" />
                            </button>

                            {/* Tooltip */}
                            <span className="absolute right-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                                Pause
                                <span className="text-gray-400 text-xs ml-1">P</span>
                            </span>
                        </div>

                        {/* Play Button */}
                        <div className="relative group">
                            <button
                                onClick={reader.resume}
                                className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                aria-label="Play"
                            >
                                <PlayCircle size={20} className="text-gray-700" />
                            </button>

                            {/* Tooltip */}
                            <span className="absolute right-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                                Play
                                <span className="text-gray-400 text-xs ml-1">R</span>
                            </span>
                        </div>

                        {/* Stop Button */}
                        <div className="relative group">
                            <button
                                onClick={handleStop}
                                className="p-3 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-300"
                                aria-label="Stop"
                            >
                                <Square size={20} className="text-red-500" />
                            </button>

                            {/* Tooltip */}
                            <span className="absolute right-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                                Stop
                                <span className="text-gray-400 text-xs ml-1">S</span>
                            </span>
                        </div>

                        {/* Optional: Add a mini player indicator */}
                        <div className="h-px bg-gray-200 my-1"></div>
                        <div className="text-xs text-center text-gray-500 font-medium">
                            Audio Controls
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}