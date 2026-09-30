"use client";

import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Film, Sparkles, Heart } from "lucide-react";
import { celebrationAudio } from '@/lib/audio/celebrationAudio';

interface VideoMoment {
  id: string;
  title: string;
  category: string;
  duration: string;
  caption: string;
  videoSrc: string;
  thumbnailSrc: string;
}

const VIDEO_MOMENTS: VideoMoment[] = [
  {
    id: "v1",
    title: "The Birthday Reel & Cake Sparkles",
    category: "Party Highlights",
    duration: "0:25",
    caption: "Midnight countdown, cake smash, sparkler candles, and screaming Happy Birthday at the top of our lungs!",
    // High-reliability MP4 video clip (royalty free celebration video)
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailSrc: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "v2",
    title: "Golden Hour Smiles & Unstoppable Laughter",
    category: "Unfiltered Vibes",
    duration: "0:15",
    caption: "Those candid golden afternoons where everyone laughed so hard their stomachs hurt.",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailSrc: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "v3",
    title: "Epic Adventures & Roadtrips",
    category: "Adventures",
    duration: "0:30",
    caption: "Windows rolled down, favorite songs blasting, chasing sunsets with the best crew ever.",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    thumbnailSrc: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "v4",
    title: "Midnight Jam Sessions & Memories",
    category: "Late Night",
    duration: "0:20",
    caption: "Acoustic chords, terrace talks, and memories that will last a lifetime.",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    thumbnailSrc: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
  },
];

interface BirthdayVideoPlayerProps {
  name: string;
}

export default function BirthdayVideoPlayer({ name }: BirthdayVideoPlayerProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoMoment>(VIDEO_MOMENTS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [likesCount, setLikesCount] = useState<Record<string, number>>({
    v1: 142,
    v2: 98,
    v3: 187,
    v4: 76,
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
        // Autoplay policy or error
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSelectVideo = (video: VideoMoment) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.src = video.videoSrc;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleLike = (id: string) => {
    celebrationAudio.playMagicChime();
    setLikesCount((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section id="birthday-video-section" className="relative py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-4 py-1.5 text-xs font-semibold text-pink-300 mb-4 backdrop-blur-md">
            <Film className="h-4 w-4" />
            <span>Cinematic Birthday Video Tribute</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            The {name} Birthday Video Reel 🎬
          </h2>
          <p className="mt-2 text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Relive the most unforgettable adventures, loudest laughs, and golden moments captured on camera!
          </p>
        </div>

        {/* Video Theatre Frame */}
        <div className="relative rounded-3xl bg-slate-900 border border-white/15 p-2 sm:p-4 shadow-2xl overflow-hidden">
          {/* Ambient backlight glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 blur-3xl opacity-70 pointer-events-none" />

          {/* Video Container */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center group">
            <video
              ref={videoRef}
              src={selectedVideo.videoSrc}
              poster={selectedVideo.thumbnailSrc}
              loop
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />

            {/* Big Center Play Overlay Button when paused */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer backdrop-blur-[2px] transition-all group-hover:bg-black/30"
              >
                <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 text-slate-950 shadow-2xl transition-transform hover:scale-110 active:scale-95">
                  <Play className="h-10 w-10 fill-slate-950 ml-1" />
                </div>
              </div>
            )}

            {/* Bottom Floating Control Bar */}
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
                <span className="text-xs text-white/90 font-medium">
                  {selectedVideo.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleLike(selectedVideo.id)}
                  className="flex items-center gap-1.5 rounded-full bg-rose-500/80 hover:bg-rose-500 px-3 py-1 text-xs font-bold text-white transition-colors"
                >
                  <Heart className="h-3.5 w-3.5 fill-white" />
                  <span>{likesCount[selectedVideo.id] || 0}</span>
                </button>
                <button
                  onClick={handleFullscreen}
                  className="rounded-lg bg-white/20 hover:bg-white/30 p-2 text-white transition-colors"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Current Video Info Banner */}
          <div className="mt-4 px-3 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono tracking-wider text-pink-400 font-bold">
                  {selectedVideo.category}
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400 font-mono">{selectedVideo.duration}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-white mt-0.5">
                {selectedVideo.title}
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                {selectedVideo.caption}
              </p>
            </div>

            <button
              onClick={() => handleLike(selectedVideo.id)}
              className="self-start sm:self-center flex items-center gap-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 transition-transform"
            >
              <Heart className="h-4 w-4 fill-white" />
              <span>Send Love ({likesCount[selectedVideo.id] || 0})</span>
            </button>
          </div>
        </div>

        {/* Video Moments Playlist Selector */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-semibold uppercase tracking-wider text-slate-300">
              More Memory Chapters
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VIDEO_MOMENTS.map((video) => {
              const isCurrent = video.id === selectedVideo.id;
              return (
                <div
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className={`cursor-pointer rounded-2xl overflow-hidden border transition-all hover:scale-[1.03] ${
                    isCurrent
                      ? "border-pink-400 bg-pink-500/10 shadow-lg shadow-pink-500/20"
                      : "border-white/10 bg-slate-900/60 hover:border-white/30"
                  }`}
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img
                      src={video.thumbnailSrc}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white">
                        <Play className="h-5 w-5 fill-white ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-mono text-white">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-3">
                    <h4 className="font-display font-bold text-sm text-white line-clamp-1">
                      {video.title}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {video.category}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
