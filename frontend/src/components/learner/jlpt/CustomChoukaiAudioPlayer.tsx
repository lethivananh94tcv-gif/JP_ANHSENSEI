"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Play, Pause, Volume2, Volume1, VolumeX, RotateCcw, RotateCw, Headphones, Gauge
} from "lucide-react";

interface CustomChoukaiAudioPlayerProps {
  src: string;
  title?: string;
  className?: string;
}

export default function CustomChoukaiAudioPlayer({
  src,
  title = "Nghe Choukai",
  className = "",
}: CustomChoukaiAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isVolumeOpen, setIsVolumeOpen] = useState<boolean>(false);
  const [volumeHint, setVolumeHint] = useState<string | null>(null);

  const SPEED_OPTIONS = [0.8, 1.0, 1.2, 1.5];

  useEffect(() => {
    // Reset state when src changes
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [src]);

  // Click outside to close volume popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsVolumeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.error("Audio playback error:", err));
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
      audioRef.current.volume = volume;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

  const skipSeconds = useCallback((sec: number) => {
    if (!audioRef.current) return;
    const dur = audioRef.current.duration || 0;
    const newTime = Math.max(0, Math.min(dur, audioRef.current.currentTime + sec));
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  }, []);

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) {
        setIsMuted(true);
        audioRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
    showTemporaryHint(`Âm lượng: ${Math.round(val * 100)}%`);
  };

  const showTemporaryHint = (text: string) => {
    setVolumeHint(text);
    setTimeout(() => {
      setVolumeHint(null);
    }, 1500);
  };

  const adjustVolume = useCallback((delta: number) => {
    setVolume((prev) => {
      const next = Math.max(0, Math.min(1, Math.round((prev + delta) * 10) / 10));
      if (audioRef.current) {
        audioRef.current.volume = next;
        audioRef.current.muted = next === 0;
      }
      setIsMuted(next === 0);
      showTemporaryHint(`Âm lượng: ${Math.round(next * 100)}%`);
      return next;
    });
  }, []);

  // Keyboard Navigation: Up/Down for volume, Left/Right for 10s skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === "TEXTAREA" ||
          (activeEl as HTMLInputElement).type === "text" ||
          activeEl.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        adjustVolume(0.1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        adjustVolume(-0.1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        skipSeconds(-10);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        skipSeconds(10);
      } else if (e.code === "Space" && activeEl?.tagName !== "BUTTON") {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [adjustVolume, skipSeconds, togglePlay]);

  const cycleSpeed = () => {
    const currentIndex = SPEED_OPTIONS.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % SPEED_OPTIONS.length;
    const nextSpeed = SPEED_OPTIONS[nextIndex];
    setPlaybackSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const formatTime = (sec: number) => {
    if (isNaN(sec) || !isFinite(sec)) return "00:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePercent = isMuted ? 0 : volume * 100;

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={`relative flex items-center gap-2 sm:gap-3 bg-[#FFFDF9] border border-[#E5D7C7] px-3.5 py-1.5 rounded-2xl shadow-xs transition-all focus:outline-none focus:border-[#C65D4B] ${className}`}
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Label Badge */}
      <div className="flex items-center gap-1.5 shrink-0 bg-[#FAF4EB] px-2.5 py-1 rounded-xl border border-[#E5D7C7]">
        <Headphones className={`w-3.5 h-3.5 ${isPlaying ? "text-[#C65D4B] animate-bounce" : "text-[#6E5D55]"}`} />
        <span className="text-xs font-bold text-[#1F1714] hidden sm:inline">{title}</span>
      </div>

      {/* Primary Play/Pause Button */}
      <button
        type="button"
        onClick={togglePlay}
        className="w-8 h-8 rounded-full bg-[#C65D4B] hover:bg-[#B44C3B] active:scale-95 text-white flex items-center justify-center shadow-xs transition-all cursor-pointer shrink-0"
        title={isPlaying ? "Tạm dừng (Space)" : "Phát âm thanh (Space)"}
      >
        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
      </button>

      {/* Quick Skip -10s / +10s */}
      <div className="flex items-center gap-0.5 shrink-0">
        <button
          type="button"
          onClick={() => skipSeconds(-10)}
          className="p-1 text-[#6E5D55] hover:text-[#C65D4B] hover:bg-[#FAF4EB] rounded-lg transition-colors cursor-pointer"
          title="Lùi 10 giây (Phím ←)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => skipSeconds(10)}
          className="p-1 text-[#6E5D55] hover:text-[#C65D4B] hover:bg-[#FAF4EB] rounded-lg transition-colors cursor-pointer"
          title="Tới 10 giây (Phím →)"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Full Visible Progress Timeline Scrubber */}
      <div className="flex-1 flex items-center gap-2 min-w-[140px]">
        <span className="text-[11px] font-mono font-bold text-[#6E5D55] shrink-0 min-w-[34px] text-right">
          {formatTime(currentTime)}
        </span>
        
        <div className="relative flex-1 flex items-center h-5 cursor-pointer">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-[#E5D7C7] rounded-lg appearance-none cursor-pointer accent-[#C65D4B] focus:outline-none"
            style={{
              background: `linear-gradient(to right, #C65D4B 0%, #C65D4B ${progressPercent}%, #E5D7C7 ${progressPercent}%, #E5D7C7 100%)`
            }}
          />
        </div>

        <span className="text-[11px] font-mono font-medium text-[#8C7B70] shrink-0 min-w-[34px]">
          {formatTime(duration)}
        </span>
      </div>

      {/* Speed Selector Button */}
      <button
        type="button"
        onClick={cycleSpeed}
        className="px-2 py-0.5 rounded-lg bg-[#FAF4EB] hover:bg-[#F2E5D5] border border-[#E5D7C7] text-[11px] font-bold text-[#C65D4B] hover:text-[#B44C3B] transition-all cursor-pointer shrink-0 flex items-center gap-1"
        title="Đổi tốc độ phát âm thanh"
      >
        <Gauge className="w-3 h-3" />
        <span>{playbackSpeed}x</span>
      </button>

      {/* Speaker Icon - Click to Toggle Volume Slider Popover */}
      <div className="relative flex items-center shrink-0">
        <button
          type="button"
          onClick={() => setIsVolumeOpen((prev) => !prev)}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer border ${
            isVolumeOpen 
              ? "bg-[#C65D4B] text-white border-[#C65D4B]" 
              : "bg-[#FAF4EB] text-[#6E5D55] hover:text-[#C65D4B] border-[#E5D7C7]"
          }`}
          title="Chỉnh âm lượng (Click để mở thanh âm lượng, hoặc dùng phím ↑ / ↓)"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4 text-red-500" />
          ) : volume < 0.5 ? (
            <Volume1 className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>

        {/* Floating Popover Volume Bar */}
        {isVolumeOpen && (
          <div className="absolute top-full right-0 mt-2 p-3 bg-[#FFFDF9] border border-[#E5D7C7] rounded-xl shadow-xl z-50 flex items-center gap-2 animate-in fade-in zoom-in-95 min-w-[170px]">
            <button
              type="button"
              onClick={toggleMute}
              className="text-[#6E5D55] hover:text-[#C65D4B] cursor-pointer"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-[#C65D4B]" />}
            </button>
            
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-[#E5D7C7] rounded-lg appearance-none cursor-pointer accent-[#C65D4B] focus:outline-none"
              style={{
                background: `linear-gradient(to right, #C65D4B 0%, #C65D4B ${volumePercent}%, #E5D7C7 ${volumePercent}%, #E5D7C7 100%)`
              }}
            />
            
            <span className="text-[11px] font-bold font-mono text-[#6E5D55] min-w-[32px] text-right">
              {Math.round(volumePercent)}%
            </span>
          </div>
        )}
      </div>

      {/* Floating Action Toast Notification */}
      {volumeHint && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-3 py-1 bg-[#1F1714] text-white text-[10px] font-bold rounded-lg shadow-md z-50 animate-in fade-in zoom-in-95 pointer-events-none">
          {volumeHint}
        </div>
      )}
    </div>
  );
}
