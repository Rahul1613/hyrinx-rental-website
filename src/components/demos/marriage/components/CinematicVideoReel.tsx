"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Film, Heart } from "lucide-react";
import { weddingAudio } from '@/lib/audio/weddingAudio';

interface VideoClip {
  id: string;
  title: string;
  duration: string;
  location: string;
  videoSrc: string;
  poster: string;
  description: string;
}

const CLIPS: VideoClip[] = [
  {
    id: "v1",
    title: "The Gokarna Proposal Teaser",
    duration: "0:25",
    location: "Kudle Cliffs, Karnataka",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    description: "The sun sinking into the Arabian Sea as the question was asked under the lighthouse beacon.",
  },
  {
    id: "v2",
    title: "Chasing Sunsets & High Ridges",
    duration: "0:15",
    location: "Chopta, Uttarakhand",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
    description: "When the road ended, the mountain breeze took over. Our favorite memories in the snow peaks.",
  },
  {
    id: "v3",
    title: "Winter Walks in Calcutta",
    duration: "0:20",
    location: "College Street, Calcutta",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    description: "Steaming clay chai cups, second-hand books, and laughing on the footboard of old green trams.",
  },
];

export default function CinematicVideoReel() {
  const [selectedClip, setSelectedClip] = useState<VideoClip>(CLIPS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [likes, setLikes] = useState<Record<string, number>>({
    v1: 240,
    v2: 185,
    v3: 310,
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSelectClip = (clip: VideoClip) => {
    setSelectedClip(clip);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.src = clip.videoSrc;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleLike = (id: string) => {
    weddingAudio.playRingShimmer();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  return (
    <section className="relative py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-400/10 px-4 py-1.5 text-xs font-serif font-semibold text-rose-300 mb-4 backdrop-blur-md">
            <Film className="h-3.5 w-3.5" />
            <span>Cinematic Film Moments</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl font-light text-white tracking-tight">
            The Couple Cinema Reel 🎬
          </h2>
          <p className="mt-3 text-[#CBBFB0] text-base sm:text-lg max-w-xl mx-auto font-light">
            Short glimpses from the roads and journeys that shaped our eight years together.
          </p>
        </div>

        {/* Video Theatre Frame */}
        <div className="relative rounded-3xl bg-slate-950 border border-amber-400/30 p-2 sm:p-4 shadow-2xl overflow-hidden">
          {/* Ambient Candlelight Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 blur-3xl pointer-events-none" />

          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center group">
            <video
              ref={videoRef}
              src={selectedClip.videoSrc}
              poster={selectedClip.poster}
              loop
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />

            {/* Play Overlay */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer backdrop-blur-[2px] transition-all group-hover:bg-black/25"
              >
                <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 text-slate-950 shadow-2xl transition-transform hover:scale-110 active:scale-95">
                  <Play className="h-10 w-10 fill-slate-950 ml-1" />
                </div>
              </div>
            )}

            {/* Control Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="rounded-lg bg-white/20 hover:bg-white/30 p-2 text-white transition-colors"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="rounded-lg bg-white/20 hover:bg-white/30 p-2 text-white transition-colors"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                <span className="text-xs text-white/90 font-serif font-bold">
                  {selectedClip.title}
                </span>
              </div>

              <button
                onClick={() => handleLike(selectedClip.id)}
                className="flex items-center gap-1.5 rounded-full bg-rose-500/80 hover:bg-rose-500 px-3.5 py-1 text-xs font-bold text-white transition-colors"
              >
                <Heart className="h-3.5 w-3.5 fill-white" />
                <span>{likes[selectedClip.id] || 0}</span>
              </button>
            </div>
          </div>

          {/* Current Video Info Banner */}
          <div className="mt-4 px-3 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <span>📍 {selectedClip.location}</span>
                <span>•</span>
                <span>{selectedClip.duration}</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white mt-1">
                {selectedClip.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                {selectedClip.description}
              </p>
            </div>

            <button
              onClick={() => handleLike(selectedClip.id)}
              className="self-start sm:self-center flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 px-5 py-2.5 text-xs sm:text-sm font-serif font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-transform"
            >
              <Heart className="h-4 w-4 fill-white" />
              <span>Send Love ({likes[selectedClip.id] || 0})</span>
            </button>
          </div>
        </div>

        {/* Video Chapters Selector */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CLIPS.map((clip) => {
            const isCurrent = clip.id === selectedClip.id;
            return (
              <div
                key={clip.id}
                onClick={() => handleSelectClip(clip)}
                className={`cursor-pointer rounded-2xl overflow-hidden border transition-all hover:scale-[1.02] ${
                  isCurrent
                    ? "border-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/20"
                    : "border-white/10 bg-slate-900/60 hover:border-white/30"
                }`}
              >
                <div className="relative aspect-video w-full">
                  <img
                    src={clip.poster}
                    alt={clip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Play className="h-5 w-5 fill-white" />
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-serif font-bold text-sm text-white line-clamp-1">
                    {clip.title}
                  </h4>
                  <p className="text-[11px] text-[#A89C8F] font-mono mt-0.5">
                    {clip.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
